export const specialties = [
  { id: 1, name: 'Oncología' },
  { id: 2, name: 'Medicina General' },
  { id: 3, name: 'Pediatría' },
  { id: 4, name: 'Ginecología' },
  { id: 5, name: 'Cardiología' },
  { id: 6, name: 'Traumatología' },
  { id: 7, name: 'Cirugía General' },
];

export const doctors = [
  { id: 1, name: 'Dr. Carlos Mendoza', specialtyId: 1, schedule: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] },
  { id: 2, name: 'Dra. María Torres', specialtyId: 1, schedule: ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00', '18:00'] },
  { id: 3, name: 'Dr. José García', specialtyId: 2, schedule: ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] },
  { id: 4, name: 'Dra. Ana López', specialtyId: 3, schedule: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { id: 5, name: 'Dra. Rosa Chávez', specialtyId: 4, schedule: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] },
  { id: 6, name: 'Dr. Luis Paredes', specialtyId: 5, schedule: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00', '18:00'] },
  { id: 7, name: 'Dr. Ricardo Vega', specialtyId: 6, schedule: ['07:00', '08:00', '09:00', '10:00', '15:00', '16:00', '17:00'] },
  { id: 8, name: 'Dr. Fernando Ruiz', specialtyId: 7, schedule: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] },
];

export const initialPatients = [
  { id: 1,  dni: '45678912', firstName: 'Elisa',        lastName: 'Sada',                phone: '987654321', email: 'elisa.sada@email.com',         birthDate: '1981-03-15', address: 'Av. Larco 450, Trujillo',                    gender: 'F' },
  { id: 2,  dni: '71234567', firstName: 'Pedro',        lastName: 'Castillo Ramos',      phone: '976543210', email: 'pedro.castillo@email.com',      birthDate: '1990-07-22', address: 'Jr. Pizarro 120, Trujillo',                   gender: 'M' },
  { id: 3,  dni: '80123456', firstName: 'Carmen',       lastName: 'Flores Díaz',         phone: '965432109', email: 'carmen.flores@email.com',       birthDate: '1975-11-08', address: 'Urb. El Golf 88, Trujillo',                   gender: 'F' },
  { id: 4,  dni: '43218765', firstName: 'Jorge',        lastName: 'Velásquez Paredes',   phone: '944123456', email: 'jorge.velasquez@email.com',     birthDate: '1988-01-20', address: 'Av. España 1520, Trujillo',                   gender: 'M' },
  { id: 5,  dni: '72345618', firstName: 'Lucía',        lastName: 'Rodríguez Mantilla',  phone: '933456789', email: 'lucia.rodriguez@email.com',     birthDate: '1995-09-12', address: 'Urb. San Andrés 340, Trujillo',               gender: 'F' },
  { id: 6,  dni: '41567823', firstName: 'Roberto',      lastName: 'Gutiérrez Lozano',    phone: '922789012', email: 'roberto.gutierrez@email.com',   birthDate: '1972-05-30', address: 'Jr. Bolívar 890, Centro Histórico, Trujillo', gender: 'M' },
  { id: 7,  dni: '73456129', firstName: 'María Elena',  lastName: 'Sánchez Quispe',      phone: '911234567', email: 'maria.sanchez@email.com',       birthDate: '1983-12-04', address: 'Urb. La Merced 156, Trujillo',                gender: 'F' },
  { id: 8,  dni: '46789234', firstName: 'Carlos Alberto', lastName: 'Ruiz Díaz',         phone: '955678901', email: 'carlos.ruiz@email.com',         birthDate: '1969-08-17', address: 'Av. Mansiche 2100, Trujillo',                 gender: 'M' },
  { id: 9,  dni: '74561238', firstName: 'Ana Patricia', lastName: 'Torres Mendoza',      phone: '966789012', email: 'ana.torres@email.com',          birthDate: '1992-04-25', address: 'Urb. Primavera 430, Trujillo',                gender: 'F' },
  { id: 10, dni: '42345671', firstName: 'Fernando',     lastName: 'Chávez Orbegoso',     phone: '977890123', email: 'fernando.chavez@email.com',     birthDate: '1985-06-11', address: 'Av. Húsares de Junín 580, Trujillo',          gender: 'M' },
  { id: 11, dni: '75678342', firstName: 'Rosa',         lastName: 'López Avalos',        phone: '988901234', email: 'rosa.lopez@email.com',          birthDate: '1978-02-28', address: 'Urb. Santa María 220, Trujillo',              gender: 'F' },
  { id: 12, dni: '43567812', firstName: 'Miguel Ángel', lastName: 'Herrera Castillo',    phone: '999012345', email: 'miguel.herrera@email.com',      birthDate: '1991-10-03', address: 'Jr. Grau 670, Trujillo',                     gender: 'M' },
  { id: 13, dni: '76789453', firstName: 'Gabriela',     lastName: 'Vargas Pinillos',     phone: '900123456', email: 'gabriela.vargas@email.com',     birthDate: '1987-07-19', address: 'Av. América Sur 1340, Trujillo',              gender: 'F' },
  { id: 14, dni: '47891234', firstName: 'Sofía',        lastName: 'Reyes Aguirre',       phone: '912345678', email: 'sofia.reyes@email.com',         birthDate: '1998-03-10', address: 'Urb. California 780, Trujillo',               gender: 'F' },
  { id: 15, dni: '77234561', firstName: 'Diego',        lastName: 'Alvarado Méndez',     phone: '923456789', email: 'diego.alvarado@email.com',      birthDate: '1993-11-22', address: 'Av. Federico Villarreal 1200, Trujillo',      gender: 'M' },
  { id: 16, dni: '48123456', firstName: 'Patricia',     lastName: 'Vásquez Espino',      phone: '934567890', email: 'patricia.vasquez@email.com',    birthDate: '1970-06-15', address: 'Jr. Independencia 450, Trujillo',             gender: 'F' },
  { id: 17, dni: '78345612', firstName: 'Manuel',       lastName: 'Quispe Salinas',      phone: '945678901', email: 'manuel.quispe@email.com',       birthDate: '1982-09-08', address: 'Urb. Los Laureles 123, Trujillo',             gender: 'M' },
  { id: 18, dni: '44567891', firstName: 'Claudia',      lastName: 'Morales Tafur',       phone: '956789012', email: 'claudia.morales@email.com',     birthDate: '1996-01-30', address: 'Av. Túpac Amaru 890, Trujillo',               gender: 'F' },
  { id: 19, dni: '79456123', firstName: 'Luis Eduardo', lastName: 'Benites Campos',      phone: '967890123', email: 'luis.benites@email.com',        birthDate: '1979-12-05', address: 'Urb. El Recreo 567, Trujillo',                gender: 'M' },
  { id: 20, dni: '45678123', firstName: 'Verónica',     lastName: 'Núñez Pretell',       phone: '978901234', email: 'veronica.nunez@email.com',      birthDate: '1988-04-20', address: 'Av. Los Incas 2340, Trujillo',                gender: 'F' },
];

