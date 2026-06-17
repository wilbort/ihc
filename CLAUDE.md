# Clínica Auna Trujillo — Sistema de Admisión (Prototipo)

Prototipo funcional de alta fidelidad para el sistema de admisión de Clínica Auna Trujillo.
Proyecto académico para el curso de Interacción Humano-Computador (IHC) de la UPN.

## Reglas de trabajo

- Usar siempre **Bash** para comandos de terminal. No usar PowerShell.
- Los mensajes de commit deben ser **breves, de una sola línea**.
- Consultar siempre `requerimientos.md` (en la raíz del proyecto) como fuente de verdad para reglas del negocio, requisitos funcionales/no funcionales, métricas UX, user personas, user scenarios, user stories, impact mapping y requisitos de accesibilidad. No leer el Word original.

## Stack tecnológico

- **React 19** + **Vite 8** + **Tailwind CSS 4** + **React Router 7** (HashRouter)
- **Lucide React** para iconografía
- Sin backend — datos mock en memoria con Context API + useState
- Desplegado en **GitHub Pages** vía carpeta `/docs`

## Comandos

```bash
npm run dev      # Servidor de desarrollo en puerto 5173
npm run build    # Genera build en /docs (minify: false, cssMinify: false)
npm run preview  # Preview del build
```

## Configuración de build

- `vite.config.js`: `base: '/ihc/'`, `outDir: 'docs'`, minificación deshabilitada (código legible para evaluación académica)
- Usa `HashRouter` (no BrowserRouter) para compatibilidad con GitHub Pages

## Estructura del proyecto

```
src/
├── main.jsx                          # Entry point
├── App.jsx                           # HashRouter + rutas protegidas por rol
├── context/AppContext.jsx            # Estado global (pacientes, citas, cola, auth)
├── data/mockData.js                  # Datos iniciales (usuarios, pacientes, doctores, citas)
├── hooks/useFocusTrap.js             # Hook reutilizable de focus trap para modales
├── utils/formatTime.js               # fmt12() — formato 12h para horarios
├── components/Layout.jsx             # Navbar con dropdowns, keyboard nav, skip-to-content
└── pages/
    ├── Login.jsx                     # Login + acceso rápido demo
    ├── patient/
    │   ├── Dashboard.jsx             # Portal del paciente
    │   ├── NewAppointment.jsx        # Agendar cita (wizard 3 pasos) + notificación simulada
    │   ├── MyAppointments.jsx        # Ver/cancelar/reprogramar citas + modal confirmación + focus trap
    │   └── History.jsx               # Historial de citas pasadas
    ├── receptionist/
    │   ├── Dashboard.jsx             # Panel de admisión con estadísticas
    │   ├── RegisterPatient.jsx       # Registro de nuevo paciente
    │   ├── SearchPatient.jsx         # Buscar + ver + editar paciente (validación inline con errores específicos)
    │   ├── NewAppointment.jsx        # Agendar cita (wizard 4 pasos) + notificación simulada
    │   ├── DoctorAvailability.jsx    # Consulta de disponibilidad de médicos por especialidad
    │   ├── Appointments.jsx          # Gestión de citas (check-in, reprogramar, cancelar) + modales con focus trap
    │   └── QueueManagement.jsx       # Cola de atención kanban + modal urgencia con focus trap
    └── admin/
        └── Dashboard.jsx             # Dashboard: métricas, gráfico diario, distribución horaria, carga médica con %, redistribución de turnos
```

## Usuarios demo

| Usuario    | Contraseña | Rol           | Nombre             |
|------------|------------|---------------|---------------------|
| elisa      | 1234       | patient       | Elisa Sada          |
| veronica   | 1234       | receptionist  | Verónica Arellano   |
| gustavo    | 1234       | admin         | Gustavo Rodríguez   |

## Reglas del negocio (RN01-RN12) — del documento de práctica

| Regla | Descripción (documento) | Estado | Dónde se implementa |
|-------|-------------------------|--------|---------------------|
| RN01 | Registro previo obligatorio: todo paciente debe registrarse antes de recibir cualquier servicio | OK | RegisterPatient.jsx — validación + detección de duplicados por DNI |
| RN02 | Identificación única: DNI u otro documento oficial, sin duplicados | OK | RegisterPatient.jsx — valida 8 dígitos + `findPatientByDni` |
| RN03 | Verificación y actualización de datos en cada visita | OK | SearchPatient.jsx — formulario inline (teléfono, email, dirección, fecha nac.) |
| RN04 | Atención con cita previa; excepción: emergencias | OK | NewAppointment.jsx (citas) + QueueManagement.jsx (urgencias) |
| RN05 | Asignación según disponibilidad y especialidad del médico | OK | AppContext.jsx `getAvailableSlots` — filtra turnos ocupados por doctor |
| RN06 | Cancelación solo con mínimo 2 horas de anticipación | OK | MyAppointments.jsx (paciente) + Appointments.jsx (recepcionista) |
| RN07 | Puntualidad: si llega fuera de tolerancia, pierde turno y debe reprogramar | OK | Appointments.jsx — `TOLERANCE_MINUTES = 15`, alerta si llega tarde |
| RN08 | Prioridad por emergencia sobre citas programadas | OK | QueueManagement.jsx — columna "Urgencias" con prioridad |
| RN09 | Orden de atención por turno asignado y prioridad médica | OK | QueueManagement.jsx — cola FIFO con posición, kanban visual |
| RN10 | Respeto de horarios de atención; no citas fuera del horario por especialidad | OK | AppContext.jsx — `doctors[].schedule` define horarios permitidos |
| RN11 | Confidencialidad: solo personal autorizado accede a información | OK | App.jsx `ProtectedRoute` + Layout.jsx navegación por rol |
| RN12 | Corrección inmediata de errores de registro | OK | SearchPatient.jsx — edición inline inmediata por recepcionista |

