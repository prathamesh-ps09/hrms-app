import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Employee } from '../types';
import api from '../services/api';

interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
    updateEmployee: (id: string, updates: Partial<Employee>) => Promise<void>;
    deleteEmployee: (id: string) => Promise<void>;
    getEmployee: (id: string) => Employee | undefined;
    refreshEmployees: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    const fetchEmployees = async () => {
        try {
            const response = await api.get('/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const addEmployee = async (data: Omit<Employee, 'id'>) => {
        try {
            await api.post('/employees', data);
            await fetchEmployees();
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const updateEmployee = async (id: string, updates: Partial<Employee>) => {
        try {
            await api.put(`/employees/${id}`, updates);
            await fetchEmployees();
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const deleteEmployee = async (id: string) => {
        try {
            await api.delete(`/employees/${id}`);
            await fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const getEmployee = (id: string) => employees.find(emp => emp.id === id);

    return (
        <EmployeeContext.Provider value={{
            employees,
            addEmployee,
            updateEmployee,
            deleteEmployee,
            getEmployee,
            refreshEmployees: fetchEmployees
        }}>
            {children}
        </EmployeeContext.Provider>
    );
};
