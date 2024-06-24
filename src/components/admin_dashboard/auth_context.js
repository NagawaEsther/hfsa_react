import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (user, isAdmin) => {
        setLoading(true);
        try {
           
            setUser({ ...user, is_admin: isAdmin });
            localStorage.setItem('token', user.access_token); 
            setLoading(false);
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed: Please check your details and try again.');
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); 
    };

    const isAuthenticated = () => {
        return user !== null; 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export { AuthContext }; 
