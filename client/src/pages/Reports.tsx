import React from 'react';
import { BarChart, PieChart, Download } from 'lucide-react';
import '../styles/Reports.css';

const Reports: React.FC = () => {
    return (
        <div className="reports-container">
            <div className="reports-header">
                <h2>Analytics & Reports</h2>
                <button className="btn-export">
                    <Download size={16} /> Export
                </button>
            </div>

            <div className="report-card">
                <div className="card-header">
                    <h3>Department Distribution</h3>
                    <PieChart size={20} className="text-secondary" />
                </div>
                <div className="chart-container">
                    {/* CSS Simple Bar Chart for distribution */}
                    <div className="chart-row">
                        <span className="label">Engineering</span>
                        <div className="bar-wrapper">
                            <div className="bar" style={{ width: '80%', backgroundColor: '#8B5CF6' }}></div>
                        </div>
                        <span className="value">45%</span>
                    </div>
                    <div className="chart-row">
                        <span className="label">Design</span>
                        <div className="bar-wrapper">
                            <div className="bar" style={{ width: '30%', backgroundColor: '#EC4899' }}></div>
                        </div>
                        <span className="value">15%</span>
                    </div>
                    <div className="chart-row">
                        <span className="label">Marketing</span>
                        <div className="bar-wrapper">
                            <div className="bar" style={{ width: '40%', backgroundColor: '#F59E0B' }}></div>
                        </div>
                        <span className="value">20%</span>
                    </div>
                    <div className="chart-row">
                        <span className="label">Sales</span>
                        <div className="bar-wrapper">
                            <div className="bar" style={{ width: '40%', backgroundColor: '#10B981' }}></div>
                        </div>
                        <span className="value">20%</span>
                    </div>
                </div>
            </div>

            <div className="report-card">
                <div className="card-header">
                    <h3>Attendance Overview</h3>
                    <BarChart size={20} className="text-secondary" />
                </div>
                <div className="stats-row">
                    <div className="stat-item">
                        <span className="stat-label">Avg. Present</span>
                        <span className="stat-num">92%</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Late Arrivals</span>
                        <span className="stat-num">5%</span>
                    </div>
                </div>
                <div className="mini-chart">
                    {/* Simple trend line bars */}
                    {[60, 70, 85, 90, 92, 88, 95].map((h, i) => (
                        <div key={i} className="trend-bar" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                <div className="chart-dates">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>

            <div className="report-list">
                <h3>Available Reports</h3>
                <div className="report-item">
                    <FileTextIcon /> <span>Monthly Attendance Report</span>
                </div>
                <div className="report-item">
                    <FileTextIcon /> <span>Leave Balance Summary</span>
                </div>
                <div className="report-item">
                    <FileTextIcon /> <span>Employee Directory Export</span>
                </div>
            </div>
        </div>
    );
};

const FileTextIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
);

export default Reports;
