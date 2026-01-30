import React from 'react';
import { ChevronRight } from 'lucide-react';
import '../styles/ScheduleList.css';

interface ScheduleEvent {
    id: string;
    time: string;
    title: string;
    type: string;
}

const events: ScheduleEvent[] = [
    { id: '1', time: '10:00 AM', title: 'Interview with Sarah', type: 'Recruitment' },
    { id: '2', time: '12:00 PM', title: 'Team Sync', type: 'Meeting' },
    { id: '3', time: '03:00 PM', title: 'Policy Review', type: 'Administrative' },
];

const ScheduleList: React.FC = () => {
    return (
        <div className="schedule-section">
            <div className="section-header">
                <h2>Today's Schedule</h2>
                <button className="view-all-btn">View All</button>
            </div>
            <div className="schedule-list">
                {events.map((event) => (
                    <div key={event.id} className="schedule-item">
                        <div className="schedule-time">{event.time}</div>
                        <div className="schedule-info">
                            <div className="schedule-title">{event.title}</div>
                            <div className="schedule-type">{event.type}</div>
                        </div>
                        <ChevronRight size={20} className="schedule-arrow" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScheduleList;
