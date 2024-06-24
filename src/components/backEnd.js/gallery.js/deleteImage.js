import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin';

const DeleteImageById = () => {
  const [imageId, setImageId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [token, setToken] = useState(null); 

  
  const handleTokenReceived = (token) => {
    setToken(token); 
  };

  
  const handleInputChange = (e) => {
    setImageId(e.target.value);
  };

 
  const handleDeleteClick = async () => {
    if (!imageId) {
      setError('Please enter an image ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.delete(`http://127.0.0.1:5000/api/v1/gallery/image/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setSuccess('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error.response ? error.response.data : error.message);
      setError('Error deleting image. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-container">
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>

      <section id="delete-image">
        <h2>Delete Image by ID</h2>
        {token ? (
          <div>
            <input
              type="text"
              placeholder="Enter Image ID"
              value={imageId}
              onChange={handleInputChange}
            />
            <button onClick={handleDeleteClick} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete Image'}
            </button>
          </div>
        ) : (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        )}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </div>
  );
};

export default DeleteImageById;
