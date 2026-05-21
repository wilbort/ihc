import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogOut, Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = {
  patient: [
    { to: '/patient', label: 'Inicio' },
    { to: '/patient/new-appointment', label: 'Agendar Cita' },
    { to: '/patient/my-appointments', label: 'Mis Citas' },
    { to: '/patient/history', label: 'Historial' },
  ],
  receptionist: [
    { to: '/receptionist', label: 'Panel Principal' },
    { to: '/receptionist/register', label: 'Registrar Paciente' },
    { to: '/receptionist/search', label: 'Buscar Paciente' },
    { to: '/receptionist/appointments', label: 'Citas' },
    { to: '/receptionist/queue', label: 'Cola de Atención' },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard' },
  ],
};

export default function Layout() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = navItems[currentUser?.role] || [];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-sky-600" aria-hidden="true" />
              <div>
                <span className="text-lg font-bold text-gray-900">Clínica Auna</span>
                <span className="hidden sm:inline text-sm text-gray-500 ml-2">Trujillo</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
              {items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/patient' || item.to === '/receptionist' || item.to === '/admin'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                      isActive ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-gray-600">
                {currentUser?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] justify-center"
                aria-label="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
                <span className="hidden sm:inline">Salir</span>
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg"
                aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-gray-200 bg-white px-4 py-2" aria-label="Navegación móvil">
            {items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/patient' || item.to === '/receptionist' || item.to === '/admin'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-lg text-sm font-medium min-h-[44px] ${
                    isActive ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
