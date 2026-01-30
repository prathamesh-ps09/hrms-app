import React, { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useAuth } from '../hooks/useAuth';
import { Search, Plus } from 'lucide-react';
import '../styles/EmployeeList.css';

const EmployeeList: React.FC<{ onAddClick: () => void, onEditClick: (id: string) => void }> = ({ onAddClick, onEditClick }) => {
    const { employees } = useEmployees();
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmployees = employees.filter(emp =>
        emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="employee-list-container">
            <div className="list-header">
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                {isAdmin && (
                    <button className="add-btn" onClick={onAddClick}>
                        <Plus size={20} />
                        <span>Add</span>
                    </button>
                )}
            </div>

            <div className="list-content">
                {filteredEmployees.map((emp) => (
                    <div key={emp.id} className="employee-card" onClick={() => isAdmin && onEditClick(emp.id)}>
                        <div className="emp-avatar">
                            {emp.fullName.charAt(0)}
                        </div>
                        <div className="emp-details">
                            <h3 className="emp-name">{emp.fullName}</h3>
                            <p className="emp-role">{emp.designation}</p>
                            <p className="emp-dept">{emp.department}</p>
                        </div>
                        <div className={`emp-status status-${emp.status.toLowerCase().replace(' ', '-')}`}>
                            {emp.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeList;
