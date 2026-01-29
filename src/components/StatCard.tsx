import React from 'react';
import type { LucideIcon } from 'lucide-react';
import '../styles/StatCard.css';

interface StatCardProps {
    icon: LucideIcon;
    value: string | number;
    label: string;
    iconColor: string;
    iconBgColor: string;
    highlight?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, iconColor, iconBgColor, highlight }) => {
    return (
        <div className={`stat-card ${highlight ? 'highlight' : ''}`}>
            <div className="stat-content">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: iconBgColor }}>
                <Icon size={24} color={iconColor} />
            </div>
        </div>
    );
};

export default StatCard;
