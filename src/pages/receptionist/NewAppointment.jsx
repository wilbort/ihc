import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, User, CalendarPlus, CheckCircle, ChevronRight } from 'lucide-react';
import { fmt12 } from '../../utils/formatTime';

export default function NewAppointment() {
  const { patients, searchPatients, specialties, doctors, getAvailableSlots, addAppointment } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [patientQuery, setPatientQuery] = useState('');
  const [patientId, setPatientId] = useState(null);
  const [specialtyId, setSpecialtyId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const displayedPatients = patientQuery.trim() ? searchPatients(patientQuery) : patients;
  const selectedPatient = patients.find(p => p.id === patientId);
  const filteredDoctors = doctors.filter(d => d.specialtyId === specialtyId);
  const availableSlots = doctorId && date ? getAvailableSlots(doctorId, date) : [];
  const today = new Date().toLocaleDateString('sv-SE');
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toLocaleDateString('sv-SE');

  const handleConfirm = () => {
    addAppointment({ patientId, doctorId, specialtyId, date, time, type: 'consulta' });
    setConfirmed(true);
  };

  const stepLabels = ['Paciente', 'Especialidad', 'Médico', 'Fecha y Hora'];

  if (confirmed) {
    const doc = doctors.find(d => d.id === doctorId);
    const spec = specialties.find(s => s.id === specialtyId);
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9 text-green-600" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Cita Registrada</h1>
        <p className="text-gray-600 mb-6">La cita ha sido programada exitosamente.</p>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-left mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Paciente</span><span className="font-medium text-gray-900">{selectedPatient?.firstName} {selectedPatient?.lastName}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">DNI</span><span className="font-medium text-gray-900">{selectedPatient?.dni}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Especialidad</span><span className="font-medium text-gray-900">{spec?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Médico</span><span className="font-medium text-gray-900">{doc?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Fecha</span><span className="font-medium text-gray-900">{new Date(date + 'T00:00:00').toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Hora</span><span className="font-medium text-gray-900">{fmt12(time)}</span></div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setStep(1); setPatientId(null); setPatientQuery(''); setSpecialtyId(null); setDoctorId(null); setDate(''); setTime(''); setConfirmed(false); }} className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors min-h-[44px] font-medium">
            Agendar otra cita
          </button>
          <button onClick={() => navigate('/receptionist/appointments')} className="px-6 py-3 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors min-h-[44px] font-medium">
            Ver citas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Agendar Cita Médica</h1>
      <p className="text-gray-600 mb-8">Programa una cita seleccionando paciente, especialidad, médico y horario.</p>

      <div className="flex items-center gap-2 mb-8" aria-label="Progreso del agendamiento">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-500'
            }`} aria-current={step === i + 1 ? 'step' : undefined}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${step === i + 1 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>{label}</span>
            {i < 3 && <ChevronRight className="w-4 h-4 text-gray-300" aria-hidden="true" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecciona un paciente</h2>
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              value={patientQuery}
              onChange={(e) => setPatientQuery(e.target.value)}
              placeholder="Filtrar por DNI o nombre..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px]"
              aria-label="Filtrar pacientes por DNI o nombre"
            />
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 max-h-[360px] overflow-y-auto">
            {displayedPatients.length === 0 ? (
              <div className="text-center py-8">
                <User className="w-10 h-10 text-gray-300 mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm text-gray-500">No se encontraron pacientes</p>
              </div>
            ) : displayedPatients.map(p => (
              <button
                key={p.id}
                onClick={() => { setPatientId(p.id); setStep(2); }}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-sky-50 transition-colors text-left min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-sky-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{p.firstName} {p.lastName}</p>
                    <p className="text-xs text-gray-500">DNI: {p.dni}</p>
                  </div>
                </div>
                <span className="text-xs text-sky-600">Seleccionar →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 mb-4 text-sm text-sky-800">
            Paciente: <strong>{selectedPatient?.firstName} {selectedPatient?.lastName}</strong> — DNI: {selectedPatient?.dni}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecciona una especialidad</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {specialties.map(spec => (
              <button
                key={spec.id}
                onClick={() => { setSpecialtyId(spec.id); setDoctorId(null); setDate(''); setTime(''); setStep(3); }}
                className={`p-4 rounded-xl border text-left transition-all min-h-[44px] font-medium ${
                  specialtyId === spec.id ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 bg-white text-gray-900 hover:border-sky-300'
                }`}
              >
                {spec.name}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="mt-4 text-sm text-sky-600 hover:text-sky-700 min-h-[44px]">
            ← Cambiar paciente
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 mb-4 text-sm text-sky-800">
            Paciente: <strong>{selectedPatient?.firstName} {selectedPatient?.lastName}</strong> — {specialties.find(s => s.id === specialtyId)?.name}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecciona un médico</h2>
          <div className="grid gap-3">
            {filteredDoctors.map(doc => (
              <button
                key={doc.id}
                onClick={() => { setDoctorId(doc.id); setDate(''); setTime(''); setStep(4); }}
                className={`p-4 rounded-xl border text-left transition-all min-h-[44px] ${
                  doctorId === doc.id ? 'border-sky-500 bg-sky-50' : 'border-gray-200 bg-white hover:border-sky-300'
                }`}
              >
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500 mt-1">Horarios: {doc.schedule[0]} - {doc.schedule[doc.schedule.length - 1]} hrs</p>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="mt-4 text-sm text-sky-600 hover:text-sky-700 min-h-[44px]">
            ← Cambiar especialidad
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 mb-4 text-sm text-sky-800">
            Paciente: <strong>{selectedPatient?.firstName} {selectedPatient?.lastName}</strong> — {specialties.find(s => s.id === specialtyId)?.name} — {doctors.find(d => d.id === doctorId)?.name}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecciona fecha y horario</h2>

          <div className="mb-6">
            <label htmlFor="appt-date" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input
              id="appt-date"
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

          <button onClick={() => setStep(3)} className="mt-4 text-sm text-sky-600 hover:text-sky-700 min-h-[44px]">
            ← Cambiar médico
          </button>
        </div>
      )}
    </div>
  );
}
