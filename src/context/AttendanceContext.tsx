import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { AttendanceRecord } from '../types';
import { format } from 'date-fns';

interface AttendanceContextType {
    attendanceRecords: AttendanceRecord[];
    markAttendance: (status: AttendanceRecord['status']) => void;
    clockOut: () => void;
    getTodayRecord: () => AttendanceRecord | undefined;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
        const saved = localStorage.getItem('hrms_attendance');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('hrms_attendance', JSON.stringify(attendanceRecords));
    }, [attendanceRecords]);

    // Mock logged in user ID
    const currentUserId = 'EMP001';

    const getTodayRecord = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        return attendanceRecords.find(record => record.employeeId === currentUserId && record.date === today);
    };

    const markAttendance = (status: AttendanceRecord['status']) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const existing = getTodayRecord();

        if (existing) return;

        const newRecord: AttendanceRecord = {
            id: `ATT${Date.now()}`,
            employeeId: currentUserId,
            date: today,
            status,
            clockIn: new Date().toLocaleTimeString(),
        };

        setAttendanceRecords([...attendanceRecords, newRecord]);
    };

    const clockOut = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        setAttendanceRecords(records => records.map(record => {
            if (record.employeeId === currentUserId && record.date === today && !record.clockOut) {
                return { ...record, clockOut: new Date().toLocaleTimeString() };
            }
            return record;
        }));
    };

    return (
        <AttendanceContext.Provider value={{ attendanceRecords, markAttendance, clockOut, getTodayRecord }}>
            {children}
        </AttendanceContext.Provider>
    );
};
