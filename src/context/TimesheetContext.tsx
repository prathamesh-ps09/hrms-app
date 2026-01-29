import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Timesheet } from '../types';

interface TimesheetContextType {
    timesheets: Timesheet[];
    getEmployeeTimesheets: (employeeId: string) => Timesheet[];
    saveTimesheet: (timesheet: Timesheet) => void;
    deleteTimesheet: (id: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TimesheetContext = createContext<TimesheetContextType | undefined>(undefined);

export const TimesheetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [timesheets, setTimesheets] = useState<Timesheet[]>(() => {
        const saved = localStorage.getItem('hrms-timesheets');
        if (saved) {
            return JSON.parse(saved);
        }
        // Mock data for demo
        return [{
            id: 'TS001',
            employeeId: 'EMP001',
            weekStartDate: '2023-10-23',
            weekEndDate: '2023-10-29',
            status: 'Approved',
            totalHours: 40,
            entries: [
                { projectId: 'Project Alpha', taskId: 'Development', hours: [8, 8, 8, 8, 8, 0, 0] }
            ],
            submittedDate: '2023-10-30'
        }];
    });

    // Save to local storage whenever changed
    useEffect(() => {
        localStorage.setItem('hrms-timesheets', JSON.stringify(timesheets));
    }, [timesheets]);

    const getEmployeeTimesheets = (employeeId: string) => {
        return timesheets.filter(t => t.employeeId === employeeId).sort((a, b) =>
            new Date(b.weekStartDate).getTime() - new Date(a.weekStartDate).getTime()
        );
    };

    const saveTimesheet = (timesheet: Timesheet) => {
        setTimesheets(prev => {
            const index = prev.findIndex(t => t.id === timesheet.id);
            if (index >= 0) {
                const updated = [...prev];
                updated[index] = timesheet;
                return updated;
            }
            return [timesheet, ...prev];
        });
    };

    const deleteTimesheet = (id: string) => {
        setTimesheets(prev => prev.filter(t => t.id !== id));
    };

    return (
        <TimesheetContext.Provider value={{ timesheets, getEmployeeTimesheets, saveTimesheet, deleteTimesheet }}>
            {children}
        </TimesheetContext.Provider>
    );
};