## Requisitos funcionales (RF01-RF12) — del documento de práctica

| RF | Descripción (documento) | Estado | Dónde se implementa |
|----|-------------------------|--------|---------------------|
| RF01 | Búsqueda rápida de paciente por nombre o DNI | OK | SearchPatient.jsx — listado completo + filtrado en tiempo real |
| RF02 | Registro de paciente nuevo con datos personales | OK | RegisterPatient.jsx — formulario con validación |
| RF03 | Actualización de datos del paciente | OK | SearchPatient.jsx — edición inline (teléfono, email, dirección, fecha nac.) |
| RF04 | Consulta de disponibilidad de médicos por especialidad | OK | receptionist/DoctorAvailability.jsx — consulta independiente por especialidad + fecha; también visible en NewAppointment.jsx (paciente y recepcionista) |
| RF05 | Programación de cita médica (especialidad + médico + fecha + hora) | OK | patient/NewAppointment.jsx (3 pasos) + receptionist/NewAppointment.jsx (4 pasos: paciente + especialidad + médico + fecha) |
| RF06 | Reprogramación de citas | OK | MyAppointments.jsx (paciente) + Appointments.jsx (recepcionista — modal con date picker + horarios) |
| RF07 | Cancelación de citas respetando plazo mínimo | OK | MyAppointments.jsx + Appointments.jsx — bloqueo < 2 horas |
| RF08 | Registro de llegada del paciente (check-in) | OK | Appointments.jsx — botón "Check-in" que agrega a cola |
| RF09 | Atención prioritaria por emergencia | OK | QueueManagement.jsx — botón "Urgencia" + modal de búsqueda |
| RF10 | Gestión de cola de turnos ordenada | OK | QueueManagement.jsx — kanban: urgencias, en espera, en atención, atendidos |
| RF11 | Consulta de historial de citas por paciente | OK | History.jsx (paciente) + SearchPatient.jsx (recepcionista: citas próximas + historial) |
| RF12 | Generación de reportes de atención por rango de fechas (admin) | OK | admin/Dashboard.jsx — filtro de rango de fechas + métricas + gráfico por día + especialidad + carga médica |

## Requisitos no funcionales (RNF01-RNF08) — del documento de práctica

| RNF | Descripción | Estado | Notas |
|-----|-------------|--------|-------|
| RNF01 | Rendimiento: registro y programación < 3 segundos | OK | Datos en memoria, respuesta instantánea (prototipo sin backend) |
| RNF02 | Tiempo de respuesta < 2 segundos | OK | React SPA, sin latencia de red |
| RNF03 | Disponibilidad 7am-9pm, 99% uptime | N/A | Requisito de infraestructura; prototipo desplegado en GitHub Pages (alta disponibilidad) |
| RNF04 | Usabilidad: interfaz intuitiva, inducción máx. 1 hora | OK | Diseño limpio, navegación por rol, iconografía clara, flujos guiados |
| RNF05 | Seguridad: autenticación con usuario y contraseña | OK | Login.jsx — autenticación + roles protegidos (ProtectedRoute) |
| RNF06 | Confidencialidad: protección de datos personales (Ley 29733) | OK | Acceso restringido por rol; datos solo visibles a personal autorizado |
| RNF07 | Compatibilidad: Chrome, Firefox, Edge + móviles Android/iOS | OK | React SPA responsiva, Tailwind CSS responsive, HashRouter compatible |
| RNF08 | Escalabilidad: +50% usuarios sin degradación | N/A | Requisito de infraestructura; no aplica a prototipo frontend |

## Accesibilidad (WCAG 2.0 AA)

- `aria-label`, `aria-expanded`, `aria-haspopup`, `aria-invalid` en inputs y botones
- `role="dialog"`, `role="alert"`, `role="status"`, `role="menu"`, `role="menuitem"` semánticos
- Contraste mínimo 4.5:1 en texto sobre fondo
- Targets mínimos de 44x44px (`min-h-[44px]`)
- Navegación por teclado en dropdowns (Enter, Escape, ArrowUp, ArrowDown)
- Focus trap en todos los modales (hook `useFocusTrap`)
- Skip-to-content link en Layout.jsx (`#main-content`)
- Cierre de modales con Escape

## Microinteracciones y animaciones

- `fadeIn` — contenido principal al cambiar de vista
- `scaleIn` — modales al abrirse
- `slideUp` — alertas y mensajes de estado
- Transiciones suaves en botones, links e inputs (`transition: all 0.15s`)

## Fechas y zona horaria

Las fechas se calculan en hora local (no UTC) usando `toLocaleDateString('sv-SE')` para formato YYYY-MM-DD.
Esto evita desajustes nocturnos donde la fecha UTC es un día adelante respecto a la hora local de Perú (UTC-5).

## Despliegue en GitHub Pages

1. `npm run build` genera la carpeta `/docs`
2. Push a GitHub: `git push origin main`
3. En el repo → Settings → Pages → seleccionar rama `main` y carpeta `/docs`
4. El sitio queda disponible en `https://wilbort.github.io/ihc/`

## Archivos auxiliares (raíz del proyecto `/ihc/`)

- `take_screenshots.py` — Script Playwright para capturar screenshots automáticos de todas las pantallas
- `crear_ppt.py` — Script python-pptx para generar la presentación PPT con screenshots
- `Exposicion_Wilbort_Prototipo.pptx` — PPT generado (26 diapositivas)
- `screenshots/` — 13 capturas PNG de todas las vistas del prototipo
