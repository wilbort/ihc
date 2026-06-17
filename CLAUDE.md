# Clínica Auna Trujillo — Sistema de Admisión (Prototipo)

Prototipo funcional de alta fidelidad para el sistema de admisión de Clínica Auna Trujillo.
Proyecto académico para el curso de Interacción Humano-Computador (IHC) de la UPN.

## Reglas de trabajo

- Usar siempre **Bash** para comandos de terminal. No usar PowerShell.
- Los mensajes de commit deben ser **breves, de una sola línea**.

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
├── components/Layout.jsx             # Navbar compartido con navegación por rol
└── pages/
    ├── Login.jsx                     # Login + acceso rápido demo
    ├── patient/
    │   ├── Dashboard.jsx             # Portal del paciente
    │   ├── NewAppointment.jsx        # Agendar cita (wizard 4 pasos)
    │   ├── MyAppointments.jsx        # Ver/cancelar/reprogramar citas
    │   └── History.jsx               # Historial de citas pasadas
    ├── receptionist/
    │   ├── Dashboard.jsx             # Panel de admisión con estadísticas
    │   ├── RegisterPatient.jsx       # Registro de nuevo paciente
    │   ├── SearchPatient.jsx         # Buscar + ver + editar paciente
    │   ├── Appointments.jsx          # Gestión de citas (check-in, cancelar)
    │   └── QueueManagement.jsx       # Cola de atención (llamar, atender)
    └── admin/
        └── Dashboard.jsx             # Dashboard con métricas y gráfico semanal
```

## Usuarios demo

| Usuario    | Contraseña | Rol           | Nombre             |
|------------|------------|---------------|---------------------|
| elisa      | 1234       | patient       | Elisa Sada          |
| veronica   | 1234       | receptionist  | Verónica Arellano   |
| gustavo    | 1234       | admin         | Gustavo Rodríguez   |

## Reglas de negocio implementadas (RN01-RN12)

| Regla | Descripción | Estado | Dónde se implementa |
|-------|-------------|--------|---------------------|
| RN01 | Registro con DNI único (8 dígitos) | OK | RegisterPatient.jsx — validación + detección de duplicados |
| RN02 | Disponibilidad por horario del doctor | OK | AppContext.jsx `getAvailableSlots` — filtra turnos ocupados |
| RN03 | Recepcionista edita datos del paciente | OK | SearchPatient.jsx — formulario inline (teléfono, email, dirección, fecha nac.) |
| RN04 | Cola de atención por orden de llegada | OK | QueueManagement.jsx — cola FIFO con posición, llamado y atención |
| RN05 | Reprogramación dentro de 30 días | OK | MyAppointments.jsx — date picker con `max` de 30 días |
| RN06 | Cancelación bloqueada si faltan < 2 horas | OK | MyAppointments.jsx (paciente) + Appointments.jsx (recepcionista) |
| RN07 | Tolerancia de 15 min para check-in | OK | Appointments.jsx — `TOLERANCE_MINUTES = 15`, alerta si llega tarde |
| RN08 | Historial de citas anteriores | OK | History.jsx — lista de citas completadas/canceladas |
| RN09 | Datos obligatorios en registro | OK | RegisterPatient.jsx — validación de DNI, nombre, apellido, teléfono, género |
| RN10 | Cita requiere especialidad + médico + fecha + hora | OK | NewAppointment.jsx — wizard secuencial de 4 pasos |
| RN11 | Roles diferenciados (paciente, recepcionista, admin) | OK | App.jsx `ProtectedRoute` + Layout.jsx navegación por rol |
| RN12 | Actualización de datos personales | OK | SearchPatient.jsx — mismo flujo que RN03 |

## Accesibilidad (WCAG 2.0 AA)

- `aria-label` en todos los inputs y botones de acción
- `role="alert"` y `role="status"` en mensajes de retroalimentación
- Contraste mínimo 4.5:1 en texto sobre fondo
- Targets mínimos de 44x44px (`min-h-[44px]`)
- Navegación por teclado funcional

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
