# Requerimientos — Práctica de Campo 13

Referencia completa extraída del documento `practica_campo_13.docx`.
Curso: Interacción Humano Computador (IHC) — UPN, Trujillo, 2026-1.

---

## 1. Reglas del Negocio (RN01–RN12)

Las reglas del negocio son directrices que definen cómo opera la Clínica Auna Trujillo en el área de Atención al paciente. Estas reglas pertenecen al negocio y no al software; el sistema debe reconocerlas y ajustarse a ellas.

| Código | Nombre | Descripción |
|--------|--------|-------------|
| RN01 | Registro previo obligatorio | Todo paciente debe registrarse en el área de admisión antes de recibir cualquier servicio médico o administrativo dentro de la clínica. |
| RN02 | Identificación única del paciente | Cada paciente debe contar con un documento de identidad válido (DNI u otro documento oficial) para su registro. No se admiten registros duplicados bajo el mismo número de documento. |
| RN03 | Verificación y actualización de datos | El personal de admisión debe verificar y, de ser necesario, actualizar los datos del paciente en cada visita para garantizar la exactitud de la información registrada. |
| RN04 | Atención con cita previa | La atención médica en consulta externa se realiza únicamente con cita previa. La única excepción son los casos de emergencia, los cuales siguen un protocolo de atención diferente. |
| RN05 | Asignación según disponibilidad médica | Las citas médicas deben asignarse respetando la disponibilidad horaria y la especialidad del médico. No se puede asignar una cita a un médico fuera de su horario establecido o especialidad registrada. |
| RN06 | Cancelación con anticipación | Una cita médica puede cancelarse únicamente con un mínimo de 2 horas de anticipación a la hora programada. Las cancelaciones fuera de este plazo quedan registradas como inasistencia del paciente. |
| RN07 | Puntualidad del paciente | El paciente debe presentarse con anticipación a la hora de su cita. Si el paciente llega después del tiempo de tolerancia establecido por la clínica, pierde su turno y debe reprogramar. |
| RN08 | Prioridad por emergencia | En caso de emergencia médica, el paciente tiene prioridad de atención sobre aquellos que cuentan con cita programada, independientemente del orden de llegada. |
| RN09 | Orden de atención | La atención de pacientes sigue un orden establecido basado en el turno asignado y la prioridad médica. No se puede alterar el orden de atención sin una justificación válida registrada en el sistema. |
| RN10 | Respeto de horarios de atención | Los horarios de atención se rigen por la programación diaria de la clínica. No se programan citas fuera del horario de atención establecido para cada especialidad. |
| RN11 | Confidencialidad de la información | La información personal y clínica del paciente es confidencial. Solo el personal autorizado puede acceder, consultar o modificar dicha información, conforme a la normativa de protección de datos personales vigente en el Perú. |
| RN12 | Corrección inmediata de errores de registro | Cualquier error detectado en el registro de datos de un paciente debe ser corregido de forma inmediata por personal autorizado, dejando constancia del cambio realizado. |

---

## 2. Requisitos Funcionales (RF01–RF12)

