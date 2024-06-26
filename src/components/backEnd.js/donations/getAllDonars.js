import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin'; 

const GetAllDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token')); 


  const handleTokenReceived = (token) => {
    setToken(token); 
    sessionStorage.setItem('token', token);
  };

  const fetchDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/donation/donations', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Donors data:', response.data); 
      setDonors(response.data.donations); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching donors:', error.response ? error.response.data : error.message);
      setError('Error fetching donors. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDonors(); 
    }
  }, [token]);

  useEffect(() => {
    console.log('Current state:', { donors, loading, error, token });
  }, [donors, loading, error, token]); 


  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/admin'; 
  };

  return (
    <div className="donor-list-container">
      

      <section id="donor-list">
        <h2>Our Donors</h2>
        {token ? (
          <div>
            {loading && <p>Loading donors...</p>}
            {error && <p className="error-message">{error}</p>}
            {donors.length === 0 ? (
              <p>No donors available.</p>
            ) : (
              <ul className="donor-list">
                {donors.map((donor) => (
                  <li key={donor.id} className="donor-item">
                    <h3>{donor.donor_name}</h3>
                    <p>Email: {donor.donor_email}</p>
                    <p>Donation Amount: ${donor.donation_amount}</p>
                    {donor.message && <p>Message: {donor.message}</p>}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        )}
      </section>

      <footer>
        <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GetAllDonors;

