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
  { id: 1, name: 'Dr. Carlos Mendoza', specialtyId: 1, schedule: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { id: 2, name: 'Dra. María Torres', specialtyId: 1, schedule: ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'] },
  { id: 3, name: 'Dr. José García', specialtyId: 2, schedule: ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00'] },
  { id: 4, name: 'Dra. Ana López', specialtyId: 3, schedule: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'] },
  { id: 5, name: 'Dra. Rosa Chávez', specialtyId: 4, schedule: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { id: 6, name: 'Dr. Luis Paredes', specialtyId: 5, schedule: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00'] },
  { id: 7, name: 'Dr. Ricardo Vega', specialtyId: 6, schedule: ['07:00', '08:00', '09:00', '10:00', '15:00', '16:00'] },
  { id: 8, name: 'Dr. Fernando Ruiz', specialtyId: 7, schedule: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'] },
];

export const initialPatients = [
  {
    id: 1,
    dni: '45678912',
    firstName: 'Elisa',
    lastName: 'Sada',
    phone: '987654321',
    email: 'elisa.sada@email.com',
    birthDate: '1981-03-15',
    address: 'Av. Larco 450, Trujillo',
    gender: 'F',
  },
  {
    id: 2,
    dni: '71234567',
    firstName: 'Pedro',
    lastName: 'Castillo Ramos',
    phone: '976543210',
    email: 'pedro.castillo@email.com',
    birthDate: '1990-07-22',
    address: 'Jr. Pizarro 120, Trujillo',
    gender: 'M',
  },
  {
    id: 3,
    dni: '80123456',
    firstName: 'Carmen',
    lastName: 'Flores Díaz',
    phone: '965432109',
    email: 'carmen.flores@email.com',
    birthDate: '1975-11-08',
    address: 'Urb. El Golf 88, Trujillo',
    gender: 'F',
  },
];

const today = new Date();
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

const nowH = today.getHours();
const soonTime = nowH < 21 ? `${String(nowH + 1).padStart(2, '0')}:00` : '10:00';
const pastTime = nowH > 8 ? `${String(nowH - 2).padStart(2, '0')}:00` : '07:00';

export const initialAppointments = [
  { id: 1, patientId: 1, doctorId: 1, specialtyId: 1, date: fmt(addDays(today, 2)), time: '10:00', status: 'confirmed', type: 'control' },
  { id: 2, patientId: 2, doctorId: 3, specialtyId: 2, date: fmt(addDays(today, 1)), time: '09:00', status: 'confirmed', type: 'consulta' },
  { id: 3, patientId: 3, doctorId: 5, specialtyId: 4, date: fmt(addDays(today, 3)), time: '14:00', status: 'confirmed', type: 'consulta' },
  { id: 8, patientId: 1, doctorId: 6, specialtyId: 5, date: fmt(today), time: soonTime, status: 'confirmed', type: 'consulta' },
  { id: 9, patientId: 2, doctorId: 3, specialtyId: 2, date: fmt(today), time: pastTime, status: 'confirmed', type: 'consulta' },
  { id: 4, patientId: 1, doctorId: 1, specialtyId: 1, date: fmt(addDays(today, -7)), time: '10:00', status: 'completed', type: 'control' },
  { id: 5, patientId: 1, doctorId: 2, specialtyId: 1, date: fmt(addDays(today, -30)), time: '15:00', status: 'completed', type: 'control' },
  { id: 6, patientId: 2, doctorId: 6, specialtyId: 5, date: fmt(addDays(today, -14)), time: '08:00', status: 'completed', type: 'consulta' },
  { id: 7, patientId: 3, doctorId: 4, specialtyId: 3, date: fmt(addDays(today, -5)), time: '11:00', status: 'cancelled', type: 'consulta' },
];

export const initialQueue = [
  { id: 1, patientId: 2, appointmentId: 2, status: 'waiting', arrivedAt: '08:45', position: 1 },
  { id: 2, patientId: 3, appointmentId: 3, status: 'waiting', arrivedAt: '08:50', position: 2 },
];

export const users = [
  { id: 1, username: 'elisa', password: '1234', role: 'patient', patientId: 1, name: 'Elisa Sada' },
  { id: 2, username: 'veronica', password: '1234', role: 'receptionist', name: 'Verónica Arellano' },
  { id: 3, username: 'gustavo', password: '1234', role: 'admin', name: 'Gustavo Rodríguez' },
];
