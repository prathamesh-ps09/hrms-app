import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { AttendanceProvider } from './context/AttendanceContext'
import { LeaveProvider } from './context/LeaveContext'
import { EmployeeProvider } from './context/EmployeeContext'
import { AuthProvider } from './context/AuthContext'
import { TimesheetProvider } from './context/TimesheetContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <EmployeeProvider>
          <AttendanceProvider>
            <LeaveProvider>
              <TimesheetProvider>
                <App />
              </TimesheetProvider>
            </LeaveProvider>
          </AttendanceProvider>
        </EmployeeProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
