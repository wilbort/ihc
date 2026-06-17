import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Users, Clock, CalendarDays, TrendingUp, AlertTriangle, CheckCircle, XCircle, Filter } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, appointments, patients, queue, doctors, specialties } = useApp();

  const today = new Date().toLocaleDateString('sv-SE');
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  const rangeAppts = appointments.filter(a => a.date >= dateFrom && a.date <= dateTo);
  const confirmedRange = rangeAppts.filter(a => a.status === 'confirmed').length;
  const completedRange = rangeAppts.filter(a => a.status === 'completed').length;
  const cancelledRange = rangeAppts.filter(a => a.status === 'cancelled').length;
  const waitingNow = queue.filter(q => q.status === 'waiting' || q.status === 'emergency').length;
  const inServiceNow = queue.filter(q => q.status === 'in_service').length;

  const rangeStart = new Date(dateFrom + 'T00:00:00');
  const rangeEnd = new Date(dateTo + 'T00:00:00');
  const rangeDays = Math.round((rangeEnd - rangeStart) / (1000 * 60 * 60 * 24)) + 1;

  const dayAppts = [];
  for (let i = 0; i < rangeDays && i <= 30; i++) {
    const d = new Date(rangeStart);
    d.setDate(d.getDate() + i);
    const dateStr = d.toLocaleDateString('sv-SE');
    const dAppts = appointments.filter(a => a.date === dateStr);
    dayAppts.push({
      label: d.toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric' }),
      total: dAppts.length,
      completed: dAppts.filter(a => a.status === 'completed').length,
      cancelled: dAppts.filter(a => a.status === 'cancelled').length,
    });
  }
  const maxDay = Math.max(...dayAppts.map(d => d.total), 1);

  const hourlyData = [];
  for (let h = 7; h <= 18; h++) {
    const hStr = String(h).padStart(2, '0');
    const count = rangeAppts.filter(a => a.time.startsWith(hStr + ':')).length;
    hourlyData.push({ hour: h, label: `${h > 12 ? h - 12 : h}${h >= 12 ? 'pm' : 'am'}`, count });
  }
  const maxHour = Math.max(...hourlyData.map(h => h.count), 1);

  const specStats = specialties.map(s => {
    const count = rangeAppts.filter(a => a.specialtyId === s.id).length;
    return { name: s.name, count };
  }).filter(s => s.count > 0).sort((a, b) => b.count - a.count);

  const doctorLoad = doctors.map(d => {
    const count = rangeAppts.filter(a => a.doctorId === d.id && a.status !== 'cancelled').length;
    return { name: d.name, count };
  }).filter(d => d.count > 0).sort((a, b) => b.count - a.count).slice(0, 5);

  const isToday = dateFrom === today && dateTo === today;
  const rangeLabel = isToday ? 'hoy' : dateFrom === dateTo ? new Date(dateFrom + 'T00:00:00').toLocaleDateString('es-PE', { day: 'numeric', month: 'short' }) : `${new Date(dateFrom + 'T00:00:00').toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })} – ${new Date(dateTo + 'T00:00:00').toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })}`;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard de Administración</h1>
      <p className="text-gray-600 mb-6">Bienvenido, {currentUser?.name} — indicadores del área de admisión</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="w-4 h-4 text-sky-500" aria-hidden="true" />
            Rango de fechas
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); if (e.target.value > dateTo) setDateTo(e.target.value); }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px]"
              aria-label="Fecha desde"
            />
            <span className="text-gray-400 text-sm">a</span>
            <input
              type="date"
              value={dateTo}
              min={dateFrom}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px]"
              aria-label="Fecha hasta"
            />
          </div>
          <button
            onClick={() => { setDateFrom(today); setDateTo(today); }}
            className={`px-3 py-2 text-xs font-medium rounded-lg min-h-[44px] transition-colors ${isToday ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Hoy
          </button>
          <button
            onClick={() => { const d = new Date(); d.setDate(d.getDate() - 6); setDateFrom(d.toLocaleDateString('sv-SE')); setDateTo(today); }}
            className="px-3 py-2 text-xs font-medium rounded-lg min-h-[44px] bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Últimos 7 días
          </button>
          <button
            onClick={() => { const d = new Date(); d.setDate(d.getDate() - 29); setDateFrom(d.toLocaleDateString('sv-SE')); setDateTo(today); }}
            className="px-3 py-2 text-xs font-medium rounded-lg min-h-[44px] bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Últimos 30 días
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: `Citas (${rangeLabel})`, value: rangeAppts.length, icon: CalendarDays, color: 'text-sky-600 bg-sky-50' },
          { label: 'En espera ahora', value: waitingNow, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'En atención ahora', value: inServiceNow, icon: Users, color: 'text-green-600 bg-green-50' },
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
            <p className="text-2xl font-bold text-gray-900">{completedRange}</p>
            <p className="text-sm text-gray-500">Atendidas ({rangeLabel})</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-sky-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{confirmedRange}</p>
            <p className="text-sm text-gray-500">Pendientes ({rangeLabel})</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <XCircle className="w-6 h-6 text-red-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{cancelledRange}</p>
            <p className="text-sm text-gray-500">Canceladas ({rangeLabel})</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-500" aria-hidden="true" />
            Citas — {rangeLabel}
          </h2>
          <div className="flex items-end gap-1 h-40 overflow-x-auto" role="img" aria-label={`Gráfico de barras de citas (${rangeLabel})`}>
            {dayAppts.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1" style={{ minWidth: dayAppts.length > 14 ? '28px' : undefined, flex: '1 1 0' }}>
                <div className="w-full flex flex-col items-center justify-end" style={{ height: '120px' }}>
                  <div
                    className="w-full max-w-[32px] bg-sky-500 rounded-t-md transition-all"
                    style={{ height: `${(d.total / maxDay) * 100}%`, minHeight: d.total > 0 ? '8px' : '0' }}
                  />
                </div>
                <span className="text-[10px] text-gray-500 whitespace-nowrap">{d.label}</span>
                <span className="text-xs font-medium text-gray-700">{d.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Citas por Especialidad ({rangeLabel})</h2>
          {specStats.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">Sin citas en este rango</p>
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
                      style={{ width: `${(s.count / rangeAppts.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" aria-hidden="true" />
          Distribución por Hora ({rangeLabel})
        </h2>
        <div className="flex items-end gap-1 h-40" role="img" aria-label={`Gráfico de distribución horaria (${rangeLabel})`}>
          {hourlyData.map((h) => (
            <div key={h.hour} className="flex flex-col items-center gap-1 flex-1">
              <div className="w-full flex flex-col items-center justify-end" style={{ height: '120px' }}>
                <div
                  className="w-full max-w-[32px] bg-amber-400 rounded-t-md transition-all"
                  style={{ height: `${(h.count / maxHour) * 100}%`, minHeight: h.count > 0 ? '8px' : '0' }}
                />
              </div>
              <span className="text-[10px] text-gray-500">{h.label}</span>
              <span className="text-xs font-medium text-gray-700">{h.count}</span>
            </div>
          ))}
        </div>
      </div>

      {doctorLoad.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Carga por Médico ({rangeLabel})</h2>
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
