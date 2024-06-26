import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin'; 

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('token')); 

  const handleTokenReceived = (token) => {
    setToken(token); 
    sessionStorage.setItem('token', token);
  };

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDeleteUser = async () => {
    if (!userId) {
      setError('Please enter a user ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/v1/user/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('User deleted:', response.data);
      setSuccessMessage('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
      setError('Error deleting user. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/admin'; 
  };

  return (
    <div className="delete-user-container">
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>

      <section id="delete-user">
        <h2>Delete User</h2>
        {token ? (
          <div>
            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={handleInputChange}
            />
            <button onClick={handleDeleteUser} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete User'}
            </button>
            <button onClick={handleLogout}>Logout</button> 
          </div>
        ) : (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        )}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </section>
    </div>
  );
};

export default DeleteUser;