| Código | Descripción |
|--------|-------------|
| RF01 | **Búsqueda rápida de paciente.** Como recepcionista, quiero buscar a un paciente por su nombre o número de DNI, para acceder rápidamente a su información y agilizar el proceso de atención. |
| RF02 | **Registro de paciente nuevo.** Como recepcionista del área de admisión, quiero registrar los datos personales de un nuevo paciente en el sistema. |
| RF03 | **Actualización de datos del paciente.** Como recepcionista, quiero modificar los datos personales de un paciente registrado, para mantener la información actualizada y evitar errores en la atención. |
| RF04 | **Consulta de disponibilidad de médicos.** Como recepcionista, quiero visualizar los horarios disponibles de los médicos por especialidad, para asignar citas sin generar cruces ni sobrecargas en la agenda médica. |
| RF05 | **Programación de cita médica.** Como recepcionista, quiero programar una cita médica respetando la disponibilidad y especialidad del médico, para organizar correctamente la atención y evitar conflictos de horario. |
| RF06 | **Reprogramación de citas.** Como recepcionista, quiero cambiar la fecha u hora de una cita médica ya registrada, para adaptarme a cambios en la disponibilidad del paciente o del médico sin perder el registro. |
| RF07 | **Cancelación de citas.** Como recepcionista, quiero cancelar una cita médica registrada, para liberar el horario y asignarlo a otro paciente, respetando el plazo mínimo establecido. |
| RF08 | **Registro de llegada del paciente.** Como recepcionista, quiero registrar la llegada del paciente a la clínica confirmando su asistencia, para continuar con el proceso de atención y actualizar el estado de la cita en tiempo real. |
| RF09 | **Atención prioritaria por emergencia.** Como recepcionista, quiero marcar a un paciente como caso de emergencia en el sistema, para que sea atendido con prioridad sobre los pacientes con cita programada, conforme a las reglas del negocio. |
| RF10 | **Gestión de cola de turnos.** Como recepcionista, quiero asignar y gestionar turnos de atención de forma ordenada, para reducir el desorden en la sala de espera y disminuir el tiempo de espera del paciente. |
| RF11 | **Consulta de historial de citas.** Como recepcionista, quiero visualizar las citas anteriores de un paciente buscándolo por nombre o DNI, para tener referencia de su atención previa y evitar duplicidad de registros. |
| RF12 | **Generación de reportes de atención.** Como administrador del área de admisión, quiero generar reportes de citas atendidas, canceladas y pendientes por rango de fechas, para apoyar la toma de decisiones y evaluar la eficiencia del servicio. |

---

## 3. Requisitos No Funcionales (RNF01–RNF08)

| Código | Descripción |
|--------|-------------|
| RNF01 | **Rendimiento.** El sistema debe procesar las solicitudes de registro y programación de citas en menos de 3 segundos, incluso en horarios de alta demanda. |
| RNF02 | **Tiempo de respuesta.** El sistema debe responder a cualquier acción del usuario en menos de 2 segundos en condiciones normales de operación. |
| RNF03 | **Disponibilidad.** El sistema debe estar disponible durante todo el horario de atención de la clínica (7:00 a.m. – 9:00 p.m.), con un mínimo del 99% de tiempo operativo. |
| RNF04 | **Usabilidad.** La interfaz debe ser intuitiva y fácil de operar por el personal de admisión, requiriendo una inducción máxima de 1 hora para su uso correcto, reduciendo la carga cognitiva del usuario. |
| RNF05 | **Seguridad.** El acceso al sistema debe requerir autenticación con usuario y contraseña. Solo el personal autorizado puede consultar, registrar o modificar información de los pacientes. |
| RNF06 | **Confidencialidad de datos.** La información personal y clínica de los pacientes debe estar protegida conforme a la normativa peruana de protección de datos personales (Ley N° 29733). |
| RNF07 | **Compatibilidad.** El sistema debe funcionar correctamente en los navegadores web más utilizados (Chrome, Firefox, Edge) y ser accesible desde dispositivos móviles con Android e iOS. |
| RNF08 | **Escalabilidad.** El sistema debe mantener su rendimiento ante un incremento del 50% en el número de usuarios concurrentes sin degradación del servicio. |

---

## 4. Métricas de Experiencia de Usuario (UX)

### 4.1 Útil

Un sistema es útil cuando proporciona funcionalidades que responden a necesidades reales de los usuarios. La utilidad se evidencia en que el sistema resuelve problemas concretos del área de admisión: la desorganización en la asignación de turnos, los errores en el registro manual de citas y la falta de visibilidad del estado de atención en tiempo real.

Se verificará que cada módulo del sistema atienda una necesidad identificada durante el levantamiento de requerimientos. Un sistema verdaderamente útil no incluye funciones innecesarias ni deja sin cubrir necesidades críticas del usuario.

### 4.2 Usable

Un sistema es usable cuando su funcionamiento es intuitivo y sus funciones básicas pueden ejecutarse sin requerir esfuerzo mental excesivo. El sistema será considerado usable si el personal de admisión puede registrar un paciente, asignar un turno y actualizar el estado de atención de forma rápida y sin consultar un manual.

