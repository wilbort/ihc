import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, X, RefreshCw } from 'lucide-react';

export default function MyAppointments() {
  const { currentUser, getPatientAppointments, cancelAppointment, rescheduleAppointment, doctors, specialties, getAvailableSlots } = useApp();
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const allAppts = getPatientAppointments(currentUser?.patientId);
  const upcoming = allAppts
    .filter(a => a.date >= today && a.status === 'confirmed')
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const getDoctorName = (id) => doctors.find(d => d.id === id)?.name || '';
  const getSpecialtyName = (id) => specialties.find(s => s.id === id)?.name || '';

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleReschedule = (apptId) => {
    if (newDate && newTime) {
      rescheduleAppointment(apptId, newDate, newTime);
      setRescheduleId(null);
      setNewDate('');
      setNewTime('');
    }
  };

  const availableSlots = rescheduleId && newDate
    ? getAvailableSlots(upcoming.find(a => a.id === rescheduleId)?.doctorId, newDate)
    : [];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Mis Citas</h1>
      <p className="text-gray-600 mb-8">Gestiona tus citas próximas. Puedes cancelar o reprogramar.</p>

      {upcoming.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-hidden="true" />
          <p className="text-gray-600 font-medium">No tienes citas próximas</p>
          <p className="text-sm text-gray-500 mt-1">Agenda una nueva cita desde el menú.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcoming.map(appt => (
            <div key={appt.id} className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{getSpecialtyName(appt.specialtyId)}</p>
                  <p className="text-gray-600">{getDoctorName(appt.doctorId)}</p>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                  Confirmada
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  {new Date(appt.date + 'T00:00:00').toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {appt.time} hrs
                </span>
              </div>

              {rescheduleId === appt.id ? (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Reprogramar cita</p>
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <input
                      type="date"
                      min={today}
                      max={maxDateStr}
                      value={newDate}
                      onChange={(e) => { setNewDate(e.target.value); setNewTime(''); }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px]"
                      aria-label="Nueva fecha"
                    />
                  </div>
                  {newDate && availableSlots.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setNewTime(slot)}
                          className={`py-2 rounded-lg border text-xs font-medium min-h-[44px] ${
                            newTime === slot ? 'border-sky-500 bg-sky-600 text-white' : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-sky-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                  {newDate && availableSlots.length === 0 && (
                    <p className="text-sm text-amber-600 mb-3">No hay horarios disponibles para esta fecha.</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReschedule(appt.id)}
                      disabled={!newDate || !newTime}
                      className="px-4 py-2 bg-sky-600 text-white text-sm rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
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
              ) : (
                <div className="flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => setRescheduleId(appt.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-sky-600 hover:bg-sky-50 rounded-lg transition-colors min-h-[44px]"
                  >
                    <RefreshCw className="w-4 h-4" aria-hidden="true" />
                    Reprogramar
                  </button>
                  <button
                    onClick={() => cancelAppointment(appt.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[44px]"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                    Cancelar cita
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
