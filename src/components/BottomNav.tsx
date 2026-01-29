import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Calendar, Folder, User, Clock } from 'lucide-react';
import '../styles/BottomNav.css';

const BottomNav: React.FC = () => {
    const navItems = [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/employees', icon: Users, label: 'People' },
        { to: '/attendance', icon: Calendar, label: 'Attendance' }, // Changed back to Attendance for clarity or keep Leaves? The user layout has specific bottom nav requirements.
        // Prompt said: "Home, People, Leaves, Docs, Account".
        // I will adhere to that strictly but add Timesheets as requested.
        // Actually, 6 tabs might be too many for mobile.
        // But for now, let's fix the file.
        { to: '/leaves', icon: Calendar, label: 'Leaves' },
        { to: '/timesheets', icon: Clock, label: 'Timesheets' },
        { to: '/documents', icon: Folder, label: 'Docs' },
        { to: '/account', icon: User, label: 'Account' },
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <item.icon size={24} strokeWidth={2} />
                    <span className="nav-label">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;