Se evaluará mediante observación directa durante sesiones de prueba con usuarios reales del área, registrando el nivel de dificultad percibido y el grado de autonomía alcanzado. Un sistema usable genera confianza en el operador y reduce la resistencia al cambio.

### 4.3 Deseable

Un sistema es deseable cuando su diseño genera una experiencia que el usuario valora positivamente y que lo motiva a seguir utilizándolo. Se evaluará considerando la reacción del personal ante el diseño visual, la claridad del lenguaje, la respuesta del sistema ante acciones del usuario (confirmaciones visuales) y la percepción general de modernidad y profesionalismo.

Un sistema deseable genera una experiencia que el usuario prefiere frente a métodos alternativos como el registro manual en papel u hojas de cálculo.

---

## 5. Métricas de Usabilidad

| # | Métrica | Descripción |
|---|---------|-------------|
| 1 | **Reconocibilidad de la adecuación** | El usuario debe comprender rápidamente que el sistema es adecuado para sus necesidades desde el primer contacto. Se espera que el personal identifique las funciones básicas en no más de 3 minutos desde el primer acceso. |
| 2 | **Aprendizabilidad** | Facilidad con la que un usuario puede aprender a utilizar el sistema de forma correcta y autónoma. Un usuario sin experiencia previa debe ejecutar tareas básicas de forma autónoma tras una breve inducción de no más de una sesión. |
| 3 | **Operabilidad** | Qué tan sencillo y fluido resulta interactuar con el sistema en condiciones normales de trabajo. Se analizará el número de pasos requeridos para completar procesos clave, reduciendo la carga cognitiva del operador. |
| 4 | **Protección contra errores de usuario** | Capacidad del sistema para prevenir errores o facilitar su corrección inmediata. Se evaluará la presencia de validaciones en campos obligatorios, mensajes de advertencia claros y facilidad para deshacer acciones erróneas. |
| 5 | **Estética de la interfaz** | Diseño visual agradable y coherente. Se evaluará coherencia de colores, legibilidad de tipografía, distribución ordenada de elementos y claridad de botones de acción. |
| 6 | **Accesibilidad** | El sistema debe ser utilizable por distintos perfiles de usuario. Se consideran tamaño adecuado de textos e íconos, navegación clara, contraste suficiente y compatibilidad con dispositivos del área de admisión. |

---

## 6. User Personas

### Persona 1: Elisa Sada — Paciente frecuente

| Campo | Detalle |
|-------|---------|
| Nombre | Elisa Sada |
| Edad | 45 años |
| Ocupación | Comerciante |
| Ubicación | Trujillo, La Libertad |
| Estado civil | Casada, 2 hijos |
| Nivel tecnológico | Básico — usa celular para llamadas y WhatsApp; agenda citas digitalmente pero prefiere atención presencial cuando tiene dudas |

**Descripción:** Elisa acude regularmente a la clínica para controles médicos, especialmente en oncología. Sus visitas son frecuentes y le preocupa la puntualidad porque coordina sus citas con su jornada de trabajo en el mercado. Valora que la información sea clara y que el proceso sea rápido, ya que no tiene tiempo disponible para esperas largas.

**Objetivos:**
- Obtener citas médicas de manera rápida sin necesidad de ir presencialmente.
- Evitar largas colas en la clínica, especialmente en horarios de alta demanda.
- Acceder fácilmente a su información médica e historial de atenciones.

**Necesidades:**
- Un sistema sencillo para agendar citas desde el celular.
- Información clara sobre horarios disponibles y médicos asignados.
- Reducción de tiempos de espera al llegar a la clínica.

**Frustraciones:**
- Lentitud del sistema en horas pico que retrasa su atención.
- Demoras sin información sobre cuánto tiempo le falta para ser atendida.
- Tener que repetir sus datos en cada visita por falta de historial accesible.

**Comportamientos:**
- Prefiere confirmar su cita por anticipado y no improvisar.
- Si el proceso digital es confuso, prefiere llamar o ir presencialmente.
- Se estresa cuando hay mucha gente en espera y no hay orden visible.

---

### Persona 2: Verónica Arellano — Recepcionista / Personal de admisión

