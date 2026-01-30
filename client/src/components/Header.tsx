import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
    title?: string;
    showProfile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showProfile = false }) => {
    return (
        <header className="app-header">
            {showProfile ? (
                <div className="header-content">
                    <div className="profile-section">
                        <div className="profile-image-placeholder">HP</div>
                        <div className="greeting">
                            <span className="greeting-text">Good Morning,</span>
                            <span className="user-name">Harry Power</span>
                        </div>
                    </div>
                    {/* Notification bell could go here */}
                </div>
            ) : (
                <h1 className="header-title">{title}</h1>
            )}
        </header>
    );
};

export default Header;
