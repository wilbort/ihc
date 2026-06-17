import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, User, Calendar, Phone, Mail, Edit3, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { fmt12 } from '../../utils/formatTime';

export default function SearchPatient() {
  const { patients, searchPatients, getPatientAppointments, updatePatient, doctors, specialties } = useApp();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [editSuccess, setEditSuccess] = useState(false);

  const validateEdit = () => {
    const errs = {};
    if (editForm.phone && !/^\d{9}$/.test(editForm.phone)) errs.phone = 'El teléfono debe tener 9 dígitos';
    if (editForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) errs.email = 'Ingresa un correo electrónico válido';
    if (editForm.birthDate) {
      const bd = new Date(editForm.birthDate + 'T00:00:00');
      if (bd > new Date()) errs.birthDate = 'La fecha de nacimiento no puede ser futura';
    }
    setEditErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const displayedPatients = query.trim() ? searchPatients(query) : patients;

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const getDoctorName = (id) => doctors.find(d => d.id === id)?.name || '';
  const getSpecialtyName = (id) => specialties.find(s => s.id === id)?.name || '';
  const today = new Date().toLocaleDateString('sv-SE');

  const patientAppts = selected ? getPatientAppointments(selected.id) : [];
  const upcomingAppts = patientAppts.filter(a => a.date >= today && a.status === 'confirmed');
  const pastAppts = patientAppts.filter(a => a.status === 'completed' || a.status === 'cancelled').slice(0, 5);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Buscar Paciente</h1>
      <p className="text-gray-600 mb-8">Busca por DNI o nombre para acceder a la información del paciente.</p>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por DNI o nombre del paciente..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px] text-lg"
            aria-label="Filtrar pacientes por DNI o nombre"
          />
        </div>
      </form>

      {!selected && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 flex items-center gap-1.5">
              <Users className="w-4 h-4" aria-hidden="true" />
              {query.trim()
                ? <>{displayedPatients.length} resultado{displayedPatients.length !== 1 ? 's' : ''}</>
                : <>{patients.length} pacientes registrados</>
              }
            </p>
          </div>

          {displayedPatients.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-2xl border border-gray-200">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-gray-600 font-medium">No se encontraron pacientes</p>
              <p className="text-sm text-gray-500 mt-1">Verifica el DNI o nombre ingresado.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 max-h-[480px] overflow-y-auto">
              {displayedPatients.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-sky-50 transition-colors text-left min-h-[44px]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-sky-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{p.firstName} {p.lastName}</p>
                      <p className="text-sm text-gray-500">DNI: {p.dni}</p>
                    </div>
                  </div>
                  <span className="text-sm text-sky-600">Ver detalle →</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selected && (
        <div>
          <button onClick={() => setSelected(null)} className="text-sm text-sky-600 hover:text-sky-700 mb-4 min-h-[44px]">
            ← Volver a resultados
          </button>

          {editSuccess && (
            <div className="flex items-center gap-3 p-4 mb-4 bg-green-50 border border-green-200 rounded-xl" role="status">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" aria-hidden="true" />
              <span className="text-sm text-green-800 font-medium">Datos del paciente actualizados correctamente.</span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-sky-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selected.firstName} {selected.lastName}</h2>
                  <p className="text-gray-500">DNI: {selected.dni}</p>
                </div>
              </div>
              {!editing && (
                <button
                  onClick={() => { setEditing(true); setEditForm({ phone: selected.phone || '', email: selected.email || '', address: selected.address || '', birthDate: selected.birthDate || '' }); setEditSuccess(false); }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-sky-600 hover:bg-sky-50 rounded-lg transition-colors min-h-[44px] font-medium"
                >
                  <Edit3 className="w-4 h-4" aria-hidden="true" />
                  Editar datos
                </button>
              )}
            </div>

            {editing ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input type="tel" value={editForm.phone} onChange={(e) => { setEditForm(prev => ({ ...prev, phone: e.target.value })); setEditErrors(prev => ({ ...prev, phone: undefined })); }} maxLength={9} placeholder="987654321" className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px] ${editErrors.phone ? 'border-red-400' : 'border-gray-300'}`} aria-invalid={!!editErrors.phone} aria-describedby={editErrors.phone ? 'err-phone' : undefined} />
                  {editErrors.phone && <p id="err-phone" className="text-xs text-red-600 mt-1" role="alert">{editErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input type="email" value={editForm.email} onChange={(e) => { setEditForm(prev => ({ ...prev, email: e.target.value })); setEditErrors(prev => ({ ...prev, email: undefined })); }} placeholder="correo@ejemplo.com" className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px] ${editErrors.email ? 'border-red-400' : 'border-gray-300'}`} aria-invalid={!!editErrors.email} aria-describedby={editErrors.email ? 'err-email' : undefined} />
                  {editErrors.email && <p id="err-email" className="text-xs text-red-600 mt-1" role="alert">{editErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
                  <input type="date" value={editForm.birthDate} onChange={(e) => { setEditForm(prev => ({ ...prev, birthDate: e.target.value })); setEditErrors(prev => ({ ...prev, birthDate: undefined })); }} className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px] ${editErrors.birthDate ? 'border-red-400' : 'border-gray-300'}`} aria-invalid={!!editErrors.birthDate} aria-describedby={editErrors.birthDate ? 'err-birth' : undefined} />
                  {editErrors.birthDate && <p id="err-birth" className="text-xs text-red-600 mt-1" role="alert">{editErrors.birthDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input type="text" value={editForm.address} onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))} placeholder="Dirección del paciente" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px]" />
                </div>
                <div className="sm:col-span-2 flex gap-2 mt-2">
                  <button
                    onClick={() => { if (validateEdit()) { updatePatient(selected.id, editForm); setSelected({ ...selected, ...editForm }); setEditing(false); setEditSuccess(true); } }}
                    className="px-6 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 transition-colors min-h-[44px]"
                  >
                    Guardar cambios
                  </button>
                  <button
                    onClick={() => { setEditing(false); setEditSuccess(false); setEditErrors({}); }}
                    className="px-6 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg min-h-[44px]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" aria-hidden="true" /> {selected.phone || 'No registrado'}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" aria-hidden="true" /> {selected.email || 'No registrado'}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" aria-hidden="true" /> {selected.birthDate ? new Date(selected.birthDate + 'T00:00:00').toLocaleDateString('es-PE') : 'No registrado'}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" aria-hidden="true" /> {selected.gender === 'M' ? 'Masculino' : selected.gender === 'F' ? 'Femenino' : 'No registrado'}
                </div>
              </div>
            )}
          </div>

          {upcomingAppts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Citas próximas</h3>
              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                {upcomingAppts.map(a => (
                  <div key={a.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{getSpecialtyName(a.specialtyId)}</p>
                      <p className="text-xs text-gray-500">{getDoctorName(a.doctorId)}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-gray-700">{new Date(a.date + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}</p>
                      <p className="text-gray-500">{fmt12(a.time)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pastAppts.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Historial reciente</h3>
              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                {pastAppts.map(a => (
                  <div key={a.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{getSpecialtyName(a.specialtyId)}</p>
                      <p className="text-xs text-gray-500">{getDoctorName(a.doctorId)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{new Date(a.date + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}</p>
                      <span className={`text-xs font-medium ${a.status === 'completed' ? 'text-green-600' : 'text-red-500'}`}>
                        {a.status === 'completed' ? 'Atendida' : 'Cancelada'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
