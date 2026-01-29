import React from 'react';
import { UserPlus, CalendarCheck, FileText, Settings, type LucideIcon } from 'lucide-react';
import '../styles/ActionGrid.css';

interface ActionButtonProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, onClick }) => (
    <button className="action-button" onClick={onClick}>
        <div className="action-icon-wrapper">
            <Icon size={24} color="var(--color-primary)" />
        </div>
        <span className="action-label">{label}</span>
    </button>
);

const ActionGrid: React.FC = () => {
    return (
        <div className="action-grid">
            <ActionButton icon={UserPlus} label="Add Employee" onClick={() => console.log('Add Employee')} />
            <ActionButton icon={CalendarCheck} label="Approve Leaves" onClick={() => console.log('Approve Leaves')} />
            <ActionButton icon={FileText} label="View Reports" onClick={() => console.log('View Reports')} />
            <ActionButton icon={Settings} label="HR Settings" onClick={() => console.log('HR Settings')} />
        </div>
    );
};

export default ActionGrid;
