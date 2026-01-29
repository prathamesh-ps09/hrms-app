import React, { useState } from 'react';
import { useAttendance } from '../hooks/useAttendance';
import { Clock, Calendar as CalendarIcon, MapPin, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import '../styles/Attendance.css';

const Attendance: React.FC = () => {
    const { markAttendance, clockOut, getTodayRecord, attendanceRecords } = useAttendance();
    const todayRecord = getTodayRecord();
    const [currentTime, setCurrentTime] = useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClockIn = () => {
        // Default to Present for Quick Clock In
        markAttendance('Present');
    };

    const handleClockOut = () => {
        clockOut();
    };

    return (
        <div className="attendance-container">
            <div className="date-header">
                <h2>{format(currentTime, 'EEEE, d MMMM yyyy')}</h2>
                <div className="live-time">{format(currentTime, 'hh:mm:ss a')}</div>
            </div>

            <div className="clock-card">
                <div className="clock-status">
                    {todayRecord ? (
                        todayRecord.clockOut ? (
                            <div className="status-badge completed">
                                <CheckCircle size={16} /> Day Completed
                            </div>
                        ) : (
                            <div className="status-badge active">
                                <Clock size={16} /> On Duty
                            </div>
                        )
                    ) : (
                        <div className="status-badge pending">
                            Not Clocked In
                        </div>
                    )}
                </div>

                <div className="clock-circle">
                    <div className="time-display">{format(currentTime, 'HH:mm')}</div>
                    <div className="location-display">
                        <MapPin size={14} /> New York Office
                    </div>
                </div>

                <div className="action-buttons">
                    {!todayRecord ? (
                        <button className="btn-clock-in" onClick={handleClockIn}>
                            Clock In
                        </button>
                    ) : !todayRecord.clockOut ? (
                        <button className="btn-clock-out" onClick={handleClockOut}>
                            Clock Out
                        </button>
                    ) : (
                        <button className="btn-disabled" disabled>
                            Shift Ended
                        </button>
                    )}
                </div>

                {todayRecord && (
                    <div className="session-info">
                        <div className="info-item">
                            <span className="label">Clock In</span>
                            <span className="value">{todayRecord.clockIn}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Clock Out</span>
                            <span className="value">{todayRecord.clockOut || '--:--'}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="attendance-history">
                <h3>Recent Activity</h3>
                <div className="history-list">
                    {attendanceRecords.length === 0 ? (
                        <div className="history-placeholder">
                            <CalendarIcon size={48} className="placeholder-icon" />
                            <p>No earlier records found</p>
                        </div>
                    ) : (
                        attendanceRecords.slice().reverse().map(record => (
                            <div key={record.id} className="history-item">
                                <div className="history-date">
                                    <span className="day">{format(new Date(record.date), 'dd')}</span>
                                    <span className="month">{format(new Date(record.date), 'MMM')}</span>
                                </div>
                                <div className="history-details">
                                    <div className="history-status">{record.status}</div>
                                    <div className="history-time">
                                        {record.clockIn} - {record.clockOut || 'On Going'}
                                    </div>
                                </div>
                                <div className={`status-indicator ${record.status.toLowerCase().replace(' ', '-')}`} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendance;
