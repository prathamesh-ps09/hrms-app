import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Employees from './pages/Employees';
import Leaves from './pages/Leaves';
import Reports from './pages/Reports';
import Documents from './pages/Documents';
import Account from './pages/Account';
import Timesheets from './pages/Timesheets';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleProtectedRoute } from './components/RoleProtectedRoute';
import { useAuth } from './hooks/useAuth';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="employees" element={<Employees />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="timesheets" element={<Timesheets />} />
            <Route path="reports" element={<Reports />} />
            <Route path="documents" element={<Documents />} />
            <Route path="account" element={<Account />} />

            {/* Admin Only Routes */}
            <Route element={<RoleProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/employees" element={<Employees />} />
              <Route path="admin/leaves" element={<Leaves />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
