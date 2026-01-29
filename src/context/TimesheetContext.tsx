import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Timesheet, TimesheetEntry } from '../types';
import api from '../services/api';

interface TimesheetContextType {
    timesheets: Timesheet[];
    getEmployeeTimesheets: (employeeId: string) => Timesheet[];
    saveTimesheet: (timesheet: Partial<Timesheet>) => Promise<void>;
    deleteTimesheet: (id: string) => Promise<void>;
    refreshTimesheets: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TimesheetContext = createContext<TimesheetContextType | undefined>(undefined);

export const TimesheetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [timesheets, setTimesheets] = useState<Timesheet[]>([]);

    const fetchTimesheets = async () => {
        try {
            const response = await api.get('/timesheets/my');
            // Backend returns entries with separate day columns, frontend expects hours array
            const formattedTimesheets = response.data.map((ts: any) => ({
                ...ts,
                entries: ts.entries.map((e: any): TimesheetEntry => ({
                    projectId: e.projectId,
                    taskId: e.taskId,
                    hours: [e.monday, e.tuesday, e.wednesday, e.thursday, e.friday, e.saturday, e.sunday]
                }))
            }));
            setTimesheets(formattedTimesheets);
        } catch (error) {
            console.error('Error fetching timesheets:', error);
        }
    };

    useEffect(() => {
        fetchTimesheets();
    }, []);

    const getEmployeeTimesheets = (employeeId: string) => {
        return timesheets.filter(t => t.employeeId === employeeId).sort((a, b) =>
            new Date(b.weekStartDate).getTime() - new Date(a.weekStartDate).getTime()
        );
    };

    const saveTimesheet = async (data: Partial<Timesheet>) => {
        try {
            // Calculate total hours if not provided or ensure consistency
            const totalHours = data.entries?.reduce((acc, entry) =>
                acc + entry.hours.reduce((hAcc, h) => hAcc + h, 0), 0
            ) || 0;

            await api.post('/timesheets/save', {
                ...data,
                totalHours
            });
            await fetchTimesheets();
        } catch (error) {
            console.error('Error saving timesheet:', error);
        }
    };

    const deleteTimesheet = async (id: string) => {
        try {
            await api.delete(`/timesheets/${id}`);
            await fetchTimesheets();
        } catch (error) {
            console.error('Error deleting timesheet:', error);
        }
    };

    return (
        <TimesheetContext.Provider value={{
            timesheets,
            getEmployeeTimesheets,
            saveTimesheet,
            deleteTimesheet,
            refreshTimesheets: fetchTimesheets
        }}>
            {children}
        </TimesheetContext.Provider>
    );
};
