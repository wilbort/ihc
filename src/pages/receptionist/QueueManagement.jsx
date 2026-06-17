import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, User, Play, CheckCircle, AlertTriangle, Plus, Search } from 'lucide-react';
import { fmt12 } from '../../utils/formatTime';
import useFocusTrap from '../../hooks/useFocusTrap';

const columnConfig = {
  emergency: { title: 'Urgencias', color: 'border-red-300 bg-red-50', badge: 'bg-red-100 text-red-700', icon: AlertTriangle },
  waiting: { title: 'En Espera', color: 'border-amber-300 bg-amber-50', badge: 'bg-amber-100 text-amber-700', icon: Clock },
  in_service: { title: 'En Atención', color: 'border-green-300 bg-green-50', badge: 'bg-green-100 text-green-700', icon: Play },
  completed: { title: 'Atendidos', color: 'border-blue-300 bg-blue-50', badge: 'bg-blue-100 text-blue-700', icon: CheckCircle },
};

export default function QueueManagement() {
  const { queue, patients, updateQueueStatus, addEmergency, searchPatients } = useApp();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencySearch, setEmergencySearch] = useState('');
  const emergencyRef = useFocusTrap(showEmergencyModal);

  const getPatientName = (id) => {
    const p = patients.find(p => p.id === id);
    return p ? `${p.firstName} ${p.lastName}` : 'Desconocido';
  };
  const getPatientDni = (id) => patients.find(p => p.id === id)?.dni || '';

  const columns = {
    emergency: queue.filter(q => q.status === 'emergency'),
    waiting: queue.filter(q => q.status === 'waiting'),
    in_service: queue.filter(q => q.status === 'in_service'),
    completed: queue.filter(q => q.status === 'completed'),
  };

  const nextStatus = { emergency: 'in_service', waiting: 'in_service', in_service: 'completed' };
  const nextLabel = { emergency: 'Atender', waiting: 'Atender', in_service: 'Finalizar' };

  const emergencyResults = emergencySearch.length >= 2 ? searchPatients(emergencySearch) : [];

  const handleAddEmergency = (patientId) => {
    addEmergency(patientId);
    setShowEmergencyModal(false);
    setEmergencySearch('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Cola de Atención</h1>
          <p className="text-gray-600">Gestión visual de turnos — panel tipo Kanban</p>
        </div>
        <button
          onClick={() => setShowEmergencyModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors min-h-[44px]"
        >
          <AlertTriangle className="w-4 h-4" aria-hidden="true" />
          Urgencia
        </button>
      </div>

      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-label="Agregar paciente de urgencia" onKeyDown={(e) => { if (e.key === 'Escape') { setShowEmergencyModal(false); setEmergencySearch(''); } }}>
          <div ref={emergencyRef} className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" aria-hidden="true" />
              Turno de Urgencia
            </h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                value={emergencySearch}
                onChange={(e) => setEmergencySearch(e.target.value)}
                placeholder="Buscar paciente por DNI o nombre..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none min-h-[44px]"
                autoFocus
                aria-label="Buscar paciente para urgencia"
              />
            </div>
            {emergencyResults.length > 0 && (
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-48 overflow-y-auto mb-4">
                {emergencyResults.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleAddEmergency(p.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-red-50 transition-colors text-left min-h-[44px]"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{p.firstName} {p.lastName}</p>
                      <p className="text-xs text-gray-500">DNI: {p.dni}</p>
                    </div>
                    <Plus className="w-4 h-4 text-red-500" aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => { setShowEmergencyModal(false); setEmergencySearch(''); }}
              className="w-full py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg min-h-[44px]"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {Object.entries(columnConfig).map(([key, cfg]) => {
          const items = columns[key];
          const Icon = cfg.icon;
          return (
            <div key={key} className={`rounded-2xl border-2 ${cfg.color} p-4 min-h-[200px]`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {cfg.title}
                </h2>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${cfg.badge}`}>
                  {items.length}
                </span>
              </div>

              <div className="space-y-2">
                {items.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-6">Sin pacientes</p>
                ) : items.map(q => (
                  <div key={q.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{getPatientName(q.patientId)}</p>
                        <p className="text-xs text-gray-500">DNI: {getPatientDni(q.patientId)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" /> {fmt12(q.arrivedAt)}
                      </span>
                      {nextStatus[key] && (
                        <button
                          onClick={() => updateQueueStatus(q.id, nextStatus[key])}
                          className="px-3 py-1.5 text-xs font-medium bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors min-h-[32px]"
                        >
                          {nextLabel[key]} →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
