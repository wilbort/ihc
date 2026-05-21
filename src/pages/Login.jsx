import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Building2, Eye, EyeOff, AlertCircle } from 'lucide-react';

const roleRoutes = { patient: '/patient', receptionist: '/receptionist', admin: '/admin' };

const demoAccounts = [
  { username: 'elisa', role: 'Paciente', desc: 'Portal de citas' },
  { username: 'veronica', role: 'Recepcionista', desc: 'Panel de admisión' },
  { username: 'gustavo', role: 'Administrador', desc: 'Dashboard' },
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const user = login(username, password);
    if (user) {
      navigate(roleRoutes[user.role]);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleDemo = (usr) => {
    setUsername(usr);
    setPassword('1234');
    const user = login(usr, '1234');
    if (user) navigate(roleRoutes[user.role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-600 rounded-2xl mb-4">
            <Building2 className="w-9 h-9 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Clínica Auna Trujillo</h1>
          <p className="text-gray-600 mt-1">Sistema de Gestión de Admisión</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert">
                <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow min-h-[44px]"
                placeholder="Ingrese su usuario"
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow min-h-[44px] pr-12"
                  placeholder="Ingrese su contraseña"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword
                    ? <EyeOff className="w-5 h-5" aria-hidden="true" />
                    : <Eye className="w-5 h-5" aria-hidden="true" />
                  }
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors min-h-[44px]"
            >
              Ingresar
            </button>
          </form>
        </div>

        <div className="mt-6 bg-white/70 backdrop-blur rounded-2xl p-6">
          <p className="text-sm font-medium text-gray-600 mb-3">Acceso rápido (demo)</p>
          <div className="grid gap-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.username}
                onClick={() => handleDemo(acc.username)}
                className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-colors text-left min-h-[44px]"
              >
                <div>
                  <span className="text-sm font-medium text-gray-900">{acc.role}</span>
                  <span className="text-xs text-gray-500 ml-2">— {acc.desc}</span>
                </div>
                <span className="text-xs text-gray-400">{acc.username}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">Contraseña para todos: 1234</p>
        </div>
      </div>
    </div>
  );
}