| Campo | Detalle |
|-------|---------|
| Nombre | Verónica Arellano |
| Edad | 29 años |
| Ocupación | Recepcionista – Área de admisión |
| Ubicación | Trujillo, La Libertad |
| Estado civil | Soltera |
| Nivel tecnológico | Intermedio — usa el sistema de gestión clínica diariamente; se adapta bien a herramientas digitales pero necesita interfaces intuitivas bajo presión |

**Descripción:** Verónica trabaja en el área de admisión y se encarga del registro de pacientes y la programación de citas. En horarios de alta demanda atiende a decenas de pacientes por turno, lo que la obliga a trabajar con rapidez y precisión al mismo tiempo. Conoce bien los procesos internos, pero cualquier falla o cambio en el sistema le genera retrasos visibles en la cola de atención.

**Objetivos:**
- Atender a los pacientes de forma rápida y ordenada sin cometer errores.
- Reducir errores en el registro de datos mediante validaciones automáticas.
- Gestionar citas sin conflictos de horario ni duplicados.

**Necesidades:**
- Un sistema rápido e intuitivo que no requiera muchos pasos por tarea.
- Información clara y actualizada sobre disponibilidad médica en tiempo real.
- Herramientas que automaticen procesos repetitivos como validación de DNI.

**Frustraciones:**
- Sistemas lentos o que se cuelgan en los momentos de mayor demanda.
- Interfaces confusas que obligan a cambiar entre múltiples pantallas.
- Presión constante por las colas de pacientes cuando el sistema falla.

**Comportamientos:**
- Prioriza velocidad sobre cualquier otro aspecto al usar el sistema.
- Aprende los procesos por repetición; los cambios de interfaz sin aviso la afectan.
- Reporta fallas solo cuando son críticas; tolera los fallos menores para no perder tiempo.

---

### Persona 3: Gustavo Rodríguez — Administrador del área

| Campo | Detalle |
|-------|---------|
| Nombre | Gustavo Rodríguez |
| Edad | 38 años |
| Ocupación | Administrador del Área de Admisión |
| Ubicación | Trujillo, La Libertad |
| Estado civil | Casado |
| Nivel tecnológico | Intermedio-avanzado — maneja herramientas de gestión y reportería; toma decisiones basadas en datos del sistema |

**Descripción:** Gustavo supervisa el funcionamiento del área de admisión y es responsable de los indicadores de eficiencia del servicio. No opera el sistema directamente con los pacientes, pero necesita acceso constante a reportes para identificar cuellos de botella y tomar decisiones de mejora. Le preocupa la imagen de la clínica cuando los tiempos de espera se prolongan.

**Objetivos:**
- Optimizar los procesos de atención reduciendo tiempos de espera.
- Tomar decisiones informadas basadas en reportes claros y actualizados.
- Mejorar la experiencia general del paciente en el área de admisión.

**Necesidades:**
- Reportes claros, automáticos y actualizados sobre el flujo de atención.
- Control en tiempo real sobre el estado del área durante horas pico.
- Sistemas confiables que no interrumpan el servicio en momentos críticos.

**Frustraciones:**
- Falta de datos precisos o reportes desactualizados para tomar decisiones.
- Procesos desorganizados que generan quejas recurrentes de pacientes.
- No poder anticipar ni gestionar los picos de demanda por falta de información oportuna.

**Comportamientos:**
- Revisa indicadores de rendimiento al inicio y al cierre de cada turno.
- Interviene en el área solo cuando los problemas escalan a quejas formales.
- Prefiere soluciones sistémicas a parches operativos temporales.

---

## 7. User Scenarios

### Escenario 1: Agendamiento de cita médica

Elisa termina de atender a sus clientes en el mercado cerca de las 2 p.m. y recuerda que debe programar su control oncológico mensual. No puede ir presencialmente porque tiene que regresar al negocio. Decide ingresar al sistema de citas en línea de Clínica AUNA desde su celular.

Ingresa con su DNI y contraseña, selecciona la especialidad "Oncología" y revisa los horarios disponibles. Encuentra un turno el miércoles a las 4 p.m., que coincide con su hora de cierre. Confirma la cita y recibe un mensaje de confirmación. El sistema le ofrece un recordatorio automático 24 horas antes; Elisa acepta.

