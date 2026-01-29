import React, { useState } from 'react';
import LeaveBalanceCards from '../components/LeaveBalanceCards';
import LeaveList from '../components/LeaveList';
import LeaveForm from '../components/LeaveForm';
import { Plus } from 'lucide-react';
import '../styles/Leaves.css';

const Leaves: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'my-leaves' | 'approvals'>('my-leaves');
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Mock logged in user
    const currentUserId = 'EMP001';

    return (
        <div className="leaves-container">
            <div className="leaves-header-actions">
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'my-leaves' ? 'active' : ''}`}
                        onClick={() => setActiveTab('my-leaves')}
                    >
                        My Leaves
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'approvals' ? 'active' : ''}`}
                        onClick={() => setActiveTab('approvals')}
                    >
                        Approvals
                    </button>
                </div>
                {activeTab === 'my-leaves' && (
                    <button className="btn-apply" onClick={() => setIsFormOpen(true)}>
                        <Plus size={18} /> Apply
                    </button>
                )}
            </div>

            {activeTab === 'my-leaves' ? (
                <>
                    <LeaveBalanceCards />
                    <div className="list-section">
                        <h3>History</h3>
                        <LeaveList employeeId={currentUserId} />
                    </div>
                </>
            ) : (
                <div className="list-section">
                    <h3>Pending Requests</h3>
                    <LeaveList isManager={true} />
                </div>
            )}

            {isFormOpen && (
                <LeaveForm
                    employeeId={currentUserId}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
};

export default Leaves;
