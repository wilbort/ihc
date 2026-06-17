import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CalendarPlus, CheckCircle, ChevronRight, Bell, Mail } from 'lucide-react';
import { fmt12 } from '../../utils/formatTime';

export default function NewAppointment() {
  const { currentUser, specialties, doctors, getAvailableSlots, addAppointment } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [specialtyId, setSpecialtyId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const filteredDoctors = doctors.filter(d => d.specialtyId === specialtyId);
  const availableSlots = doctorId && date ? getAvailableSlots(doctorId, date) : [];
  const today = new Date().toLocaleDateString('sv-SE');
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toLocaleDateString('sv-SE');

  const handleConfirm = () => {
    addAppointment({
      patientId: currentUser.patientId,
      doctorId,
      specialtyId,
      date,
      time,
      type: 'consulta',
    });
    setConfirmed(true);
  };

  if (confirmed) {
    const doc = doctors.find(d => d.id === doctorId);
    const spec = specialties.find(s => s.id === specialtyId);
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9 text-green-600" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Cita Confirmada</h1>
        <p className="text-gray-600 mb-6">Tu cita ha sido registrada exitosamente.</p>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-left mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Especialidad</span><span className="font-medium text-gray-900">{spec?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Médico</span><span className="font-medium text-gray-900">{doc?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Fecha</span><span className="font-medium text-gray-900">{new Date(date + 'T00:00:00').toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Hora</span><span className="font-medium text-gray-900">{fmt12(time)}</span></div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex items-start gap-3 text-left" role="status">
          <Bell className="w-5 h-5 text-green-600 mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-green-800">Notificación enviada</p>
            <p className="text-xs text-green-700 mt-0.5">Se ha enviado una confirmación a tu correo electrónico registrado.</p>
          </div>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-6 flex items-start gap-3 text-left" role="status">
          <Mail className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-sky-800">Recordatorio programado</p>
            <p className="text-xs text-sky-700 mt-0.5">Recibirás un recordatorio 24 horas antes de tu cita.</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-6">Recuerda presentarte con anticipación a tu cita.</p>
        <button onClick={() => navigate('/patient')} className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors min-h-[44px] font-medium">
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Agendar Nueva Cita</h1>
      <p className="text-gray-600 mb-8">Selecciona especialidad, médico, fecha y horario disponible.</p>

      <div className="flex items-center gap-2 mb-8" aria-label="Progreso del agendamiento">
        {['Especialidad', 'Médico', 'Fecha y Hora'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-500'
            }`} aria-current={step === i + 1 ? 'step' : undefined}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${step === i + 1 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>{label}</span>
            {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300" aria-hidden="true" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecciona una especialidad</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {specialties.map(spec => (
              <button
                key={spec.id}
                onClick={() => { setSpecialtyId(spec.id); setDoctorId(null); setDate(''); setTime(''); setStep(2); }}
                className={`p-4 rounded-xl border text-left transition-all min-h-[44px] font-medium ${
                  specialtyId === spec.id ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 bg-white text-gray-900 hover:border-sky-300'
                }`}
              >
                {spec.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecciona un médico</h2>
          <div className="grid gap-3">
            {filteredDoctors.map(doc => (
              <button
                key={doc.id}
                onClick={() => { setDoctorId(doc.id); setDate(''); setTime(''); setStep(3); }}
                className={`p-4 rounded-xl border text-left transition-all min-h-[44px] ${
                  doctorId === doc.id ? 'border-sky-500 bg-sky-50' : 'border-gray-200 bg-white hover:border-sky-300'
                }`}
              >
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500 mt-1">Horarios: {doc.schedule[0]} - {doc.schedule[doc.schedule.length - 1]} hrs</p>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="mt-4 text-sm text-sky-600 hover:text-sky-700 min-h-[44px]">
            ← Cambiar especialidad
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecciona fecha y horario</h2>

          <div className="mb-6">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input
              id="date"
              type="date"
              min={today}
              max={maxDateStr}
              value={date}
              onChange={(e) => { setDate(e.target.value); setTime(''); }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px]"
            />
          </div>

          {date && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Horarios disponibles</p>
              {availableSlots.length === 0 ? (
                <p className="text-sm text-amber-600 bg-amber-50 p-4 rounded-lg">No hay horarios disponibles para esta fecha. Intenta con otra fecha.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-3 rounded-lg border text-sm font-medium transition-all min-h-[44px] ${
                        time === slot ? 'border-sky-500 bg-sky-600 text-white' : 'border-gray-200 bg-white text-gray-900 hover:border-sky-300'
                      }`}
                    >
                      {fmt12(slot)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {time && (
            <button
              onClick={handleConfirm}
              className="mt-6 w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors min-h-[44px] flex items-center justify-center gap-2"
            >
              <CalendarPlus className="w-5 h-5" aria-hidden="true" />
              Confirmar Cita
            </button>
          )}

          <button onClick={() => setStep(2)} className="mt-4 text-sm text-sky-600 hover:text-sky-700 min-h-[44px]">
            ← Cambiar médico
          </button>
        </div>
      )}
    </div>
  );
}
