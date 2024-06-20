import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth_context';

const ProtectedRoute = ({ ...rest }) => {
    const { user } = useAuth();

    const isAdmin = user && user.role === 'admin';

    return isAdmin ? <Outlet {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
