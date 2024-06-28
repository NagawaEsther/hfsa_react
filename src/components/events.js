import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './events.css';

const EventList = () => {
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

      <section id="events-news">
        <h2>Updates on upcoming events, competitions, and academy news.</h2>
        <div className="event-list-container">
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
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Registration Required:</strong> {event.registration_required ? 'Yes' : 'No'}</p>
                  {event.max_participants && (
                    <p><strong>Max Participants:</strong> {event.max_participants}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
        <p>Follow us: 
                        <a href="https://facebook.com" >Facebook</a> | 
                        <a href="https://twitter.com">Twitter</a> | 
                        <a href="https://instagram.com">Instagram</a>
                    </p> 
            

      </footer>
    </div>
  );
};

export default EventList;
