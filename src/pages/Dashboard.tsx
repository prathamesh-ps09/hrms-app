import React from 'react';
import { Users, Calendar, ClipboardList } from 'lucide-react';
import StatCard from '../components/StatCard';
import ActionGrid from '../components/ActionGrid';
import ScheduleList from '../components/ScheduleList';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <div className="stats-grid">
                <StatCard
                    icon={Users}
                    value="124"
                    label="Total Staff"
                    iconColor="#8B5CF6"
                    iconBgColor="#EDE9FE"
                />
                <StatCard
                    icon={Calendar}
                    value="8"
                    label="On Leave"
                    iconColor="#F59E0B"
                    iconBgColor="#FEF3C7"
                />
                <StatCard
                    icon={ClipboardList}
                    value="12"
                    label="Pending Items"
                    iconColor="#8B5CF6"
                    iconBgColor="#EDE9FE"
                    highlight={true}
                />
            </div>

            <ActionGrid />

            <ScheduleList />
        </div>
    );
};

export default Dashboard;
