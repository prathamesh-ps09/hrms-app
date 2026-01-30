import React from 'react';
import '../styles/LeaveBalanceCards.css';

const LeaveBalanceCards: React.FC = () => {
    // Mock balances
    const balances = [
        { type: 'Sick Leave', used: 2, total: 10, color: '#EF4444' },
        { type: 'Casual Leave', used: 5, total: 12, color: '#F59E0B' },
        { type: 'Privilege Leave', used: 0, total: 15, color: '#10B981' },
    ];

    return (
        <div className="leave-balance-row">
            {balances.map((bal) => (
                <div key={bal.type} className="balance-card">
                    <div className="balance-header">
                        <span className="balance-type">{bal.type}</span>
                        <span className="balance-count" style={{ color: bal.color }}>{bal.total - bal.used}</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${(bal.used / bal.total) * 100}%`, backgroundColor: bal.color }}
                        />
                    </div>
                    <div className="balance-footer">
                        <span>Used: {bal.used}</span>
                        <span>Total: {bal.total}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeaveBalanceCards;
