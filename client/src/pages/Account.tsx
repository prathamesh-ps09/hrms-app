import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, Calendar, User, Bell, Moon, LogOut, ChevronRight, Shield } from 'lucide-react';
import '../styles/Account.css';

const Account: React.FC = () => {
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    if (!user) return <div className="loading-screen">Loading profile...</div>;

    return (
        <div className="account-container">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-avatar">
                    {user.fullName.charAt(0)}
                </div>
                <div className="profile-info">
                    <h2>{user.fullName}</h2>
                    <div className="profile-role">{user.designation} • {user.department}</div>
                </div>
            </div>

            {/* Personal Details */}
            <div className="section-container">
                <h3 className="section-title">Personal Information</h3>
                <div className="details-card">
                    <div className="detail-item">
                        <div className="item-icon"><Mail size={18} /></div>
                        <div className="item-content">
                            <div className="item-label">Email</div>
                            <div className="item-value">{user.email}</div>
                        </div>
                    </div>
                    <div className="detail-item">
                        <div className="item-icon"><Phone size={18} /></div>
                        <div className="item-content">
                            <div className="item-label">Phone</div>
                            <div className="item-value">N/A</div>
                        </div>
                    </div>
                    <div className="detail-item">
                        <div className="item-icon"><User size={18} /></div>
                        <div className="item-content">
                            <div className="item-label">Employee ID</div>
                            <div className="item-value">{user.id}</div>
                        </div>
                    </div>
                    <div className="detail-item">
                        <div className="item-icon"><Calendar size={18} /></div>
                        <div className="item-content">
                            <div className="item-label">Joined</div>
                            <div className="item-value">N/A</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="section-container">
                <h3 className="section-title">App Settings</h3>
                <div className="settings-card">
                    <div className="setting-item" onClick={() => setNotificationsEnabled(!notificationsEnabled)}>
                        <div className="setting-info">
                            <Bell size={20} /> Push Notifications
                        </div>
                        <div className={`toggle-switch ${notificationsEnabled ? 'active' : ''}`}>
                            <div className="toggle-thumb" />
                        </div>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <Moon size={20} /> Appearance
                        </div>
                        <div className="theme-selector">
                            <button
                                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                                onClick={() => setTheme('light')}
                            >
                                Light
                            </button>
                            <button
                                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                                onClick={() => setTheme('dark')}
                            >
                                Dark
                            </button>
                            <button
                                className={`theme-btn ${theme === 'system' ? 'active' : ''}`}
                                onClick={() => setTheme('system')}
                            >
                                System
                            </button>
                        </div>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <Shield size={20} /> Privacy & Security
                        </div>
                        <ChevronRight size={20} />
                    </div>
                </div>
            </div>

            <button className="action-btn btn-logout" onClick={logout}>
                <LogOut size={20} /> Sign Out
            </button>
        </div>
    );
};

export default Account;
