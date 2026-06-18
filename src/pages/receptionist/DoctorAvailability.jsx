import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { fmt12 } from '../../utils/formatTime';

export default function DoctorAvailability() {
  const { specialties, doctors, getAvailableSlots } = useApp();
  const today = new Date().toLocaleDateString('sv-SE');
  const [specialtyId, setSpecialtyId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [date, setDate] = useState(today);

  const filteredDoctors = specialtyId ? doctors.filter(d => d.specialtyId === specialtyId) : doctors;
  const selectedDoctor = doctors.find(d => d.id === doctorId);
  const availableSlots = doctorId && date ? getAvailableSlots(doctorId, date) : [];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toLocaleDateString('sv-SE');

  const shiftDay = (days) => {
    const d = new Date(date + 'T00:00:00');
    d.setDate(d.getDate() + days);
    const newStr = d.toLocaleDateString('sv-SE');
    if (newStr >= today && newStr <= maxDateStr) setDate(newStr);
  };
  const isToday = date === today;
  const dateLabel = new Date(date + 'T00:00:00').toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Disponibilidad de Médicos</h1>
      <p className="text-gray-600 mb-8">Consulta horarios disponibles por especialidad y médico.</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
        <select
          value={specialtyId || ''}
          onChange={(e) => { setSpecialtyId(e.target.value ? Number(e.target.value) : null); setDoctorId(null); }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px] bg-white"
          aria-label="Filtrar por especialidad"
        >
          <option value="">Todas las especialidades</option>
          {specialties.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => shiftDay(-1)}
            disabled={isToday}
            className="w-11 h-11 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Día anterior"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex-1 flex items-center justify-center gap-3">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900 capitalize">{dateLabel}</p>
              <input
                type="date"
                min={today}
                max={maxDateStr}
                value={date}
                onChange={(e) => setDate(e.target.value || today)}
                className="text-xs text-sky-600 bg-transparent border-0 outline-none cursor-pointer hover:underline focus:underline"
                aria-label="Cambiar fecha"
              />
            </div>
          </div>

          <button
            onClick={() => shiftDay(1)}
            className="w-11 h-11 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Día siguiente"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => setDate(today)}
            disabled={isToday}
            className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] flex items-center gap-1.5 ${
              isToday ? 'bg-sky-100 text-sky-700 cursor-default' : 'bg-sky-600 text-white hover:bg-sky-700'
            }`}
          >
            <CalendarDays className="w-4 h-4" aria-hidden="true" />
            Hoy
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredDoctors.map(doc => {
          const spec = specialties.find(s => s.id === doc.specialtyId);
          const slots = date ? getAvailableSlots(doc.id, date) : doc.schedule;
          const isSelected = doctorId === doc.id;

          return (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setDoctorId(isSelected ? null : doc.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left min-h-[44px]"
                aria-expanded={isSelected}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-sky-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-sky-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">{spec?.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${slots.length === 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {slots.length} de {doc.schedule.length} libres
                  </p>
                  <p className="text-xs text-gray-500">
                    {doc.schedule[0]} – {doc.schedule[doc.schedule.length - 1]} hrs
                  </p>
                </div>
              </button>

              {isSelected && (
                <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {doc.schedule.map(slot => {
                      const isFree = slots.includes(slot);
                      return (
                        <div
                          key={slot}
                          className={`py-2 px-1 rounded-lg border text-center text-sm font-medium ${
                            isFree
                              ? 'border-green-200 bg-green-50 text-green-700'
                              : 'border-red-200 bg-red-50 text-red-400 line-through'
                          }`}
                          title={isFree ? 'Disponible' : 'Ocupado'}
                        >
                          {fmt12(slot)}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded border border-green-200 bg-green-50 inline-block" />
                      Disponible ({slots.length})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded border border-red-200 bg-red-50 inline-block" />
                      Ocupado ({doc.schedule.length - slots.length})
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
