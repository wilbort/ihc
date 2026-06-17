import { useApp } from '../../context/AppContext';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { fmt12 } from '../../utils/formatTime';

const statusConfig = {
  completed: { label: 'Atendida', color: 'bg-green-50 text-green-700', icon: CheckCircle },
  cancelled: { label: 'Cancelada', color: 'bg-red-50 text-red-700', icon: XCircle },
};

export default function History() {
  const { currentUser, getPatientAppointments, doctors, specialties } = useApp();
  const today = new Date().toLocaleDateString('sv-SE');

  const past = getPatientAppointments(currentUser?.patientId)
    .filter(a => a.status === 'completed' || a.status === 'cancelled' || a.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  const getDoctorName = (id) => doctors.find(d => d.id === id)?.name || '';
  const getSpecialtyName = (id) => specialties.find(s => s.id === id)?.name || '';

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Historial de Atenciones</h1>
      <p className="text-gray-600 mb-8">Consulta tus citas anteriores y su estado.</p>

      {past.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-hidden="true" />
          <p className="text-gray-600 font-medium">No tienes historial de atenciones</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
          {past.map(appt => {
            const cfg = statusConfig[appt.status] || statusConfig.completed;
            const Icon = cfg.icon;
            return (
              <div key={appt.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <Icon className={`w-5 h-5 ${appt.status === 'completed' ? 'text-green-500' : 'text-red-400'}`} aria-hidden="true" />
                  <div>
                    <p className="font-medium text-gray-900">{getSpecialtyName(appt.specialtyId)}</p>
                    <p className="text-sm text-gray-500">{getDoctorName(appt.doctorId)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {new Date(appt.date + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {fmt12(appt.time)}
                  </div>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