El miércoles llega a la clínica a las 3:50 p.m. Verónica la ubica en el sistema ingresando su DNI, confirma el turno y le indica que pase a sala de espera. Elisa es atendida a la hora indicada sin necesidad de hacer cola en el mostrador.

**Punto de fricción:** Si el sistema no refleja la disponibilidad médica en tiempo real, Elisa podría seleccionar un horario ya ocupado y enterarse recién al llegar, generando frustración y pérdida de tiempo en su jornada laboral.

**Resultado esperado:** El sistema debe mostrar disponibilidad actualizada en tiempo real y confirmar la cita de forma inmediata, garantizando que Elisa llegue a la clínica con su turno asegurado.

---

### Escenario 2: Registro de paciente nuevo

Un paciente nuevo llega a la clínica. Verónica debe registrar sus datos en el sistema. La interfaz del módulo solicita datos en varios pasos separados: primero datos personales, luego datos de contacto, y finalmente la asignación de especialidad y médico. Cada pantalla requiere confirmar antes de continuar. El proceso toma cerca de 5 minutos, tiempo durante el cual la cola de espera sigue creciendo.

Durante el registro, Verónica comete un error en el número de celular que no detecta hasta que el sistema intenta enviar la confirmación. Debe volver al módulo de edición, corregirlo y reconfirmar, lo que añade 2 minutos adicionales.

**Punto de fricción:** La fragmentación del proceso de registro en múltiples pantallas sin validación en tiempo real genera errores y retrasos acumulativos, especialmente bajo la presión de horas pico.

**Resultado esperado:** Un sistema más claro e intuitivo, con validación automática de datos y registro en una sola pantalla, permitiría reducir errores y agilizar el proceso de atención.

---

### Escenario 3: Gestión en hora pico

Gustavo revisa los reportes del turno de la mañana a las 11 a.m. y nota que el tiempo promedio de espera superó los 35 minutos entre las 9 y las 10 a.m. No tiene información detallada sobre qué causó el retraso: si fue lentitud del sistema, exceso de pacientes sin cita, o problemas con algún médico.

El sistema solo muestra el tiempo total de espera, pero no desglosa los datos por tipo de atención ni por causa de demora. Gustavo debe llamar directamente a Verónica para entender qué pasó, interrumpiendo su atención en ventanilla. Con esa información decide ajustar la distribución de turnos para la tarde, pero no encuentra una herramienta en el sistema para hacerlo y debe comunicar el cambio verbalmente al personal.

**Punto de fricción:** La ausencia de reportes desglosados y herramientas de gestión en tiempo real obliga a Gustavo a intervenir de forma manual y reactiva, cuando el problema ya afectó la atención.

**Resultado esperado:** Un sistema con dashboard de reportes detallados y herramientas de redistribución de turnos permitiría a Gustavo anticipar picos de demanda y tomar decisiones oportunas sin interrumpir al personal operativo.

---

## 8. User Stories (Historias de Usuario)

| # | Historia de Usuario |
|---|---------------------|
| US01 | Como **Elisa** (paciente frecuente de oncología), quiero agendar una cita en línea seleccionando especialidad y horario, para evitar hacer colas en la clínica y coordinar mis visitas con mi jornada laboral. |
| US02 | Como **Verónica** (recepcionista de admisión), quiero buscar rápidamente a un paciente por DNI desde el panel de atención, para agilizar la atención sin interrumpir el flujo de la cola. |
| US03 | Como **Verónica** (recepcionista de admisión), quiero visualizar la disponibilidad de médicos en tiempo real, para asignar turnos sin generar conflictos de horario. |
| US04 | Como **Elisa** (paciente frecuente), quiero recibir una confirmación automática de mi cita por mensaje, para asegurarme de que está registrada correctamente antes de ir a la clínica. |
| US05 | Como **Gustavo** (administrador del área de admisión), quiero generar reportes desglosados de atención por hora y tipo de consulta, para identificar cuellos de botella y tomar decisiones informadas. |
| US06 | Como **Verónica** (recepcionista de admisión), quiero registrar a un paciente nuevo desde una sola pantalla con validación automática de datos, para reducir errores y acortar el tiempo de registro. |
| US07 | Como **Elisa** (paciente con agenda variable), quiero cancelar o reprogramar mi cita desde la aplicación, para adaptarme a cambios en mi disponibilidad sin necesidad de llamar a la clínica. |
| US08 | Como **Verónica** (recepcionista de admisión), quiero insertar un turno de urgencia directamente desde el panel de cola activa, para atender casos imprevistos sin interrumpir el flujo normal de atención. |
| US09 | Como **Verónica** (recepcionista de admisión), quiero registrar la llegada del paciente con un solo clic, para actualizar automáticamente el estado de la cita en tiempo real. |
| US10 | Como **Elisa** (paciente frecuente), quiero consultar mis citas anteriores e historial de atenciones desde la aplicación, para tener seguimiento de mis controles médicos sin depender del personal. |

