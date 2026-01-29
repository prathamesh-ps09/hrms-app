import React from 'react';
import { Calendar, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import type { Timesheet } from '../types';
import '../styles/TimesheetList.css';

interface TimesheetListProps {
    timesheets: Timesheet[];
    onSelect: (timesheet: Timesheet) => void;
    onNew: () => void;
}

const TimesheetList: React.FC<TimesheetListProps> = ({ timesheets, onSelect, onNew }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'var(--color-success)';
            case 'Submitted': return 'var(--color-warning)';
            default: return 'var(--color-text-secondary)';
        }
    };

    return (
        <div className="timesheet-list-container">
            <div className="list-header">
                <h3>Timesheet History</h3>
                <button className="btn-primary" onClick={onNew}>+ New Timesheet</button>
            </div>

            <div className="timesheet-cards">
                {timesheets.length === 0 ? (
                    <div className="empty-state">No timesheets found. Start a new one!</div>
                ) : (
                    timesheets.map(ts => (
                        <div key={ts.id} className="timesheet-item" onClick={() => onSelect(ts)}>
                            <div className="ts-icon">
                                <Calendar size={20} />
                            </div>
                            <div className="ts-details">
                                <div className="ts-week">
                                    {ts.weekStartDate} — {ts.weekEndDate}
                                </div>
                                <div className="ts-hours">{ts.totalHours} Hours</div>
                            </div>
                            <div className="ts-status">
                                {ts.status === 'Approved' ? <CheckCircle size={16} color={getStatusColor(ts.status)} /> :
                                    ts.status === 'Submitted' ? <Clock size={16} color={getStatusColor(ts.status)} /> : null}
                                <span style={{ color: getStatusColor(ts.status) }}>{ts.status}</span>
                                <ChevronRight size={16} className="chevron" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TimesheetList;
