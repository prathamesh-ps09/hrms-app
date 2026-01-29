import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { LeaveRequest } from '../types';
import api from '../services/api';

interface LeaveContextType {
    leaveRequests: LeaveRequest[];
    applyLeave: (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => Promise<void>;
    updateLeaveStatus: (id: string, status: LeaveRequest['status']) => Promise<void>;
    getEmployeeLeaves: (employeeId: string) => LeaveRequest[];
    refreshLeaves: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const LeaveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

    const fetchLeaves = async () => {
        try {
            const response = await api.get('/leaves/my');
            setLeaveRequests(response.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const applyLeave = async (data: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => {
        try {
            await api.post('/leaves/apply', data);
            await fetchLeaves();
        } catch (error) {
            console.error('Error applying for leave:', error);
        }
    };

    const updateLeaveStatus = async (id: string, status: LeaveRequest['status']) => {
        try {
            await api.put(`/leaves/${id}/status`, { status });
            await fetchLeaves();
        } catch (error) {
            console.error('Error updating leave status:', error);
        }
    };

    const getEmployeeLeaves = (employeeId: string) => {
        return leaveRequests.filter(req => req.employeeId === employeeId);
    };

    return (
        <LeaveContext.Provider value={{
            leaveRequests,
            applyLeave,
            updateLeaveStatus,
            getEmployeeLeaves,
            refreshLeaves: fetchLeaves
        }}>
            {children}
        </LeaveContext.Provider>
    );
};