---

## 9. Impact Mapping

**Objetivo principal:** Mejorar la eficiencia del proceso de atención en el área de admisión de Clínica AUNA Trujillo.

### Actores, Impactos y Entregables

| Actor | Impacto esperado | Entregable del sistema |
|-------|-----------------|------------------------|
| **Pacientes** | Reducción del tiempo de espera | Módulo de citas en línea con selección de especialidad, médico y horario. Verificación automática de cita por DNI al llegar a admisión. |
| | Mayor satisfacción con el servicio | Sistema de notificaciones y recordatorios automáticos 24h antes de la cita. |
| | Mejor acceso a citas médicas | Función para cancelar o reprogramar citas desde la aplicación. |
| **Recepcionistas** | Mayor rapidez en el registro | Formulario de registro unificado con validación automática de datos en una sola pantalla. |
| | Reducción de errores | Validación automática de DNI y datos del paciente al momento del registro. |
| | Menor carga de estrés | Panel unificado con cola activa, registro e inserción rápida de turnos de urgencia. |
| **Administrador** | Mejor control del proceso | Función de check-in del paciente con un solo clic desde la vista de cola. |
| | Toma de decisiones basada en datos | Dashboard con reportes desglosados de atención por hora y tipo de consulta. |
| | Optimización de recursos | Herramienta de redistribución de turnos desde el panel de administración. |

---

## 10. Inclusión de Requisitos para Personas con Discapacidad

De acuerdo con el sílabo del curso y el ODS 10 (Reducción de las desigualdades), el sistema debe contemplar requisitos que garanticen el acceso equitativo a personas con discapacidad.

**Marco legal:** Ley General de la Persona con Discapacidad (Ley N° 29973) + WCAG 2.0 (Web Content Accessibility Guidelines).

### 10.1 Discapacidad visual

Los usuarios con baja visión o ceguera pueden encontrar barreras al interactuar con formularios, botones y mensajes de error sin contraste suficiente o incompatibles con lectores de pantalla.

| Código | Requisito |
|--------|-----------|
| RNF-ACC01 | La interfaz debe mantener una relación de contraste mínima de 4.5:1 entre el texto y el fondo, conforme a WCAG 2.0 nivel AA. |
| RNF-ACC02 | Todos los elementos interactivos (botones, campos de formulario, iconos) deben incluir atributos `alt` y `aria-label` para compatibilidad con lectores de pantalla (NVDA, JAWS). |
| RNF-ACC03 | El sistema debe permitir el ajuste del tamaño de fuente sin pérdida de funcionalidad, soportando zoom de hasta el 200%. |

### 10.2 Discapacidad motriz

Pacientes o personal con movilidad reducida en manos o brazos pueden tener dificultad para usar el mouse o interactuar con elementos pequeños.

| Código | Requisito |
|--------|-----------|
| RNF-ACC04 | Todas las funciones del sistema deben ser accesibles mediante teclado, sin necesidad de uso exclusivo del ratón (navegación por tabulación, atajos de teclado). |
| RNF-ACC05 | Los elementos interactivos deben tener un área de clic mínima de 44x44 píxeles, conforme a las recomendaciones WCAG 2.5.5. |
| RNF-ACC06 | El sistema no debe requerir acciones simultáneas de múltiples teclas o movimientos de arrastre complejos para completar tareas críticas. |

