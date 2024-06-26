import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin';

const GetUserById = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token')); 

  const handleTokenReceived = (token) => {
    setToken(token); 
    sessionStorage.setItem('token', token);
  };

  const fetchUserById = async () => {
    if (!userId) {
      setError('Please enter a user ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setUserData(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/user/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User data:', response.data); 
      setUserData(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error.response ? error.response.data : error.message);
      setError('Error fetching user. Please check the ID and try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleFetchClick = () => {
    if (userId) {
      fetchUserById();
    } else {
      setError('Please enter a user ID.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/admin'; 
  };

  return (
    <div className="user-details-container">
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>

      <section id="user-details">
        <h2>Find User by ID</h2>
        {token ? (
          <div>
            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={handleInputChange}
            />
            <button onClick={handleFetchClick} disabled={loading}>
              {loading ? 'Fetching...' : 'Get User'}
            </button>
            <button onClick={handleLogout}>Logout</button> 
          </div>
        ) : (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        )}
        {error && <p className="error-message">{error}</p>}
        {userData && (
          <div className="user-details">
            <h3>{userData.name}</h3>
            <p>Email: {userData.email}</p>
            <p>Date of Birth: {userData.date_of_birth}</p>
            <p>Contact Number: {userData.contact_number}</p>
            <p>Address: {userData.address}</p>
          </div>
        )}
      </section>
      
    </div>
  );
};

export default GetUserById;
