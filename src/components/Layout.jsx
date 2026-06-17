import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogOut, Building2, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const navItems = {
  patient: [
    { to: '/patient', label: 'Inicio' },
    { to: '/patient/new-appointment', label: 'Agendar Cita' },
    { to: '/patient/my-appointments', label: 'Mis Citas' },
    { to: '/patient/history', label: 'Historial' },
  ],
  receptionist: [
    { to: '/receptionist', label: 'Panel Principal' },
    {
      label: 'Pacientes',
      children: [
        { to: '/receptionist/register', label: 'Registrar' },
        { to: '/receptionist/search', label: 'Buscar' },
      ],
    },
    {
      label: 'Citas',
      children: [
        { to: '/receptionist/new-appointment', label: 'Agendar' },
        { to: '/receptionist/availability', label: 'Disponibilidad' },
        { to: '/receptionist/appointments', label: 'Gestión' },
      ],
    },
    { to: '/receptionist/queue', label: 'Cola de Atención' },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard' },
  ],
};

function NavDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const childActive = item.children.some(c => location.pathname === c.to);

  useEffect(() => {
    const handle = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center gap-1 ${
          childActive ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg py-1 min-w-[200px] z-50">
          {item.children.map(child => (
            <NavLink
              key={child.to}
              to={child.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 text-sm font-medium min-h-[44px] flex items-center ${
                  isActive ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Layout() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = navItems[currentUser?.role] || [];

  const handleLogout = () => { logout(); navigate('/'); };

  const isEndRoute = (to) => to === '/patient' || to === '/receptionist' || to === '/admin';

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
              {items.map((item) =>
                item.children ? (
                  <NavDropdown key={item.label} item={item} />
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={isEndRoute(item.to)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                        isActive ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
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
            {items.map((item) =>
              item.children ? (
                <div key={item.label} className="py-1">
                  <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                  {item.children.map(child => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block pl-6 pr-3 py-3 rounded-lg text-sm font-medium min-h-[44px] ${
                          isActive ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-100'
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={isEndRoute(item.to)}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-lg text-sm font-medium min-h-[44px] ${
                      isActive ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
