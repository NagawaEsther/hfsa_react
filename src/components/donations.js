import React, { useState } from 'react';
import axios from 'axios';

const DonationList = () => {
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    donation_amount: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDonationSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting donation:', formData); // Log formData being sent
      const response = await axios.post('http://127.0.0.1:5000/api/v1/donation/create', formData);
      console.log('Donation submitted:', response.data);
      alert('Donation submitted successfully!');
      setFormData({
        donor_name: '',
        donor_email: '',
        donation_amount: '',
        message: ''
      });
    } catch (error) {
      console.error('Donation failed:', error.response ? error.response.data : error.message);
      alert('Donation failed: Please check your details and try again.');
    }
  };

  return (
    <div>
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>

      <div className="donation-list-container background-image">
        <h2>Donations</h2>
        <p>Welcome to our donations page! Your generous contributions help support our mission.</p>
        <form onSubmit={handleDonationSubmit}>
          <div className="form-group">
            <label htmlFor="donorName">Your Name:</label>
            <input
              type="text"
              id="donorName"
              name="donor_name"
              value={formData.donor_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="donorEmail">Your Email:</label>
            <input
              type="email"
              id="donorEmail"
              name="donor_email"
              value={formData.donor_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="donationAmount">Donation Amount :</label>
            <input
              type="number"
              id="donationAmount"
              name="donation_amount"
              value={formData.donation_amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="donation-grid">
          {/* Display donation list here */}
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DonationList;