const today = new Date();
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const relTime = (minutesAgo) => {
  const d = new Date(); d.setMinutes(d.getMinutes() - minutesAgo);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export const initialAppointments = [
  // ── HISTORIAL DE ELISA (paciente demo) ──
  { id: 1,  patientId: 1,  doctorId: 1, specialtyId: 1, date: fmt(addDays(today, 3)),   time: '10:00', status: 'confirmed',  type: 'control'  },
  { id: 4,  patientId: 1,  doctorId: 1, specialtyId: 1, date: fmt(addDays(today, -7)),  time: '10:00', status: 'completed',  type: 'control'  },
  { id: 5,  patientId: 1,  doctorId: 2, specialtyId: 1, date: fmt(addDays(today, -30)), time: '15:00', status: 'completed',  type: 'control'  },
  // ── MAÑANA ──
  { id: 2,  patientId: 2,  doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 1)),   time: '09:00', status: 'confirmed',  type: 'consulta' },
  { id: 14, patientId: 8,  doctorId: 1, specialtyId: 1, date: fmt(addDays(today, 1)),   time: '09:00', status: 'confirmed',  type: 'consulta' },
  { id: 15, patientId: 9,  doctorId: 4, specialtyId: 3, date: fmt(addDays(today, 1)),   time: '14:00', status: 'confirmed',  type: 'consulta' },
  { id: 19, patientId: 13, doctorId: 5, specialtyId: 4, date: fmt(addDays(today, 1)),   time: '11:00', status: 'confirmed',  type: 'consulta' },
  { id: 50, patientId: 14, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 1)),   time: '10:00', status: 'confirmed',  type: 'consulta' },
  { id: 51, patientId: 16, doctorId: 6, specialtyId: 5, date: fmt(addDays(today, 1)),   time: '16:00', status: 'confirmed',  type: 'control'  },
  { id: 52, patientId: 18, doctorId: 8, specialtyId: 7, date: fmt(addDays(today, 1)),   time: '15:00', status: 'confirmed',  type: 'consulta' },
  { id: 53, patientId: 20, doctorId: 2, specialtyId: 1, date: fmt(addDays(today, 1)),   time: '17:00', status: 'confirmed',  type: 'control'  },
  // Más mañana para que se vea cargado
  { id: 110, patientId: 3,  doctorId: 1, specialtyId: 1, date: fmt(addDays(today, 1)), time: '08:00', status: 'confirmed', type: 'consulta' },
  { id: 111, patientId: 5,  doctorId: 1, specialtyId: 1, date: fmt(addDays(today, 1)), time: '10:00', status: 'confirmed', type: 'control'  },
  { id: 112, patientId: 6,  doctorId: 1, specialtyId: 1, date: fmt(addDays(today, 1)), time: '14:00', status: 'confirmed', type: 'consulta' },
  { id: 113, patientId: 7,  doctorId: 1, specialtyId: 1, date: fmt(addDays(today, 1)), time: '15:00', status: 'confirmed', type: 'consulta' },
  { id: 114, patientId: 9,  doctorId: 2, specialtyId: 1, date: fmt(addDays(today, 1)), time: '10:00', status: 'confirmed', type: 'consulta' },
  { id: 115, patientId: 11, doctorId: 2, specialtyId: 1, date: fmt(addDays(today, 1)), time: '15:00', status: 'confirmed', type: 'control'  },
  { id: 116, patientId: 12, doctorId: 2, specialtyId: 1, date: fmt(addDays(today, 1)), time: '16:00', status: 'confirmed', type: 'consulta' },
  { id: 117, patientId: 13, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 1)), time: '07:00', status: 'confirmed', type: 'consulta' },
  { id: 118, patientId: 14, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 1)), time: '08:00', status: 'confirmed', type: 'consulta' },
  { id: 119, patientId: 15, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 1)), time: '11:00', status: 'confirmed', type: 'consulta' },
  { id: 120, patientId: 17, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 1)), time: '14:00', status: 'confirmed', type: 'control'  },
  { id: 121, patientId: 18, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 1)), time: '15:00', status: 'confirmed', type: 'consulta' },
  { id: 122, patientId: 19, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 1)), time: '16:00', status: 'confirmed', type: 'consulta' },
  { id: 123, patientId: 4,  doctorId: 4, specialtyId: 3, date: fmt(addDays(today, 1)), time: '08:00', status: 'confirmed', type: 'consulta' },
  { id: 124, patientId: 6,  doctorId: 4, specialtyId: 3, date: fmt(addDays(today, 1)), time: '10:00', status: 'confirmed', type: 'consulta' },
  { id: 125, patientId: 8,  doctorId: 4, specialtyId: 3, date: fmt(addDays(today, 1)), time: '11:00', status: 'confirmed', type: 'control'  },
  { id: 126, patientId: 10, doctorId: 5, specialtyId: 4, date: fmt(addDays(today, 1)), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 127, patientId: 12, doctorId: 5, specialtyId: 4, date: fmt(addDays(today, 1)), time: '10:00', status: 'confirmed', type: 'consulta' },
  { id: 128, patientId: 14, doctorId: 5, specialtyId: 4, date: fmt(addDays(today, 1)), time: '14:00', status: 'confirmed', type: 'control'  },
  { id: 129, patientId: 16, doctorId: 5, specialtyId: 4, date: fmt(addDays(today, 1)), time: '15:00', status: 'confirmed', type: 'consulta' },
  { id: 130, patientId: 17, doctorId: 6, specialtyId: 5, date: fmt(addDays(today, 1)), time: '08:00', status: 'confirmed', type: 'consulta' },
  { id: 131, patientId: 18, doctorId: 6, specialtyId: 5, date: fmt(addDays(today, 1)), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 132, patientId: 20, doctorId: 6, specialtyId: 5, date: fmt(addDays(today, 1)), time: '14:00', status: 'confirmed', type: 'control'  },
  { id: 133, patientId: 3,  doctorId: 6, specialtyId: 5, date: fmt(addDays(today, 1)), time: '15:00', status: 'confirmed', type: 'consulta' },
  { id: 134, patientId: 5,  doctorId: 7, specialtyId: 6, date: fmt(addDays(today, 1)), time: '07:00', status: 'confirmed', type: 'consulta' },
  { id: 135, patientId: 7,  doctorId: 7, specialtyId: 6, date: fmt(addDays(today, 1)), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 136, patientId: 9,  doctorId: 7, specialtyId: 6, date: fmt(addDays(today, 1)), time: '10:00', status: 'confirmed', type: 'control'  },
  { id: 137, patientId: 11, doctorId: 7, specialtyId: 6, date: fmt(addDays(today, 1)), time: '15:00', status: 'confirmed', type: 'consulta' },
  { id: 138, patientId: 13, doctorId: 8, specialtyId: 7, date: fmt(addDays(today, 1)), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 139, patientId: 15, doctorId: 8, specialtyId: 7, date: fmt(addDays(today, 1)), time: '10:00', status: 'confirmed', type: 'consulta' },
  { id: 140, patientId: 19, doctorId: 8, specialtyId: 7, date: fmt(addDays(today, 1)), time: '14:00', status: 'confirmed', type: 'control'  },

  // ── PASADO MAÑANA ──
  { id: 3,  patientId: 3,  doctorId: 5, specialtyId: 4, date: fmt(addDays(today, 2)),   time: '14:00', status: 'confirmed',  type: 'consulta' },
  { id: 16, patientId: 10, doctorId: 8, specialtyId: 7, date: fmt(addDays(today, 2)),   time: '10:00', status: 'confirmed',  type: 'consulta' },
  { id: 17, patientId: 11, doctorId: 2, specialtyId: 1, date: fmt(addDays(today, 2)),   time: '15:00', status: 'confirmed',  type: 'control'  },
  { id: 54, patientId: 15, doctorId: 4, specialtyId: 3, date: fmt(addDays(today, 2)),   time: '09:00', status: 'confirmed',  type: 'consulta' },
  { id: 55, patientId: 17, doctorId: 7, specialtyId: 6, date: fmt(addDays(today, 2)),   time: '16:00', status: 'confirmed',  type: 'consulta' },
  { id: 56, patientId: 19, doctorId: 1, specialtyId: 1, date: fmt(addDays(today, 2)),   time: '11:00', status: 'confirmed',  type: 'control'  },

  // ── EN 3 DÍAS ──
  { id: 18, patientId: 12, doctorId: 7, specialtyId: 6, date: fmt(addDays(today, 3)),   time: '08:00', status: 'confirmed',  type: 'consulta' },
  { id: 57, patientId: 4,  doctorId: 6, specialtyId: 5, date: fmt(addDays(today, 3)),   time: '14:00', status: 'confirmed',  type: 'control'  },
  { id: 58, patientId: 6,  doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 3)),   time: '10:00', status: 'confirmed',  type: 'consulta' },
  { id: 59, patientId: 20, doctorId: 5, specialtyId: 4, date: fmt(addDays(today, 3)),   time: '15:00', status: 'confirmed',  type: 'consulta' },

  // ══════════════════════════════════════════════════════════════
  // ── CITAS DE HOY — distribución balanceada
  // Cada médico tiene exactamente 3 turnos libres
  // ══════════════════════════════════════════════════════════════

  // Dr. Carlos Mendoza (Oncología) — 5 ocupados / 3 libres (09, 11, 15)
  { id: 200, patientId: 1,  doctorId: 1, specialtyId: 1, date: fmt(today), time: '08:00', status: 'completed', type: 'control'  },
  { id: 201, patientId: 4,  doctorId: 1, specialtyId: 1, date: fmt(today), time: '10:00', status: 'confirmed', type: 'consulta' },
  { id: 202, patientId: 15, doctorId: 1, specialtyId: 1, date: fmt(today), time: '14:00', status: 'confirmed', type: 'consulta' },
  { id: 203, patientId: 18, doctorId: 1, specialtyId: 1, date: fmt(today), time: '16:00', status: 'confirmed', type: 'consulta' },
  { id: 204, patientId: 20, doctorId: 1, specialtyId: 1, date: fmt(today), time: '17:00', status: 'confirmed', type: 'control'  },

  // Dra. María Torres (Oncología) — 4 ocupados / 3 libres (10, 16, 18)
  { id: 205, patientId: 7,  doctorId: 2, specialtyId: 1, date: fmt(today), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 206, patientId: 12, doctorId: 2, specialtyId: 1, date: fmt(today), time: '11:00', status: 'confirmed', type: 'consulta' },
  { id: 207, patientId: 19, doctorId: 2, specialtyId: 1, date: fmt(today), time: '15:00', status: 'confirmed', type: 'control'  },
  { id: 208, patientId: 3,  doctorId: 2, specialtyId: 1, date: fmt(today), time: '17:00', status: 'confirmed', type: 'consulta' },

  // Dr. José García (Medicina General) — 6 ocupados / 3 libres (09, 15, 17)
  { id: 209, patientId: 2,  doctorId: 3, specialtyId: 2, date: fmt(today), time: '07:00', status: 'completed', type: 'consulta' },
  { id: 210, patientId: 5,  doctorId: 3, specialtyId: 2, date: fmt(today), time: '08:00', status: 'completed', type: 'consulta' },
  { id: 211, patientId: 13, doctorId: 3, specialtyId: 2, date: fmt(today), time: '10:00', status: 'confirmed', type: 'consulta' },
  { id: 212, patientId: 17, doctorId: 3, specialtyId: 2, date: fmt(today), time: '11:00', status: 'confirmed', type: 'control'  },
  { id: 213, patientId: 16, doctorId: 3, specialtyId: 2, date: fmt(today), time: '14:00', status: 'confirmed', type: 'consulta' },
  { id: 214, patientId: 8,  doctorId: 3, specialtyId: 2, date: fmt(today), time: '16:00', status: 'confirmed', type: 'consulta' },

  // Dra. Ana López (Pediatría) — 4 ocupados / 3 libres (09, 14, 16)
  { id: 215, patientId: 9,  doctorId: 4, specialtyId: 3, date: fmt(today), time: '08:00', status: 'completed', type: 'consulta' },
  { id: 216, patientId: 14, doctorId: 4, specialtyId: 3, date: fmt(today), time: '10:00', status: 'confirmed', type: 'consulta' },
  { id: 217, patientId: 3,  doctorId: 4, specialtyId: 3, date: fmt(today), time: '11:00', status: 'confirmed', type: 'consulta' },
  { id: 218, patientId: 10, doctorId: 4, specialtyId: 3, date: fmt(today), time: '15:00', status: 'confirmed', type: 'consulta' },

  // Dra. Rosa Chávez (Ginecología) — 4 ocupados / 3 libres (10, 15, 17)
  { id: 219, patientId: 6,  doctorId: 5, specialtyId: 4, date: fmt(today), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 220, patientId: 20, doctorId: 5, specialtyId: 4, date: fmt(today), time: '11:00', status: 'confirmed', type: 'control'  },
  { id: 221, patientId: 5,  doctorId: 5, specialtyId: 4, date: fmt(today), time: '14:00', status: 'confirmed', type: 'consulta' },
  { id: 222, patientId: 11, doctorId: 5, specialtyId: 4, date: fmt(today), time: '16:00', status: 'confirmed', type: 'consulta' },

  // Dr. Luis Paredes (Cardiología) — 5 ocupados / 3 libres (10, 15, 17)
  { id: 223, patientId: 8,  doctorId: 6, specialtyId: 5, date: fmt(today), time: '08:00', status: 'confirmed', type: 'consulta' },
  { id: 224, patientId: 12, doctorId: 6, specialtyId: 5, date: fmt(today), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 225, patientId: 6,  doctorId: 6, specialtyId: 5, date: fmt(today), time: '14:00', status: 'confirmed', type: 'control'  },
  { id: 226, patientId: 1,  doctorId: 6, specialtyId: 5, date: fmt(today), time: '18:00', status: 'confirmed', type: 'consulta' },
  { id: 227, patientId: 13, doctorId: 6, specialtyId: 5, date: fmt(today), time: '17:00', status: 'confirmed', type: 'consulta' },

  // Dr. Ricardo Vega (Traumatología) — 4 ocupados / 3 libres (08, 10, 16)
  { id: 228, patientId: 17, doctorId: 7, specialtyId: 6, date: fmt(today), time: '07:00', status: 'confirmed', type: 'consulta' },
  { id: 229, patientId: 4,  doctorId: 7, specialtyId: 6, date: fmt(today), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 230, patientId: 9,  doctorId: 7, specialtyId: 6, date: fmt(today), time: '15:00', status: 'confirmed', type: 'control'  },
  { id: 231, patientId: 14, doctorId: 7, specialtyId: 6, date: fmt(today), time: '17:00', status: 'confirmed', type: 'consulta' },

  // Dr. Fernando Ruiz (Cirugía General) — 5 ocupados / 3 libres (10, 15, 17)
  { id: 232, patientId: 19, doctorId: 8, specialtyId: 7, date: fmt(today), time: '08:00', status: 'confirmed', type: 'consulta' },
  { id: 233, patientId: 11, doctorId: 8, specialtyId: 7, date: fmt(today), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 234, patientId: 18, doctorId: 8, specialtyId: 7, date: fmt(today), time: '11:00', status: 'confirmed', type: 'control'  },
  { id: 235, patientId: 7,  doctorId: 8, specialtyId: 7, date: fmt(today), time: '14:00', status: 'confirmed', type: 'consulta' },
  { id: 236, patientId: 10, doctorId: 8, specialtyId: 7, date: fmt(today), time: '16:00', status: 'confirmed', type: 'consulta' },

  // ── HISTORIAL (completadas y canceladas) ──
  { id: 6,  patientId: 2,  doctorId: 6, specialtyId: 5, date: fmt(addDays(today, -14)), time: '08:00', status: 'completed', type: 'consulta' },
  { id: 7,  patientId: 3,  doctorId: 4, specialtyId: 3, date: fmt(addDays(today, -5)),  time: '11:00', status: 'cancelled', type: 'consulta' },
  { id: 20, patientId: 4,  doctorId: 3, specialtyId: 2, date: fmt(addDays(today, -3)),  time: '10:00', status: 'completed', type: 'consulta' },
  { id: 21, patientId: 5,  doctorId: 6, specialtyId: 5, date: fmt(addDays(today, -10)), time: '14:00', status: 'completed', type: 'control'  },
  { id: 22, patientId: 6,  doctorId: 1, specialtyId: 1, date: fmt(addDays(today, -20)), time: '09:00', status: 'completed', type: 'consulta' },
  { id: 23, patientId: 7,  doctorId: 8, specialtyId: 7, date: fmt(addDays(today, -8)),  time: '15:00', status: 'cancelled', type: 'consulta' },
  { id: 24, patientId: 8,  doctorId: 4, specialtyId: 3, date: fmt(addDays(today, -12)), time: '11:00', status: 'completed', type: 'consulta' },
  { id: 25, patientId: 9,  doctorId: 7, specialtyId: 6, date: fmt(addDays(today, -6)),  time: '08:00', status: 'completed', type: 'control'  },
  { id: 26, patientId: 10, doctorId: 5, specialtyId: 4, date: fmt(addDays(today, -15)), time: '16:00', status: 'completed', type: 'consulta' },
  { id: 27, patientId: 11, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, -4)),  time: '09:00', status: 'cancelled', type: 'consulta' },
  { id: 28, patientId: 12, doctorId: 2, specialtyId: 1, date: fmt(addDays(today, -18)), time: '10:00', status: 'completed', type: 'control'  },
  { id: 29, patientId: 13, doctorId: 6, specialtyId: 5, date: fmt(addDays(today, -2)),  time: '14:00', status: 'completed', type: 'consulta' },
  { id: 60, patientId: 14, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, -9)),  time: '09:00', status: 'completed', type: 'consulta' },
  { id: 61, patientId: 15, doctorId: 5, specialtyId: 4, date: fmt(addDays(today, -22)), time: '11:00', status: 'completed', type: 'consulta' },
  { id: 62, patientId: 16, doctorId: 7, specialtyId: 6, date: fmt(addDays(today, -11)), time: '08:00', status: 'completed', type: 'control'  },
  { id: 63, patientId: 17, doctorId: 4, specialtyId: 3, date: fmt(addDays(today, -7)),  time: '14:00', status: 'completed', type: 'consulta' },
  { id: 64, patientId: 18, doctorId: 1, specialtyId: 1, date: fmt(addDays(today, -25)), time: '10:00', status: 'completed', type: 'control'  },
  { id: 65, patientId: 19, doctorId: 8, specialtyId: 7, date: fmt(addDays(today, -3)),  time: '15:00', status: 'cancelled', type: 'consulta' },
  { id: 66, patientId: 20, doctorId: 6, specialtyId: 5, date: fmt(addDays(today, -16)), time: '09:00', status: 'completed', type: 'consulta' },
  { id: 67, patientId: 4,  doctorId: 2, specialtyId: 1, date: fmt(addDays(today, -28)), time: '16:00', status: 'completed', type: 'consulta' },
  { id: 68, patientId: 5,  doctorId: 8, specialtyId: 7, date: fmt(addDays(today, -19)), time: '11:00', status: 'completed', type: 'consulta' },
  { id: 69, patientId: 6,  doctorId: 4, specialtyId: 3, date: fmt(addDays(today, -13)), time: '14:00', status: 'cancelled', type: 'consulta' },
  { id: 70, patientId: 7,  doctorId: 5, specialtyId: 4, date: fmt(addDays(today, -21)), time: '10:00', status: 'completed', type: 'control'  },
];

