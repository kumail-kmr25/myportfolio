import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('adminToken');

    // Check if token exists and is valid (simple check)
    // In a real app, you might verify token expiry here
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
