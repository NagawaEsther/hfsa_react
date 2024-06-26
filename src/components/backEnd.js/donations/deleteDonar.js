import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin'; 

const DeleteDonorById = () => {
  const [donorId, setDonorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token')); 


  
  const handleTokenReceived = (token) => {
    setToken(token); 
    sessionStorage.setItem('token', token);
  };

 
  const handleInputChange = (e) => {
    setDonorId(e.target.value);
  };

  
  const handleDeleteClick = async () => {
    if (!donorId) {
      setError('Please enter a donor ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/v1/donation/donation/${donorId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Deleted donor:', response.data); 
      setSuccess('Donor deleted successfully!');
    } catch (error) {
      console.error('Error deleting donor:', error.response ? error.response.data : error.message);
      setError('Error deleting donor. Please check the ID and try again.');
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
    <div className="donor-delete-container">
      

      <section id="delete-donor">
        <h2>Delete Donor by ID</h2>
        
        
        {!token ? (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        ) : (
          <div>
            
            <input
              type="text"
              placeholder="Enter Donor ID"
              value={donorId}
              onChange={handleInputChange}
            />
            
            <button onClick={handleDeleteClick} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete Donor'}
            </button>
            <button onClick={handleLogout}>Logout</button> 
          </div>
        )}
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </div>
  );
};

export default DeleteDonorById;
