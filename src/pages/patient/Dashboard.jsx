import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CalendarPlus, Calendar, Clock, AlertCircle } from 'lucide-react';
import { fmt12 } from '../../utils/formatTime';

export default function PatientDashboard() {
  const { currentUser, getPatientAppointments, doctors, specialties } = useApp();
  const patientId = currentUser?.patientId;

  const allAppts = getPatientAppointments(patientId);
  const today = new Date().toLocaleDateString('sv-SE');
  const upcoming = allAppts
    .filter(a => a.date >= today && a.status === 'confirmed')
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const nextAppt = upcoming[0];

  const getDoctorName = (id) => doctors.find(d => d.id === id)?.name || '';
  const getSpecialtyName = (id) => specialties.find(s => s.id === id)?.name || '';

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Bienvenida, {currentUser?.name}
      </h1>
      <p className="text-gray-600 mb-8">Portal de pacientes — Clínica Auna Trujillo</p>

      {nextAppt ? (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-sky-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-sky-700">Próxima cita</p>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {getSpecialtyName(nextAppt.specialtyId)} — {getDoctorName(nextAppt.doctorId)}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  {new Date(nextAppt.date + 'T00:00:00').toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {fmt12(nextAppt.time)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600" aria-hidden="true" />
            <div>
              <p className="font-medium text-gray-900">No tienes citas programadas</p>
              <p className="text-sm text-gray-600 mt-1">Agenda una nueva cita para tu próximo control.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/patient/new-appointment"
          className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all min-h-[44px]"
        >
          <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
            <CalendarPlus className="w-6 h-6 text-sky-600" aria-hidden="true" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900">Agendar Nueva Cita</p>
            <p className="text-sm text-gray-500">Elige especialidad, médico y horario</p>
          </div>
        </Link>

        <Link
          to="/patient/my-appointments"
          className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all min-h-[44px]"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6 text-green-600" aria-hidden="true" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900">Mis Citas</p>
            <p className="text-sm text-gray-500">Ver, cancelar o reprogramar</p>
          </div>
        </Link>
      </div>

      {upcoming.length > 1 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Citas próximas</h2>
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {upcoming.slice(0, 5).map(appt => (
              <Link
                key={appt.id}
                to="/patient/my-appointments"
                className="flex items-center justify-between px-6 py-4 hover:bg-sky-50 transition-colors min-h-[44px]"
                aria-label={`Gestionar cita de ${getSpecialtyName(appt.specialtyId)} con ${getDoctorName(appt.doctorId)}`}
              >
                <div>
                  <p className="font-medium text-gray-900">{getSpecialtyName(appt.specialtyId)}</p>
                  <p className="text-sm text-gray-500">{getDoctorName(appt.doctorId)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-sm">
                    <p className="text-gray-900">{new Date(appt.date + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}</p>
                    <p className="text-gray-500">{fmt12(appt.time)}</p>
                  </div>
                  <span className="text-sky-600 text-sm">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
