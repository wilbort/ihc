import { createContext, useContext, useState, useCallback } from 'react';
import { initialPatients, initialAppointments, initialQueue, doctors, specialties, users } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [queue, setQueue] = useState(initialQueue);
  const [nextPatientId, setNextPatientId] = useState(initialPatients.length + 1);
  const [nextAppointmentId, setNextAppointmentId] = useState(initialAppointments.length + 1);
  const [nextQueueId, setNextQueueId] = useState(initialQueue.length + 1);

  const login = useCallback((username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) { setCurrentUser(user); return user; }
    return null;
  }, []);

  const logout = useCallback(() => setCurrentUser(null), []);

  const addPatient = useCallback((patient) => {
    const newPatient = { ...patient, id: nextPatientId };
    setPatients(prev => [...prev, newPatient]);
    setNextPatientId(prev => prev + 1);
    return newPatient;
  }, [nextPatientId]);

  const updatePatient = useCallback((id, data) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }, []);

  const findPatientByDni = useCallback((dni) => {
    return patients.find(p => p.dni === dni);
  }, [patients]);

  const searchPatients = useCallback((query) => {
    const q = query.toLowerCase();
    return patients.filter(p =>
      p.dni.includes(q) ||
      p.firstName.toLowerCase().includes(q) ||
      p.lastName.toLowerCase().includes(q)
    );
  }, [patients]);

  const addAppointment = useCallback((appointment) => {
    const newAppt = { ...appointment, id: nextAppointmentId, status: 'confirmed' };
    setAppointments(prev => [...prev, newAppt]);
    setNextAppointmentId(prev => prev + 1);
    return newAppt;
  }, [nextAppointmentId]);

  const cancelAppointment = useCallback((id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
  }, []);

  const rescheduleAppointment = useCallback((id, newDate, newTime) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, date: newDate, time: newTime } : a));
  }, []);

  const completeAppointment = useCallback((id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'completed' } : a));
  }, []);

  const getPatientAppointments = useCallback((patientId) => {
    return appointments.filter(a => a.patientId === patientId);
  }, [appointments]);

  const addToQueue = useCallback((patientId, appointmentId) => {
    const maxPos = queue.reduce((max, q) => Math.max(max, q.position), 0);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const entry = { id: nextQueueId, patientId, appointmentId, status: 'waiting', arrivedAt: timeStr, position: maxPos + 1 };
    setQueue(prev => [...prev, entry]);
    setNextQueueId(prev => prev + 1);
    return entry;
  }, [queue, nextQueueId]);

  const updateQueueStatus = useCallback((id, status) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    if (status === 'completed') {
      const entry = queue.find(q => q.id === id);
      if (entry) completeAppointment(entry.appointmentId);
    }
  }, [queue, completeAppointment]);

  const addEmergency = useCallback((patientId) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const entry = { id: nextQueueId, patientId, appointmentId: null, status: 'emergency', arrivedAt: timeStr, position: 0 };
    setQueue(prev => [entry, ...prev]);
    setNextQueueId(prev => prev + 1);
    return entry;
  }, [nextQueueId]);

  const getAvailableSlots = useCallback((doctorId, date) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) return [];
    const taken = appointments
      .filter(a => a.doctorId === doctorId && a.date === date && a.status !== 'cancelled')
      .map(a => a.time);
    return doctor.schedule.filter(s => !taken.includes(s));
  }, [appointments]);

  const getTodayStats = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppts = appointments.filter(a => a.date === today);
    return {
      total: todayAppts.length,
      confirmed: todayAppts.filter(a => a.status === 'confirmed').length,
      completed: todayAppts.filter(a => a.status === 'completed').length,
      cancelled: todayAppts.filter(a => a.status === 'cancelled').length,
      inQueue: queue.filter(q => q.status === 'waiting' || q.status === 'emergency').length,
      attending: queue.filter(q => q.status === 'in_service').length,
    };
  }, [appointments, queue]);

  const value = {
    currentUser, login, logout,
    patients, addPatient, updatePatient, findPatientByDni, searchPatients,
    appointments, addAppointment, cancelAppointment, rescheduleAppointment, completeAppointment, getPatientAppointments,
    queue, addToQueue, updateQueueStatus, addEmergency,
    doctors, specialties,
    getAvailableSlots, getTodayStats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
