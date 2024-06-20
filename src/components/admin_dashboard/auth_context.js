import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    console.log('AuthProvider rendered');

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/user/login', { email, password });
            setUser(response.data.user); // Assuming backend sends user data
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            setLoading(false);
            alert('Login successful!');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed: Please check your details and try again.');
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Remove token from localStorage on logout
    };

    const isAuthenticated = () => {
        return user !== null; // Simple check to see if user is authenticated
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log('useAuth', context); // Add this line for debugging
    return context;
};
