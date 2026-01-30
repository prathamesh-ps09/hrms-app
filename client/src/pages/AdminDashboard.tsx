import React, { useEffect, useState } from 'react';
import { Users, Calendar, ClipboardList, ShieldAlert, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/AdminDashboard.css';

interface AdminStats {
    totalEmployees: number;
    pendingLeaves: number;
    totalTimesheets: number;
    departmentStats: { department: string; count: number }[];
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) return <div className="loading">Loading Admin Panel...</div>;

    return (
        <div className="admin-dashboard">
            <div className="admin-welcome">
                <h1>System Administration</h1>
                <p>Manage users, approvals, and organizational data.</p>
            </div>

            <div className="stats-grid">
                <StatCard
                    icon={Users}
                    value={stats?.totalEmployees.toString() || '0'}
                    label="Active Employees"
                    iconColor="#3B82F6"
                    iconBgColor="#DBEAFE"
                />
                <StatCard
                    icon={Calendar}
                    value={stats?.pendingLeaves.toString() || '0'}
                    label="Pending Approvals"
                    iconColor="#F59E0B"
                    iconBgColor="#FEF3C7"
                    highlight={(stats?.pendingLeaves ?? 0) > 0}
                />
                <StatCard
                    icon={ClipboardList}
                    value={stats?.totalTimesheets.toString() || '0'}
                    label="Timesheets Filed"
                    iconColor="#8B5CF6"
                    iconBgColor="#EDE9FE"
                />
            </div>

            <div className="admin-actions-section">
                <h2>Management Portals</h2>
                <div className="management-cards">
                    <Link to="/admin/employees" className="mgmt-card">
                        <div className="mgmt-icon blue">
                            <Users size={24} />
                        </div>
                        <div className="mgmt-info">
                            <h3>Employee Management</h3>
                            <p>Add, edit, or remove staff members and manage roles.</p>
                        </div>
                        <ArrowRight size={20} className="mgmt-arrow" />
                    </Link>

                    <Link to="/admin/leaves" className="mgmt-card">
                        <div className="mgmt-icon orange">
                            <ShieldAlert size={24} />
                        </div>
                        <div className="mgmt-info">
                            <h3>Leave Approvals</h3>
                            <p>Review and decide on pending employee leave requests.</p>
                        </div>
                        <ArrowRight size={20} className="mgmt-arrow" />
                    </Link>
                </div>
            </div>

            <div className="department-overview">
                <h2>Department Distribution</h2>
                <div className="dept-list">
                    {stats?.departmentStats.map((dept) => (
                        <div key={dept.department} className="dept-item">
                            <span className="dept-name">{dept.department}</span>
                            <span className="dept-count">{dept.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
