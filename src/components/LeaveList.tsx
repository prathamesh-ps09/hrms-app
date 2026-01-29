import React from 'react';
import { useLeaves } from '../hooks/useLeaves';

import '../styles/LeaveList.css';

const LeaveList: React.FC<{ employeeId?: string, isManager?: boolean }> = ({ employeeId, isManager }) => {
    const { leaveRequests, updateLeaveStatus } = useLeaves();

    // If isManager, show all pending? Or all? For now show all.
    // If employeeId, filter by it.
    const filtered = isManager
        ? leaveRequests
        : leaveRequests.filter(req => req.employeeId === employeeId);

    return (
        <div className="leave-list">
            {filtered.length === 0 ? (
                <div className="empty-state">No leave requests found.</div>
            ) : (
                filtered.map(req => (
                    <div key={req.id} className="leave-item">
                        <div className="leave-info">
                            <div className="leave-type">{req.type}</div>
                            <div className="leave-dates">
                                {req.startDate} - {req.endDate}
                            </div>
                            <div className="leave-reason">{req.reason}</div>
                        </div>
                        <div className="leave-status-section">
                            <span className={`status-tag ${req.status.toLowerCase()}`}>{req.status}</span>
                            {isManager && req.status === 'Pending' && (
                                <div className="manager-actions">
                                    <button className="btn-approve" onClick={() => updateLeaveStatus(req.id, 'Approved')}>Approve</button>
                                    <button className="btn-reject" onClick={() => updateLeaveStatus(req.id, 'Rejected')}>Reject</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default LeaveList;
