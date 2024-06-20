import React, { useState } from 'react';
import axios from 'axios';
import workimage from '../workimage.jpg';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        date_of_birth: '',
        contact_number: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/user/register', formData).then;
            console.log('Registration successful:', response.data);
            alert('Registration successful!');
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            alert('Registration failed: Please check your details and try again.');
        }
    };

    return (
        <div className="registration-container">
            <div className="image-container">
                <img src={workimage} alt="Work" />
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 style={{ color: 'blue' }}>Registration Form</h1>
                    <div>
                        <label htmlFor="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role">Role:</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="date_of_birth">Date of Birth:</label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contact_number">Contact Number:</label>
                        <input
                            type="tel"
                            id="contact_number"
                            name="contact_number"
                            value={formData.contact_number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Register</button>

                    <p>
                        By continuing, you agree to Hope Field Sports Academy's Terms of Use and Privacy Policy.
                    </p>
                    <p>
                        Already have an account? <a href="/login">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UserForm;