import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin'; 

const UpdateDonorById = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [donorId, setDonorId] = useState('');
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    donation_amount: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  
  const handleTokenReceived = (token) => {
    setToken(token); 
    sessionStorage.setItem('token', token);
  };

  
  const fetchDonorById = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/donation/donation/${donorId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Fetched donor data:', response.data);
      setFormData(response.data); 
    } catch (error) {
      console.error('Error fetching donor:', error.response ? error.response.data : error.message);
      setError('Error fetching donor. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  
  const handleInputChange = (e) => {
    setDonorId(e.target.value);
  };

  
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!donorId) {
      setError('Please enter a donor ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/donation/donation/${donorId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Donor updated:', response.data);
      setSuccess('Donor updated successfully!');
    } catch (error) {
      console.error('Error updating donor:', error.response ? error.response.data : error.message);
      setError('Error updating donor. Please check the details and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    if (token) {
      
    }
  }, [token]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/admin'; 
  };

  return (
    <div className="donor-update-container">
      <header>
        <h1>Donor Management</h1>
      </header>

      <section id="donor-details">
        <h2>Update Donor by ID</h2>
        {!token && <TokenLogin onTokenReceived={handleTokenReceived} />}

        {token && (
          <div>
            <input
              type="text"
              placeholder="Enter Donor ID"
              value={donorId}
              onChange={handleInputChange}
            />
            <button onClick={fetchDonorById} disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch Donor'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="donorName">Donor Name:</label>
                <input
                  type="text"
                  id="donorName"
                  name="donor_name"
                  value={formData.donor_name}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="donorEmail">Donor Email:</label>
                <input
                  type="email"
                  id="donorEmail"
                  name="donor_email"
                  value={formData.donor_email}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="donationAmount">Donation Amount:</label>
                <input
                  type="number"
                  id="donationAmount"
                  name="donation_amount"
                  value={formData.donation_amount}
                  onChange={handleFieldChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFieldChange}
                ></textarea>
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Donor'}
              </button>
            </form>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </section>

      <footer>
        <p>&copy; 2024 Donor Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UpdateDonorById;
