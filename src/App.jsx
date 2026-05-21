import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import PatientDashboard from './pages/patient/Dashboard';
import NewAppointment from './pages/patient/NewAppointment';
import MyAppointments from './pages/patient/MyAppointments';
import History from './pages/patient/History';
import ReceptionistDashboard from './pages/receptionist/Dashboard';
import RegisterPatient from './pages/receptionist/RegisterPatient';
import SearchPatient from './pages/receptionist/SearchPatient';
import Appointments from './pages/receptionist/Appointments';
import QueueManagement from './pages/receptionist/QueueManagement';
import AdminDashboard from './pages/admin/Dashboard';

function ProtectedRoute({ role, children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/" replace />;
  if (role && currentUser.role !== role) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  const { currentUser } = useApp();

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Navigate to={`/${currentUser.role}`} replace /> : <Login />} />

      <Route path="/patient" element={<ProtectedRoute role="patient"><Layout /></ProtectedRoute>}>
        <Route index element={<PatientDashboard />} />
        <Route path="new-appointment" element={<NewAppointment />} />
        <Route path="my-appointments" element={<MyAppointments />} />
        <Route path="history" element={<History />} />
      </Route>

      <Route path="/receptionist" element={<ProtectedRoute role="receptionist"><Layout /></ProtectedRoute>}>
        <Route index element={<ReceptionistDashboard />} />
        <Route path="register" element={<RegisterPatient />} />
        <Route path="search" element={<SearchPatient />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="queue" element={<QueueManagement />} />
      </Route>

      <Route path="/admin" element={<ProtectedRoute role="admin"><Layout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
