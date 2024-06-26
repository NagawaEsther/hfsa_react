import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin'; 
const GetDonorById = () => {
  const [donorId, setDonorId] = useState('');
  const [donorData, setDonorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  const handleInputChange = (e) => {
    setDonorId(e.target.value);
  };

  const handleTokenReceived = (token) => {
    setToken(token); 
    sessionStorage.setItem('token', token);
  };

  const fetchDonorById = async () => {
    if (!donorId) {
      setError('Please enter a donor ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setDonorData(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/donation/donation/${donorId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Donor data:', response.data); 
      setDonorData(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching donor:', error.response ? error.response.data : error.message);
      setError('Error fetching donor. Please check the ID and try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDonorById(); 
    }
  }, [token]); 

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/admin'; 
  };

  return (
    <div className="donor-details-container">
      

      <section id="donor-details">
        <h2>Find Donor by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Donor ID"
            value={donorId}
            onChange={handleInputChange}
          />
          <button onClick={fetchDonorById} disabled={loading}>
            {loading ? 'Fetching...' : 'Get Donor'}
          </button>
        </div>
        {token ? (
          <div>
            {error && <p className="error-message">{error}</p>}
            {donorData && (
              <div className="donor-details">
                <h3>{donorData.donor_name}</h3>
                <p>Email: {donorData.donor_email}</p>
                <p>Donation Amount: ${donorData.donation_amount}</p>
                {donorData.message && <p>Message: {donorData.message}</p>}
              </div>
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

export default GetDonorById;
