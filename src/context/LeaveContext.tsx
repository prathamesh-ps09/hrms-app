import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { LeaveRequest } from '../types';

interface LeaveContextType {
    leaveRequests: LeaveRequest[];
    applyLeave: (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => void;
    updateLeaveStatus: (id: string, status: LeaveRequest['status']) => void;
    getEmployeeLeaves: (employeeId: string) => LeaveRequest[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const LeaveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
        const saved = localStorage.getItem('hrms_leaves');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('hrms_leaves', JSON.stringify(leaveRequests));
    }, [leaveRequests]);

    const applyLeave = (data: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => {
        const newLeave: LeaveRequest = {
            ...data,
            id: `LEAVE${Date.now()}`,
            status: 'Pending',
            appliedDate: new Date().toISOString().split('T')[0]
        };
        setLeaveRequests([...leaveRequests, newLeave]);
    };

    const updateLeaveStatus = (id: string, status: LeaveRequest['status']) => {
        setLeaveRequests(requests => requests.map(req =>
            req.id === id ? { ...req, status } : req
        ));
    };

    const getEmployeeLeaves = (employeeId: string) => {
        return leaveRequests.filter(req => req.employeeId === employeeId);
    };

    return (
        <LeaveContext.Provider value={{ leaveRequests, applyLeave, updateLeaveStatus, getEmployeeLeaves }}>
            {children}
        </LeaveContext.Provider>
    );
};
