import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, User, Calendar, Phone, Mail } from 'lucide-react';

export default function SearchPatient() {
  const { searchPatients, getPatientAppointments, doctors, specialties } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setResults(searchPatients(query));
    setSearched(true);
    setSelected(null);
  };

  const handleInputChange = (val) => {
    setQuery(val);
    if (val.length >= 2) {
      setResults(searchPatients(val));
      setSearched(true);
    } else if (val.length === 0) {
      setResults([]);
      setSearched(false);
    }
  };

  const getDoctorName = (id) => doctors.find(d => d.id === id)?.name || '';
  const getSpecialtyName = (id) => specialties.find(s => s.id === id)?.name || '';
  const today = new Date().toISOString().split('T')[0];

  const patientAppts = selected ? getPatientAppointments(selected.id) : [];
  const upcomingAppts = patientAppts.filter(a => a.date >= today && a.status === 'confirmed');
  const pastAppts = patientAppts.filter(a => a.status === 'completed' || a.status === 'cancelled').slice(0, 5);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Buscar Paciente</h1>
      <p className="text-gray-600 mb-8">Busca por DNI o nombre para acceder a la información del paciente.</p>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Ingrese DNI o nombre del paciente..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none min-h-[44px] text-lg"
            aria-label="Buscar paciente por DNI o nombre"
          />
        </div>
      </form>

      {searched && !selected && (
        <div>
          {results.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-2xl border border-gray-200">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-gray-600 font-medium">No se encontraron pacientes</p>
              <p className="text-sm text-gray-500 mt-1">Verifica el DNI o nombre ingresado.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
              {results.map(p => (
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

          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center">
                <User className="w-7 h-7 text-sky-600" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selected.firstName} {selected.lastName}</h2>
                <p className="text-gray-500">DNI: {selected.dni}</p>
              </div>
            </div>

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
                      <p className="text-gray-500">{a.time} hrs</p>
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
