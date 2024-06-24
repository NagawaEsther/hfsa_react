import React, { useState } from 'react';
import axios from 'axios';
import './contact_inquiry.css';


const ContactInquiryList = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting inquiry:', formData); 
      const response = await axios.post('http://127.0.0.1:5000/api/v1/contact-inquiry/create', formData);
      console.log('Inquiry submitted:', response.data);
      alert('Inquiry submitted successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Inquiry failed:', error.response ? error.response.data : error.message);
      alert('Inquiry failed: Please check your details and try again.');
    }
  };

  return (
    <div>
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>
      
      <div className="contact-container">
        <div className="contact-content">
          <section id="contact">
            <h2>Contact Information</h2>
            <p>You can contact us by phone or visit us at the following address:</p>
            <p>Phone: 0773920004</p>
            <p>Address: Wampeewo-Kasangati, along Gayaza road</p>
            <h2>Get Directions</h2>
            <div id="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d88863.42053396728!2d32.51273234208167!3d0.44090996493321005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db16b644bd265%3A0x3a4337296ca4adce!2sWampeewo%20Play%20Ground!5e0!3m2!1sen!2sug!4v1715694976528!5m2!1sen!2sug"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>
        </div>
        <div className="sidebar">
          <h2>Contact Form</h2>
          <form id="contact-form" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactInquiryList;
