import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin'; 

const EventGet = () => {
  const [eventId, setEventId] = useState(''); 
  const [event, setEvent] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [token, setToken] = useState(sessionStorage.getItem('token'));


  const handleTokenReceived = (token) => {
    setToken(token); 
    sessionStorage.setItem('token', token); 
  };

  const handleInputChange = (e) => {
    setEventId(e.target.value); 
  };

  const fetchEvent = async () => {
    if (!eventId) {
      setError('Please enter an event ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setEvent(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/event/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Response data:', response.data); 
      setEvent(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event:', error.response ? error.response.data : error.message); 
      setError('Error fetching event. Please check the ID and try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvent(); 
    }
  }, [token]); 

  
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

      <section id="event-details">
        <h2>Event Details</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Event ID"
            value={eventId}
            onChange={handleInputChange}
          />
          <button onClick={fetchEvent} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Event'}
          </button>
        </div>
        {token ? (
          <div>
            {error && <p className="error-message">{error}</p>}
            {event && (
              <div className="event-details-container">
                <div className="event-item">
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <p>
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Registration Required:</strong> {event.registration_required ? 'Yes' : 'No'}
                  </p>
                  <p>
                    <strong>Max Participants:</strong> {event.max_participants}
                  </p>
                </div>
              </div>
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

export default EventGet;
