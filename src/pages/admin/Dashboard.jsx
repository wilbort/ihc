import { useApp } from '../../context/AppContext';
import { BarChart3, Users, Clock, CalendarDays, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, appointments, patients, queue, doctors, specialties } = useApp();

  const today = new Date().toISOString().split('T')[0];
  const todayAppts = appointments.filter(a => a.date === today);
  const confirmedToday = todayAppts.filter(a => a.status === 'confirmed').length;
  const completedToday = todayAppts.filter(a => a.status === 'completed').length;
  const cancelledToday = todayAppts.filter(a => a.status === 'cancelled').length;
  const waitingNow = queue.filter(q => q.status === 'waiting' || q.status === 'emergency').length;
  const inServiceNow = queue.filter(q => q.status === 'in_service').length;
  const completedQueue = queue.filter(q => q.status === 'completed').length;

  const weekAppts = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayAppts = appointments.filter(a => a.date === dateStr);
    weekAppts.push({
      label: d.toLocaleDateString('es-PE', { weekday: 'short' }),
      total: dayAppts.length,
      completed: dayAppts.filter(a => a.status === 'completed').length,
      cancelled: dayAppts.filter(a => a.status === 'cancelled').length,
    });
  }
  const maxWeek = Math.max(...weekAppts.map(d => d.total), 1);

  const specStats = specialties.map(s => {
    const count = todayAppts.filter(a => a.specialtyId === s.id).length;
    return { name: s.name, count };
  }).filter(s => s.count > 0).sort((a, b) => b.count - a.count);

  const doctorLoad = doctors.map(d => {
    const count = todayAppts.filter(a => a.doctorId === d.id && a.status !== 'cancelled').length;
    return { name: d.name, count };
  }).filter(d => d.count > 0).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard de Administración</h1>
      <p className="text-gray-600 mb-8">Bienvenido, {currentUser?.name} — indicadores del área de admisión</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Citas hoy', value: todayAppts.length, icon: CalendarDays, color: 'text-sky-600 bg-sky-50' },
          { label: 'En espera', value: waitingNow, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'En atención', value: inServiceNow, icon: Users, color: 'text-green-600 bg-green-50' },
          { label: 'Pacientes totales', value: patients.length, icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
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

      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{completedToday}</p>
            <p className="text-sm text-gray-500">Atendidos hoy</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-sky-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{confirmedToday}</p>
            <p className="text-sm text-gray-500">Pendientes hoy</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <XCircle className="w-6 h-6 text-red-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{cancelledToday}</p>
            <p className="text-sm text-gray-500">Canceladas hoy</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-500" aria-hidden="true" />
            Citas — Últimos 7 días
          </h2>
          <div className="flex items-end gap-2 h-40" role="img" aria-label="Gráfico de barras de citas de los últimos 7 días">
            {weekAppts.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center justify-end" style={{ height: '120px' }}>
                  <div
                    className="w-full max-w-[32px] bg-sky-500 rounded-t-md transition-all"
                    style={{ height: `${(d.total / maxWeek) * 100}%`, minHeight: d.total > 0 ? '8px' : '0' }}
                  />
                </div>
                <span className="text-xs text-gray-500">{d.label}</span>
                <span className="text-xs font-medium text-gray-700">{d.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Citas por Especialidad (hoy)</h2>
          {specStats.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">Sin citas para hoy</p>
          ) : (
            <div className="space-y-3">
              {specStats.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{s.name}</span>
                    <span className="font-medium text-gray-900">{s.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-sky-500 h-2 rounded-full transition-all"
                      style={{ width: `${(s.count / todayAppts.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {doctorLoad.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Carga por Médico (hoy)</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {doctorLoad.map(d => (
              <div key={d.name} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-700">{d.name}</span>
                <span className="text-sm font-bold text-sky-600">{d.count} citas</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