### 10.3 Discapacidad auditiva

Si el sistema incorpora notificaciones sonoras o videos, los usuarios con discapacidad auditiva quedarían excluidos.

| Código | Requisito |
|--------|-----------|
| RNF-ACC07 | Todas las alertas, notificaciones y confirmaciones deben presentarse de forma visual (mensajes en pantalla, colores, iconos), y no depender exclusivamente de señales sonoras. |
| RNF-ACC08 | En caso de incorporar contenido audiovisual informativo, este debe incluir subtítulos o transcripción textual. |

### 10.4 Discapacidad cognitiva

Usuarios con dificultades de comprensión, memoria o concentración pueden verse afectados por interfaces complejas o flujos confusos.

| Código | Requisito |
|--------|-----------|
| RNF-ACC09 | El lenguaje utilizado en la interfaz debe ser claro, directo y libre de tecnicismos innecesarios, aplicando principios de lenguaje sencillo. |
| RNF-ACC10 | Los formularios deben mostrar instrucciones claras y mensajes de error específicos que indiquen exactamente qué campo está incompleto o incorrecto. |
| RNF-ACC11 | El flujo de registro de paciente no debe superar tres pasos visibles para el usuario, con indicador de progreso en todo momento. |

### Respuesta desde la ingeniería de software

**Nivel de diseño:** Se aplicarán principios de Diseño Universal desde las primeras etapas. Las decisiones de diseño seguirán WCAG 2.0 nivel AA como estándar mínimo: perceptible, operable, comprensible y robusto.

**Nivel de desarrollo:** HTML semántico para compatibilidad con tecnologías de asistencia. Roles ARIA en componentes dinámicos. Pruebas con axe DevTools y validador de contraste de WebAIM.

**Nivel de pruebas:** Sesión de pruebas de usabilidad con al menos un usuario que presente alguna condición de discapacidad o limitación funcional. Evaluación automatizada de accesibilidad sobre el prototipo funcional.

---

## 11. Design Sprint (Resumen)

### Fase 1: Entender

**Objetivo comercial:** Mejorar la eficiencia operativa del área de Admisión, reduciendo tiempos de espera, minimizando errores en el registro y optimizando la gestión de citas.

**Problemas identificados:**
- Lentitud del sistema en alta demanda (>35 min de espera en horas pico)
- Interfaces poco intuitivas (múltiples pantallas por tarea)
- Ausencia de validación automática de datos
- Falta de reportería desglosada
- Acumulación de pacientes sin cita en horas pico

### Fase 2: Divergir — Propuestas

1. **Registro unificado con validación en tiempo real** — formulario único en una sola pantalla con validación de DNI en tiempo real.
2. **Panel de cola activa con gestión visual** — tablero kanban: en espera, en atención, atendido. Un solo clic para urgencias, turnos y llegadas.
3. **Portal de autogestión para pacientes** — citas en línea desde el navegador móvil con recordatorios automáticos.
4. **Dashboard de administración con reportes desglosados** — indicadores en tiempo real, redistribución de turnos.

### Fase 3: Decidir

**Seleccionadas:** Propuestas 1, 2 y 3.
**Diferida:** Propuesta 4 (dashboard) diferida a segunda iteración — requiere datos reales de los módulos operativos.

---

## 12. Problemas Identificados (Resumen)

1. Lentitud del sistema en horarios de alta demanda, generando retrasos y tiempos de espera prolongados.
2. Interfaces poco intuitivas que dificultan el uso del sistema por parte del personal en situaciones de presión.
3. Acumulación de pacientes en horas pico, provocando largas colas y desorganización del servicio.
4. Falta de capacitación adecuada en el uso de sistemas, ocasionando errores en el registro de información.
5. Fallas técnicas imprevistas que interrumpen el proceso de atención y afectan la experiencia del usuario.

---

## 13. Capacidad Tecnológica

- Infraestructura de red local
- Computadoras de escritorio en el área de admisión
- Navegadores web modernos: Chrome, Firefox, Edge
- Aplicación web responsiva, compatible con Android e iOS
- Horario operativo: 7:00 a.m. – 9:00 p.m.
