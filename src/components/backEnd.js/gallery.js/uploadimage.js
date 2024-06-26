
import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin';

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('token')); 


  const handleTokenReceived = (token) => {
    setToken(token);
    sessionStorage.setItem('token', token);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imageUrl || !title || !description) {
      setUploadStatus('Please fill in all fields and provide an image URL.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/gallery/upload', {
        image_url: imageUrl, 
        title,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from API:', response.data);
      setUploadStatus('Image uploaded successfully!');
      setImageUrl('');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus(`Error uploading image: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/admin'; 
  };

  return (
    <div className="upload-container">
      <header>
        <h1>Upload New Image</h1>
      </header>
      <section className="upload-form">
        {token ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={handleUrlChange}
            />
            <button type="submit">Upload</button>
            <button onClick={handleLogout} style={{ color: 'white',backgroundColor:'green' }}>Logout</button> 
          </form>
        ) : (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        )}
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </section>
    </div>
  );
};

export default UploadImage;
