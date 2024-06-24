import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin'; 

const EventUpdate = () => {
  const [token, setToken] = useState(null); 
  const [eventId, setEventId] = useState('');
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    registration_required: false,
    max_participants: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  
  const handleTokenReceived = (token) => {
    setToken(token); 
  };

  
  const fetchEventById = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/event/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Fetched event data:', response.data);
      setEvent(response.data); 
    } catch (error) {
      console.error('Error fetching event:', error.response ? error.response.data : error.message);
      setError('Error fetching event. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

 
  const handleInputChange = (e) => {
    setEventId(e.target.value);
  };

  
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventId) {
      setError('Please enter an event ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      
      const formattedEvent = {
        ...event,
        time: event.time ? event.time.slice(0, 5) : '', 
      };

      const response = await axios.put(`http://127.0.0.1:5000/api/v1/event/event/${eventId}`, formattedEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Event updated:', response.data);
      setSuccess('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error.response ? error.response.data : error.message);
      setError('Error updating event. Please check the details and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (token) {
      
    }
  }, [token]);

  return (
    <div className="event-update-container">
      <header>
        <h1>Event Management</h1>
      </header>

      <section id="event-details">
        <h2>Update Event by ID</h2>
        {!token && <TokenLogin onTokenReceived={handleTokenReceived} />}

        {token && (
          <div>
            <input
              type="text"
              placeholder="Enter Event ID"
              value={eventId}
              onChange={handleInputChange}
            />
            <button onClick={fetchEventById} disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch Event'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="eventName">Event Name:</label>
                <input
                  type="text"
                  id="eventName"
                  name="name"
                  value={event.name}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDescription">Event Description:</label>
                <textarea
                  id="eventDescription"
                  name="description"
                  value={event.description}
                  onChange={handleFieldChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Event Date:</label>
                <input
                  type="date"
                  id="eventDate"
                  name="date"
                  value={event.date}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventTime">Event Time:</label>
                <input
                  type="time"
                  id="eventTime"
                  name="time"
                  value={event.time ? event.time.slice(0, 5) : ''}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventLocation">Event Location:</label>
                <input
                  type="text"
                  id="eventLocation"
                  name="location"
                  value={event.location}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="registration_required"
                    checked={event.registration_required}
                    onChange={(e) => setEvent({ ...event, registration_required: e.target.checked })}
                  />
                  Registration Required
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="maxParticipants">Max Participants:</label>
                <input
                  type="number"
                  id="maxParticipants"
                  name="max_participants"
                  value={event.max_participants}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Event'}
              </button>
            </form>
          </div>
        )}
      </section>

      <footer>
        <p>&copy; 2024 Event Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EventUpdate;
