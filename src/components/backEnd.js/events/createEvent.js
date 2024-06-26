

import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    registration_required: false,
    max_participants: ''
  });
  const [token, setToken] = useState(null); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(false); 

  const handleTokenReceived = (token) => {
    setToken(token); 
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/event/create', {
        name: formData.name,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        registration_required: formData.registration_required,
        max_participants: parseInt(formData.max_participants)
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
      });
      console.log('Event created successfully:', response.data);
      setSuccess(true); 
      setError(null); 
      alert('Event created successfully!');
    } catch (error) {
      console.error('Event creation failed:', error.response ? error.response.data : error.message);
      setError('Event creation failed: Please check your details and try again.'); 
      setSuccess(false); 
    }
  };

  
  const handleLogout = () => {
    window.location.href = '/admin';
};


  return (
    <div className="event-container">
      <header>
      
        <h1>Hope Field Sports Academy</h1>
      </header>
      <section id="create-event">
        <h2>Create New Event</h2>
        {token ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Event Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Time:
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Registration Required:
                <input
                  type="checkbox"
                  name="registration_required"
                  checked={formData.registration_required}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Max Participants:
                <input
                  type="number"
                  name="max_participants"
                  value={formData.max_participants}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit</button>
            <button onClick={handleLogout} style={{ color: 'white',backgroundColor:'green' }}>Logout</button> 
          </form>
        ) : (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        )}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Event created successfully!</p>}
      </section>
      <footer>
        <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CreateEvent;
