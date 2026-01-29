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

            interface BackendEntry {
                projectId: string;
                taskId: string;
                monday: number;
                tuesday: number;
                wednesday: number;
                thursday: number;
                friday: number;
                saturday: number;
                sunday: number;
            }

            interface BackendTimesheet extends Omit<Timesheet, 'entries'> {
                entries: BackendEntry[];
            }

            const formattedTimesheets = response.data.map((ts: BackendTimesheet) => ({
                ...ts,
                entries: ts.entries.map((e: BackendEntry): TimesheetEntry => ({
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
        const loadControl = { mounted: true };
        const init = async () => {
            if (loadControl.mounted) {
                await fetchTimesheets();
            }
        };
        init();
        return () => { loadControl.mounted = false; };
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
