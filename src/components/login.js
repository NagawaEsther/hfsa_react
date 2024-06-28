import React, { useState } from 'react';
import axios from 'axios';
import workimage from '../workimage.jpg';
import { useAuth } from './admin_dashboard/auth_context';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/login', { email, password });

            const { is_admin, user } = response.data;

           
            login(user, is_admin);

           
            if (is_admin) {
                navigate('/admin');
            } else {
                navigate('/programs');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Invalid email or password. Please try again.');
            } else {
                console.error('Login failed:', error);
                setError('Login failed: Please check your details and try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={workimage} alt="Work" />
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 style={{ color: 'blue',fontSize:'30px' }}>Login</h1>
                    
                    {error && <p className="error-message">{error}</p>}
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
