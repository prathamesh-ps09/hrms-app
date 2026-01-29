import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Employee } from '../types';

// Mock Data
const initialEmployees: Employee[] = [
    {
        id: 'EMP001',
        fullName: 'Harry Power',
        email: 'harry@company.com',
        phone: '555-0100',
        department: 'Engineering',
        designation: 'Senior Developer',
        joiningDate: '2023-01-15',
        status: 'Active'
    },
    {
        id: 'EMP002',
        fullName: 'Sarah Miller',
        email: 'sarah@company.com',
        phone: '555-0101',
        department: 'Design',
        designation: 'UI/UX Designer',
        joiningDate: '2023-03-10',
        status: 'Active'
    },
    {
        id: 'EMP003',
        fullName: 'John Doe',
        email: 'john@company.com',
        phone: '555-0102',
        department: 'Marketing',
        designation: 'Marketing Manager',
        joiningDate: '2022-11-05',
        status: 'On Leave'
    }
];

interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (employee: Omit<Employee, 'id'>) => void;
    updateEmployee: (id: string, updates: Partial<Employee>) => void;
    deleteEmployee: (id: string) => void;
    getEmployee: (id: string) => Employee | undefined;
}

// eslint-disable-next-line react-refresh/only-export-components
export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Try to load from localStorage, fallback to initial mock data
    const [employees, setEmployees] = useState<Employee[]>(() => {
        const saved = localStorage.getItem('hrms_employees');
        return saved ? JSON.parse(saved) : initialEmployees;
    });

    useEffect(() => {
        localStorage.setItem('hrms_employees', JSON.stringify(employees));
    }, [employees]);

    const addEmployee = (data: Omit<Employee, 'id'>) => {
        const newEmployee: Employee = {
            ...data,
            id: `EMP${String(employees.length + 1).padStart(3, '0')}` // Simple ID generation
        };
        setEmployees([...employees, newEmployee]);
    };

    const updateEmployee = (id: string, updates: Partial<Employee>) => {
        setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updates } : emp));
    };

    const deleteEmployee = (id: string) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const getEmployee = (id: string) => employees.find(emp => emp.id === id);

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, getEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};
