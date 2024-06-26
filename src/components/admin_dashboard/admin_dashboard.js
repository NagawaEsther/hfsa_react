
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin_dashboard.css';
import { useAuth } from './auth_context'; 


const baseURL = 'http://127.0.0.1:5000/api/v1';

const apiContactInquiries = axios.create({
  baseURL: `${baseURL}/contact-inquiry`,
});

const apiPrograms = axios.create({
  baseURL: `${baseURL}/program`,
});

const apiGallery = axios.create({
  baseURL: `${baseURL}/gallery`,
});

const apiEvents = axios.create({
  baseURL: `${baseURL}/event`,
});

const apiDonations = axios.create({
  baseURL: `${baseURL}/donation`,
});

const apiUsers = axios.create({
  baseURL: `${baseURL}/user`,
});

const AdminDashboard = () => {
  const { user, logout , isAuthenticated} = useAuth(); 
  

  const [contactInquiries, setContactInquiries] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    if (!isAuthenticated) {
      
      window.location.href = '/login'; 
      return;
    }

    fetchAllData();
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    try {
      const inquiriesResponse = await apiContactInquiries.get("/inquiries");
      setContactInquiries(inquiriesResponse.data);

      const programsResponse = await apiPrograms.get("/programs");
      setPrograms(programsResponse.data);

      const galleryResponse = await apiGallery.get("/images");
      setGalleryItems(galleryResponse.data);

      const eventsResponse = await apiEvents.get("/events");
      setEvents(eventsResponse.data);

      const donationsResponse = await apiDonations.get("/donations");
      setDonations(donationsResponse.data);

      const usersResponse = await apiUsers.get("/");
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteContactInquiry = (id) => {
    apiContactInquiries.delete(`/inquiry/${id}`)
      .then(() => fetchAllData())
      .catch(error => console.error('Error deleting contact inquiry:', error));
  };

  const handleDeleteProgram = (id) => {
    apiPrograms.delete(`/program/${id}`)
      .then(() => fetchAllData())
      .catch(error => console.error('Error deleting program:', error));
  };

  const handleDeleteGalleryItem = (id) => {
    apiGallery.delete(`/image/${id}`)
      .then(() => fetchAllData())
      .catch(error => console.error('Error deleting gallery item:', error));
  };

  const handleDeleteEvent = (id) => {
    apiEvents.delete(`/event/${id}`)
      .then(() => fetchAllData())
      .catch(error => console.error('Error deleting event:', error));
  };

  const handleDeleteDonation = (id) => {
    apiDonations.delete(`/donation/${id}`)
      .then(() => fetchAllData())
      .catch(error => console.error('Error deleting donation:', error));
  };

  const handleDeleteUser = (id) => {
    apiUsers.delete(`/user/${id}`)
      .then(() => fetchAllData())
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleLogout = () => {
    logout(); 
  };

  
  return (
    <div>
      <h1>Welcome to Admin Dashboard, {user ? user.username : 'Admin'}</h1>
      <p>This is a protected area for admins only.</p>

      <button onClick={handleLogout}>Logout</button>

      <table>
        <thead>
          <tr>
            <th>Contact Inquiries</th>
            <th>Programs</th>
            <th>Gallery Items</th>
            <th>Events</th>
            <th>Donations</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {user && user.is_admin && (
              <>
                <td>
                  <Link to="contact_inquiry/create">Create contact inquiry</Link><br />
                  <Link to="contact_inquiry/all">Get all contact inquiries</Link><br />
                  <Link to="contact_inquiry/get">Get a specific contact inquiry</Link><br />
                  <Link to="contact_inquiry/update">Update a specific contact inquiry</Link><br />
                  <Link to="contact_inquiry/delete">Delete contact inquiry</Link><br />
                </td>
                <td>
                  <Link to="programs/add">Add Program</Link><br />
                  <Link to="programs/all">Get all programs</Link><br />
                  <Link to="program/id">Get a specific program</Link><br />
                  <Link to="program/update">Update a program</Link><br />
                  <Link to="program/delete">Delete a program</Link><br />
                </td>
                <td>
                  <Link to="upload/image">Upload image</Link><br />
                  <Link to="getall/images">Get all images</Link><br />
                  <Link to="getspecific/image">Get a specific image</Link><br />
                  <Link to="update/image">Update an image</Link><br />
                  <Link to="delete/image">Delete an image</Link><br />
                </td>
                <td>
                  <Link to="create/event">Create an event</Link><br />
                  <Link to="get/event">Get a specific event</Link><br />
                  <Link to="all/events">Get all events</Link><br />
                  <Link to="update/event">Update an event</Link><br />
                  <Link to="delete/event">Delete an event</Link><br />
                </td>
                <td>
                  <Link to="donation/add">Register donor</Link><br />
                  <Link to="getall/donations">Get all donors</Link><br />
                  <Link to="getspecific/donar">Get specific donor</Link><br />
                  <Link to="update/donar">Update a donor</Link><br />
                  <Link to="delete/donar">Delete a donor</Link><br />
                </td>
                <td>
                  <Link to="user/register">Register user</Link><br />
                  <Link to="getall/users">Get all users</Link><br />
                  <Link to="getspecific/user">Get a specific user</Link><br />
                  <Link to="update/user">Update a user</Link><br />
                  <Link to="delete/user">Delete a user</Link><br />
                </td>
              </>
            )}
          </tr>
        </tbody>
      </table>
      
    </div>
    
 
  );
};

export default AdminDashboard;
