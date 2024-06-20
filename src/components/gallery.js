import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GalleryList = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/gallery/images');
      console.log('Response from API:', response.data); // Log the entire response data for debugging
      setGalleryItems(response.data.images); // Assuming response.data.images is an array of gallery items
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  console.log('Gallery Items:', galleryItems); // Log galleryItems for further debugging

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
      <footer>
        <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GalleryList;