export const initialQueue = [
  // En atención ahora — startedAt reciente (dentro de 15 min, SE PUEDE deshacer)
  { id: 1, patientId: 19, appointmentId: 207, status: 'in_service', arrivedAt: relTime(25), startedAt: relTime(8),  position: 1 },
  { id: 2, patientId: 10, appointmentId: 218, status: 'in_service', arrivedAt: relTime(20), startedAt: relTime(5),  position: 2 },
  // En espera
  { id: 3, patientId: 9,  appointmentId: 230, status: 'waiting',    arrivedAt: relTime(18), position: 3 },
  { id: 4, patientId: 18, appointmentId: 203, status: 'waiting',    arrivedAt: relTime(12), position: 4 },
  { id: 5, patientId: 8,  appointmentId: 214, status: 'waiting',    arrivedAt: relTime(8),  position: 5 },
  { id: 6, patientId: 11, appointmentId: 222, status: 'waiting',    arrivedAt: relTime(5),  position: 6 },
  // Urgencia recién llegada
  { id: 7, patientId: 20, appointmentId: null, status: 'emergency', arrivedAt: relTime(3),  position: 0 },
  // Atendidos: 2 recientes (SE PUEDE deshacer) + 2 antiguos (YA NO se puede)
  { id: 8,  patientId: 9,  appointmentId: 215, status: 'completed', arrivedAt: relTime(35), startedAt: relTime(18), completedAt: relTime(4),  position: 8  },
  { id: 9,  patientId: 5,  appointmentId: 210, status: 'completed', arrivedAt: relTime(40), startedAt: relTime(22), completedAt: relTime(7),  position: 9  },
  { id: 10, patientId: 2,  appointmentId: 209, status: 'completed', arrivedAt: '07:30',     startedAt: '07:45',     completedAt: '08:05',     position: 10 },
  { id: 11, patientId: 1,  appointmentId: 200, status: 'completed', arrivedAt: '07:50',     startedAt: '08:05',     completedAt: '08:30',     position: 11 },
];

export const users = [
  { id: 1, username: 'elisa',    password: '1234', role: 'patient',       patientId: 1, name: 'Elisa Sada'         },
  { id: 2, username: 'veronica', password: '1234', role: 'receptionist',                name: 'Verónica Arellano'  },
  { id: 3, username: 'gustavo',  password: '1234', role: 'admin',                       name: 'Gustavo Rodríguez'  },
];
