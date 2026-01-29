import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { AttendanceRecord } from '../types';
import { format } from 'date-fns';
import api from '../services/api';

interface AttendanceContextType {
    attendanceRecords: AttendanceRecord[];
    markAttendance: (status: AttendanceRecord['status']) => Promise<void>;
    clockOut: () => Promise<void>;
    getTodayRecord: () => AttendanceRecord | undefined;
    refreshAttendance: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

    const fetchAttendance = async () => {
        try {
            const response = await api.get('/attendance/my');
            setAttendanceRecords(response.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const getTodayRecord = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        return attendanceRecords.find(record => record.date === today);
    };

    const markAttendance = async (status: AttendanceRecord['status']) => {
        try {
            await api.post('/attendance/mark', { status });
            await fetchAttendance();
        } catch (error) {
            console.error('Error marking attendance:', error);
        }
    };

    const clockOut = async () => {
        try {
            await api.put('/attendance/clock-out');
            await fetchAttendance();
        } catch (error) {
            console.error('Error clocking out:', error);
        }
    };

    return (
        <AttendanceContext.Provider value={{
            attendanceRecords,
            markAttendance,
            clockOut,
            getTodayRecord,
            refreshAttendance: fetchAttendance
        }}>
            {children}
        </AttendanceContext.Provider>
    );
};
