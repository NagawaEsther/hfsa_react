import React, { useEffect, useState } from 'react';
import axios from 'axios';


const GetALLImages = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('token')); 

  useEffect(() => {
    fetchGetAllImages();
  }, []);

  const fetchGetAllImages = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/gallery/images');
      sessionStorage.setItem('token', token);
      console.log('Response from API:', response.data); 
      setGalleryItems(response.data.images); 
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  console.log('Gallery Items:', galleryItems); 

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/admin'; 
  };

  return (
    <div>
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>
      
      <div className="gallery-list-container">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div className="gallery-item" key={item.id}>
              <img src={item.image_url} alt={item.title} />
              <div className="gallery-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default GetALLImages;
