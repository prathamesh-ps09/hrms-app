
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Employees from './pages/Employees';
import Leaves from './pages/Leaves';
import Reports from './pages/Reports';
import Documents from './pages/Documents';
import Account from './pages/Account';
import Timesheets from './pages/Timesheets';
import { EmployeeProvider } from './context/EmployeeContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { LeaveProvider } from './context/LeaveContext';

function App() {
  return (
    <EmployeeProvider>
      <AttendanceProvider>
        <LeaveProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="employees" element={<Employees />} />
                <Route path="leaves" element={<Leaves />} />
                <Route path="timesheets" element={<Timesheets />} />
                <Route path="reports" element={<Reports />} />
                <Route path="documents" element={<Documents />} />
                <Route path="account" element={<Account />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LeaveProvider>
      </AttendanceProvider>
    </EmployeeProvider>
  );
}

export default App;
