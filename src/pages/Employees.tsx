import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { useEmployees } from '../hooks/useEmployees';
import type { Employee } from '../types';

const Employees: React.FC = () => {
    const { addEmployee, updateEmployee, getEmployee } = useEmployees();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleAddClick = () => {
        setEditingId(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (id: string) => {
        setEditingId(id);
        setIsFormOpen(true);
    };

    const handleFormSubmit = (data: Omit<Employee, 'id'>) => {
        if (editingId) {
            updateEmployee(editingId, data);
        } else {
            addEmployee(data);
        }
        setIsFormOpen(false);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
    };

    const editingEmployee = editingId ? getEmployee(editingId) : undefined;

    return (
        <div style={{ paddingBottom: '80px' }}>
            <EmployeeList
                onAddClick={handleAddClick}
                onEditClick={handleEditClick}
            />

            {isFormOpen && (
                <EmployeeForm
                    initialData={editingEmployee}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCloseForm}
                />
            )}
        </div>
    );
};

export default Employees;
