import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Employee } from '../types';
import '../styles/EmployeeForm.css';

interface EmployeeFormProps {
    initialData?: Employee;
    onSubmit: (data: Omit<Employee, 'id'>) => void;
    onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
        fullName: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        joiningDate: '',
        status: 'Active',
        ...initialData
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <div className="form-header">
                    <h2>{initialData ? 'Edit Employee' : 'Add Employee'}</h2>
                    <button onClick={onCancel} className="close-btn">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="employee-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Department</label>
                            <select name="department" value={formData.department} onChange={handleChange} required>
                                <option value="">Select...</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Designation</label>
                            <input name="designation" value={formData.designation} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Joining Date</label>
                            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} required>
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Terminated">Terminated</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="btn-submit">Save Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
