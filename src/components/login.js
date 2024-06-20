import React, { useState } from 'react';
import axios from 'axios';
import workimage from '../workimage.jpg';
import { useAuth } from './admin_dashboard/auth_context';

const LoginForm = () => {
    const { login } = useAuth(); // Destructure the login function from useAuth
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/login', { email, password });
            console.log('Login successful:', response.data);
            login(email, password); // Call login function with email and password
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: Please check your details and try again.');
        }
        
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={workimage} alt="Work" />
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 style={{ color: 'blue' }}>Login</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;


