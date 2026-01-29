import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = () => {
    const { token, isLoading } = useAuth();

    if (isLoading) {
        return <div className="loading-screen">Loading...</div>; // Could be a nicer spinner later
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
