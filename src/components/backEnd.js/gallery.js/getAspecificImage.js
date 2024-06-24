import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin';

const GetImageById = () => {
  const [imageId, setImageId] = useState('');
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null); 

  const handleTokenReceived = (token) => {
    setToken(token); 
  };

  const fetchImageById = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/gallery/image/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImageData(response.data);
    } catch (error) {
      console.error('Error fetching image:', error.response ? error.response.data : error.message);
      setError('Image not found or an error occurred.');
      setImageData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setImageId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (imageId) {
      fetchImageById();
    } else {
      setError('Please enter an image ID.');
    }
  };

  return (
    <div>
      <header>
        <h1>Find Image by ID</h1>
      </header>
      <section id="image-details">
        <h2>Image Details</h2>
        {token ? (
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Image ID"
                value={imageId}
                onChange={handleInputChange}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Fetching...' : 'Fetch Image'}
              </button>
            </form>
          </div>
        ) : (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        )}
        {error && <p className="error-message">{error}</p>}
        {!imageData && !loading && !error && <p>Enter an image ID to fetch details.</p>}
        {imageData && (
          <div className="image-details-container">
            <img src={imageData.image_url} alt={imageData.title} />
            <div>
              <h3>{imageData.title}</h3>
              <p>{imageData.description}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default GetImageById;
