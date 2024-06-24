import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin';

const ContactInquiryUpdate = () => {
  const [inquiryId, setInquiryId] = useState('');
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  
  const handleTokenReceived = (token) => {
    setToken(token); 
  };

  
  const fetchInquiry = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/contact-inquiry/inquiry/${inquiryId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setInquiry(response.data); 
    } catch (error) {
      console.error('Error fetching inquiry:', error.response ? error.response.data : error.message);
      setError('Error fetching inquiry. Please check the ID and try again.');
      setInquiry(null);
    } finally {
      setLoading(false);
    }
  };

  
  const handleInputChange = (e) => {
    setInquiryId(e.target.value);
  };

  
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setInquiry({ ...inquiry, [name]: value });
  };

  
  const handleFetchClick = () => {
    if (inquiryId) {
      fetchInquiry();
    } else {
      setError('Please enter an inquiry ID.');
    }
  };

  
  const handleUpdateClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/contact-inquiry/inquiry/${inquiryId}`, inquiry, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setInquiry(response.data); 
      alert('Contact inquiry updated successfully!');
    } catch (error) {
      console.error('Error updating inquiry:', error.response ? error.response.data : error.message);
      setError('Error updating inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>

      <section id="inquiry-details">
        <h2>Contact Inquiry Details</h2>
        {token ? (
          <div>
            <input
              type="text"
              placeholder="Enter Inquiry ID"
              value={inquiryId}
              onChange={handleInputChange}
            />
            <button onClick={handleFetchClick} disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch Inquiry'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {inquiry === null && !loading && !error ? (
              <p>Enter an inquiry ID to fetch details.</p>
            ) : (
              inquiry && (
                <div className="inquiry-details-container">
                  <div className="inquiry-item">
                    <input
                      type="text"
                      name="name"
                      value={inquiry.name || ''}
                      onChange={handleFieldChange}
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={inquiry.email || ''}
                      onChange={handleFieldChange}
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      name="subject"
                      value={inquiry.subject || ''}
                      onChange={handleFieldChange}
                      placeholder="Subject"
                    />
                    <textarea
                      name="message"
                      value={inquiry.message || ''}
                      onChange={handleFieldChange}
                      placeholder="Message"
                      rows={5}
                    />
                    <button onClick={handleUpdateClick} disabled={loading}>
                      {loading ? 'Updating...' : 'Update Inquiry'}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        )}
      </section>

      
    </div>
  );
};

export default ContactInquiryUpdate;
