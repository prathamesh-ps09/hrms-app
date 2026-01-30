import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import Header from './Header';
import '../styles/Layout.css';

const Layout: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Simple titles based on route, can be more dynamic later
    const getTitle = () => {
        switch (location.pathname) {
            case '/employees': return 'People';
            case '/leaves': return 'Leaves';
            case '/documents': return 'Documents';
            case '/account': return 'My Account';
            default: return '';
        }
    };

    return (
        <div className="app-layout">
            <Header showProfile={isHome} title={getTitle()} />
            <main className="app-content">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
};

export default Layout;
