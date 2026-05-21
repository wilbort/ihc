import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

const initialForm = { dni: '', firstName: '', lastName: '', phone: '', email: '', birthDate: '', address: '', gender: '' };

export default function RegisterPatient() {
  const { addPatient, findPatientByDni } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.dni || !/^\d{8}$/.test(form.dni)) e.dni = 'El DNI debe tener 8 dígitos';
    if (!form.firstName.trim()) e.firstName = 'Nombre es obligatorio';
    if (!form.lastName.trim()) e.lastName = 'Apellido es obligatorio';
    if (!form.phone || !/^\d{9}$/.test(form.phone)) e.phone = 'Teléfono debe tener 9 dígitos';
    if (!form.gender) e.gender = 'Seleccione el género';
    return e;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
    setDuplicate(false);
    setSuccess(false);
  };

  const handleDniBlur = () => {
    if (form.dni.length === 8) {
      const existing = findPatientByDni(form.dni);
      if (existing) setDuplicate(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (findPatientByDni(form.dni)) { setDuplicate(true); return; }

    addPatient(form);
    setSuccess(true);
    setForm(initialForm);
  };

  const fields = [
    { id: 'dni', label: 'DNI', type: 'text', placeholder: '12345678', maxLength: 8, full: false },
    { id: 'gender', label: 'Género', type: 'select', options: [{ v: '', l: 'Seleccione...' }, { v: 'M', l: 'Masculino' }, { v: 'F', l: 'Femenino' }], full: false },
    { id: 'firstName', label: 'Nombres', type: 'text', placeholder: 'Nombres del paciente', full: false },
    { id: 'lastName', label: 'Apellidos', type: 'text', placeholder: 'Apellidos del paciente', full: false },
    { id: 'phone', label: 'Teléfono', type: 'tel', placeholder: '987654321', maxLength: 9, full: false },
    { id: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'correo@ejemplo.com', full: false },
    { id: 'birthDate', label: 'Fecha de nacimiento', type: 'date', full: false },
    { id: 'address', label: 'Dirección', type: 'text', placeholder: 'Dirección del paciente', full: true },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Registrar Nuevo Paciente</h1>
      <p className="text-gray-600 mb-8">Formulario unificado de registro — todos los campos en una sola pantalla.</p>

      {success && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 border border-green-200 rounded-xl" role="status">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" aria-hidden="true" />
          <span className="text-sm text-green-800 font-medium">Paciente registrado exitosamente.</span>
        </div>
      )}

      {duplicate && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-amber-50 border border-amber-200 rounded-xl" role="alert">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
          <span className="text-sm text-amber-800 font-medium">Ya existe un paciente registrado con este DNI.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.id} className={f.full ? 'sm:col-span-2' : ''}>
              <label htmlFor={f.id} className="block text-sm font-medium text-gray-700 mb-1">
                {f.label}
                {['dni', 'firstName', 'lastName', 'phone', 'gender'].includes(f.id) && (
                  <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                )}
              </label>
              {f.type === 'select' ? (
                <select
                  id={f.id}
                  value={form[f.id]}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px] ${
                    errors[f.id] ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  {f.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              ) : (
                <input
                  id={f.id}
                  type={f.type}
                  value={form[f.id]}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  onBlur={f.id === 'dni' ? handleDniBlur : undefined}
                  placeholder={f.placeholder}
                  maxLength={f.maxLength}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px] ${
                    errors[f.id] ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                />
              )}
              {errors[f.id] && (
                <p className="mt-1 text-xs text-red-600" role="alert">{errors[f.id]}</p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors min-h-[44px] flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" aria-hidden="true" />
          Registrar Paciente
        </button>
      </form>
    </div>
  );
}
