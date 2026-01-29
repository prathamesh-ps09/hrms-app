
import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { LeaveRequest } from '../types';
import { useLeaves } from '../hooks/useLeaves';
import '../styles/EmployeeForm.css'; // Reuse form styles

const LeaveForm: React.FC<{ onClose: () => void, employeeId: string }> = ({ onClose, employeeId }) => {
    const { applyLeave } = useLeaves();
    const [formData, setFormData] = useState({
        type: 'Sick Leave',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyLeave({
            ...formData,
            employeeId,
            type: formData.type as LeaveRequest['type']
        });
        onClose();
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <div className="form-header">
                    <h2>Apply Leave</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="employee-form">
                    <div className="form-group">
                        <label>Leave Type</label>
                        <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                            <option>Sick Leave</option>
                            <option>Casual Leave</option>
                            <option>Paid Leave</option>
                            <option>Unpaid Leave</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>From</label>
                            <input type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>To</label>
                            <input type="date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Reason</label>
                        <textarea
                            value={formData.reason}
                            onChange={e => setFormData({ ...formData, reason: e.target.value })}
                            style={{ minHeight: '80px', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-submit">Apply</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeaveForm;
