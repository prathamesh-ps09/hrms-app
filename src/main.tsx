import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

import { AttendanceProvider } from './context/AttendanceContext'
import { LeaveProvider } from './context/LeaveContext'
import { EmployeeProvider } from './context/EmployeeContext'
import { ThemeProvider } from './context/ThemeContext'
import { TimesheetProvider } from './context/TimesheetContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <EmployeeProvider>
        <AttendanceProvider>
          <LeaveProvider>
            <TimesheetProvider>
              <App />
            </TimesheetProvider>
          </LeaveProvider>
        </AttendanceProvider>
      </EmployeeProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
