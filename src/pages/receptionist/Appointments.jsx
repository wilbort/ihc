import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarDays, Search, CheckCircle, Clock, XCircle, UserCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { fmt12 } from '../../utils/formatTime';

const TOLERANCE_MINUTES = 15;

export default function Appointments() {
  const { appointments, patients, doctors, specialties, addToQueue, cancelAppointment, rescheduleAppointment, getAvailableSlots } = useApp();
  const [filter, setFilter] = useState('today');
  const [searchDni, setSearchDni] = useState('');
  const [lateWarning, setLateWarning] = useState(null);
  const [cancelWarning, setCancelWarning] = useState(null);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const today = new Date().toLocaleDateString('sv-SE');
  const getPatient = (id) => patients.find(p => p.id === id);
  const getDoctorName = (id) => doctors.find(d => d.id === id)?.name || '';
  const getSpecialtyName = (id) => specialties.find(s => s.id === id)?.name || '';

  let filtered = appointments;
  if (filter === 'today') filtered = appointments.filter(a => a.date === today);
  else if (filter === 'upcoming') filtered = appointments.filter(a => a.date >= today && a.status === 'confirmed');

  if (searchDni) {
    const patient = patients.find(p => p.dni.includes(searchDni));
    if (patient) filtered = filtered.filter(a => a.patientId === patient.id);
    else filtered = [];
  }

  filtered = [...filtered].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const statusBadge = {
    confirmed: { label: 'Confirmada', class: 'bg-green-50 text-green-700' },
    completed: { label: 'Atendida', class: 'bg-blue-50 text-blue-700' },
    cancelled: { label: 'Cancelada', class: 'bg-red-50 text-red-700' },
  };

  const handleCheckIn = (appt) => {
    const now = new Date();
    const apptTime = new Date(`${appt.date}T${appt.time}:00`);
    const diffMin = (now - apptTime) / (1000 * 60);
    if (diffMin > TOLERANCE_MINUTES) {
      setLateWarning(appt.id);
      setTimeout(() => setLateWarning(null), 5000);
      return;
    }
    addToQueue(appt.patientId, appt.id);
  };

  const handleCancelReceptionist = (appt) => {
    const now = new Date();
    const apptDateTime = new Date(`${appt.date}T${appt.time}:00`);
    const diffHours = (apptDateTime - now) / (1000 * 60 * 60);
    if (diffHours < 2) {
      setCancelWarning(appt.id);
      setTimeout(() => setCancelWarning(null), 5000);
      return;
    }
    cancelAppointment(appt.id);
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toLocaleDateString('sv-SE');

  const rescheduleAppt = rescheduleId ? appointments.find(a => a.id === rescheduleId) : null;
  const rescheduleSlots = rescheduleAppt && newDate ? getAvailableSlots(rescheduleAppt.doctorId, newDate) : [];

  const handleReschedule = () => {
    if (newDate && newTime) {
      rescheduleAppointment(rescheduleId, newDate, newTime);
      setRescheduleId(null);
      setNewDate('');
      setNewTime('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Gestión de Citas</h1>
      <p className="text-gray-600 mb-6">Visualiza, filtra y gestiona las citas médicas programadas.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2">
          {[
            { key: 'today', label: 'Hoy' },
            { key: 'upcoming', label: 'Próximas' },
            { key: 'all', label: 'Todas' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg min-h-[44px] transition-colors ${
                filter === f.key ? 'bg-sky-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            value={searchDni}
            onChange={(e) => setSearchDni(e.target.value)}
            placeholder="Filtrar por DNI..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px]"
            aria-label="Filtrar citas por DNI del paciente"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-hidden="true" />
          <p className="text-gray-600 font-medium">No se encontraron citas</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Paciente</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Especialidad</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Médico</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Fecha</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Hora</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Estado</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(appt => {
                  const patient = getPatient(appt.patientId);
                  const badge = statusBadge[appt.status] || statusBadge.confirmed;
                  return (
                    <tr key={appt.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <p className="font-medium text-gray-900">{patient?.firstName} {patient?.lastName}</p>
                        <p className="text-xs text-gray-500">DNI: {patient?.dni}</p>
                      </td>
                      <td className="px-5 py-3 text-gray-700">{getSpecialtyName(appt.specialtyId)}</td>
                      <td className="px-5 py-3 text-gray-700">{getDoctorName(appt.doctorId)}</td>
                      <td className="px-5 py-3 text-gray-700">{new Date(appt.date + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}</td>
                      <td className="px-5 py-3 text-gray-700">{fmt12(appt.time)}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.class}`}>{badge.label}</span>
                      </td>
                      <td className="px-5 py-3">
                        {appt.status === 'confirmed' && appt.date >= today && (
                          <div>
                            {lateWarning === appt.id && (
                              <div className="flex items-center gap-1 mb-2 p-2 bg-amber-50 border border-amber-200 rounded-lg" role="alert">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
                                <span className="text-xs text-amber-800">Paciente fuera del tiempo de tolerancia ({TOLERANCE_MINUTES} min). Debe reprogramar.</span>
                              </div>
                            )}
                            {cancelWarning === appt.id && (
                              <div className="flex items-center gap-1 mb-2 p-2 bg-red-50 border border-red-200 rounded-lg" role="alert">
                                <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" aria-hidden="true" />
                                <span className="text-xs text-red-800">No se puede cancelar con menos de 2 horas de anticipación.</span>
                              </div>
                            )}
                            <div className="flex gap-1">
                              {appt.date === today && (
                                <button
                                  onClick={() => handleCheckIn(appt)}
                                  className="px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 min-h-[36px] flex items-center gap-1 font-medium"
                                  title="Registrar llegada"
                                >
                                  <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
                                  Check-in
                                </button>
                              )}
                              <button
                                onClick={() => { setRescheduleId(appt.id); setNewDate(''); setNewTime(''); }}
                                className="px-3 py-1.5 text-xs text-sky-600 rounded-lg hover:bg-sky-50 min-h-[36px] flex items-center gap-1 font-medium"
                                title="Reprogramar cita"
                              >
                                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                                Reprogramar
                              </button>
                              <button
                                onClick={() => handleCancelReceptionist(appt)}
                                className="px-3 py-1.5 text-xs text-red-600 rounded-lg hover:bg-red-50 min-h-[36px]"
                                title="Cancelar cita"
                              >
                                <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {rescheduleId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-label="Reprogramar cita">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-sky-500" aria-hidden="true" />
              Reprogramar Cita
            </h2>
            {rescheduleAppt && (
              <p className="text-sm text-gray-500 mb-4">
                {getPatient(rescheduleAppt.patientId)?.firstName} {getPatient(rescheduleAppt.patientId)?.lastName} — {getSpecialtyName(rescheduleAppt.specialtyId)}
              </p>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva fecha</label>
              <input
                type="date"
                min={today}
                max={maxDateStr}
                value={newDate}
                onChange={(e) => { setNewDate(e.target.value); setNewTime(''); }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px]"
                aria-label="Nueva fecha para la cita"
              />
            </div>
            {newDate && rescheduleSlots.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Horarios disponibles</p>
                <div className="grid grid-cols-4 gap-2">
                  {rescheduleSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setNewTime(slot)}
                      className={`py-2 rounded-lg border text-xs font-medium min-h-[44px] ${
                        newTime === slot ? 'border-sky-500 bg-sky-600 text-white' : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-sky-300'
                      }`}
                    >
                      {fmt12(slot)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {newDate && rescheduleSlots.length === 0 && (
              <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg mb-4">No hay horarios disponibles para esta fecha.</p>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleReschedule}
                disabled={!newDate || !newTime}
                className="flex-1 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
              >
                Confirmar cambio
              </button>
              <button
                onClick={() => { setRescheduleId(null); setNewDate(''); setNewTime(''); }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg min-h-[44px]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
