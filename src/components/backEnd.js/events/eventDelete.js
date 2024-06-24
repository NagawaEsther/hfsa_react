import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin'; 

const EventDelete = () => {
  const [eventId, setEventId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [token, setToken] = useState(null); 

 
  const handleTokenReceived = (token) => {
    setToken(token); 
  };

  
  const handleInputChange = (e) => {
    setEventId(e.target.value);
  };

  
  const handleDeleteClick = async () => {
    if (!eventId) {
      setError('Please enter an event ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/v1/event/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Deleted event:', response.data); 
      setSuccess('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error.response ? error.response.data : error.message);
      setError('Error deleting event. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-delete-container">
      

      <section id="delete-event">
        <h2>Delete Event by ID</h2>
        
        {!token ? (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        ) : (
          <div>
            
            <input
              type="text"
              placeholder="Enter Event ID"
              value={eventId}
              onChange={handleInputChange}
            />
            
            <button onClick={handleDeleteClick} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete Event'}
            </button>
          </div>
        )}
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </div>
  );
};

export default EventDelete;
