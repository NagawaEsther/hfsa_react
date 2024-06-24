import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const EventAll = () => {
  const [events, setEvents] = useState(null); 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/event/events'); 
        setEvents(response.data.events); 
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]); 
      }
    };

    fetchEvents(); 
  }, []);

  return (
    <div>
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>
                    
      <section id="event-list">
        <h2>Our Events</h2>
        <div className="event-list-container">
          <div className="event-grid">
            {events === null ? (
              <p>Loading events...</p>
            ) : events.length === 0 ? (
              <p>No events available.</p>
            ) : (
              events.map((event) => (
                <div className="event-item" key={event.id}>
                  <div className="event-details">
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
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventAll;
