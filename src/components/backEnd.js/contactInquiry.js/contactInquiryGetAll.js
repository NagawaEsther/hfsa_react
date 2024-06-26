
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin';

const ContactInquiryGetAll = () => {
    const [inquiries, setInquiries] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem('token'));

    const handleTokenReceived = (token) => {
        setToken(token);
        sessionStorage.setItem('token', token); 
    };

    const fetchInquiries = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/v1/contact-inquiry/inquiries', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInquiries(response.data.inquiries);
        } catch (error) {
            console.error('Error fetching contact inquiries:', error.response ? error.response.data : error.message);
            setError('Error fetching contact inquiries. Please try again.');
            setInquiries(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchInquiries(); 
        }
    }, [token]);


    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setToken(null);
        window.location.href = '/admin'; 
      };

    return (
        <div>
            <header>
                <h1>Contact Inquiries</h1>
            </header>
            <section id="inquiry-list">
                <h2>Inquiries</h2>
                {token ? (
                    <div>
                        {loading && <p>Loading inquiries...</p>}
                        {error && <p className="error-message">{error}</p>}
                        {inquiries === null ? (
                            <p>Loading inquiries...</p>
                        ) : inquiries.length === 0 ? (
                            <p>No contact inquiries available.</p>
                        ) : (
                            inquiries.map((inquiry) => (
                                <div className="inquiry-item" key={inquiry.id}>
                                    <div className="inquiry-details">
                                        <h3>{inquiry.subject}</h3>
                                        <p>{inquiry.message}</p>
                                        <p>
                                            <strong>Name:</strong> {inquiry.name}
                                        </p>
                                        <p>
                                            <strong>Email:</strong> {inquiry.email}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <TokenLogin onTokenReceived={handleTokenReceived} />
                )}
            </section>
            
        </div>
    );
};

export default ContactInquiryGetAll;
