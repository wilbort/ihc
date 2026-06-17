import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Users, UserPlus, Search, CalendarDays, ListOrdered, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { fmt12 } from '../../utils/formatTime';

export default function ReceptionistDashboard() {
  const { currentUser, getTodayStats, queue, patients } = useApp();
  const stats = getTodayStats();

  const waitingQueue = queue.filter(q => q.status === 'waiting' || q.status === 'emergency');
  const inService = queue.filter(q => q.status === 'in_service');

  const getPatientName = (id) => {
    const p = patients.find(p => p.id === id);
    return p ? `${p.firstName} ${p.lastName}` : '';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Panel de Admisión</h1>
      <p className="text-gray-600 mb-8">Bienvenida, {currentUser?.name} — gestión de pacientes y citas</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Citas hoy', value: stats.total, icon: CalendarDays, color: 'bg-sky-50 text-sky-600' },
          { label: 'En espera', value: stats.inQueue, icon: Clock, color: 'bg-amber-50 text-amber-600' },
          { label: 'En atención', value: stats.attending, icon: Users, color: 'bg-green-50 text-green-600' },
          { label: 'Atendidos', value: stats.completed, icon: CheckCircle, color: 'bg-purple-50 text-purple-600' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
              <item.icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { to: '/receptionist/search', label: 'Buscar Paciente', desc: 'Por DNI o nombre', icon: Search, color: 'bg-sky-100 text-sky-600' },
          { to: '/receptionist/register', label: 'Registrar Paciente', desc: 'Nuevo registro', icon: UserPlus, color: 'bg-green-100 text-green-600' },
          { to: '/receptionist/appointments', label: 'Gestionar Citas', desc: 'Programar y verificar', icon: CalendarDays, color: 'bg-purple-100 text-purple-600' },
          { to: '/receptionist/queue', label: 'Cola de Atención', desc: 'Gestión de turnos', icon: ListOrdered, color: 'bg-amber-100 text-amber-600' },
        ].map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all min-h-[44px]"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
              <item.icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" aria-hidden="true" />
            En Espera ({waitingQueue.length})
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {waitingQueue.length === 0 ? (
              <p className="p-6 text-sm text-gray-500 text-center">No hay pacientes en espera</p>
            ) : waitingQueue.slice(0, 5).map(q => (
              <div key={q.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  {q.status === 'emergency' && <AlertTriangle className="w-5 h-5 text-red-500" aria-label="Emergencia" />}
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{getPatientName(q.patientId)}</p>
                    <p className="text-xs text-gray-500">Llegó: {fmt12(q.arrivedAt)}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  q.status === 'emergency' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {q.status === 'emergency' ? 'Urgencia' : `Turno ${q.position}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" aria-hidden="true" />
            En Atención ({inService.length})
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {inService.length === 0 ? (
              <p className="p-6 text-sm text-gray-500 text-center">No hay pacientes en atención</p>
            ) : inService.map(q => (
              <div key={q.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{getPatientName(q.patientId)}</p>
                  <p className="text-xs text-gray-500">Llegó: {fmt12(q.arrivedAt)}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-50 text-green-700">
                  En atención
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
