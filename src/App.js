import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './WhatsApp_Image_2024-06-11_at_11.12.34_9ad8ac49-removebg-preview.png';
import './App.css';
import ProgramList from './components/program';
import EventList from './components/events';
import DonationList from './components/donations';
import ContactInquiryList from './components/contact_inquiry';
import GalleryList from './components/gallery';
import Dashboard from './components/home'; // Import the Dashboard component
import UserForm from './components/userForm';
import LoginForm from './components/login';
import AboutUs from './components/about_us';
import AdminDashboard from './components/admin_dashboard/admin_dashboard';
import ProtectedRoute from './components/admin_dashboard/protected_routes';
import { AuthProvider } from './components/admin_dashboard/auth_context';

function App() {
  return (
    <AuthProvider> {/* Ensure AuthProvider wraps your entire app */}
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <nav>
              <Link className="App-link" to="/">
                Home
              </Link>
              <Link className="App-link" to="/about_us">
                About us
              </Link>
              <Link className="App-link" to="/programs">
                Programs
              </Link>
              <Link className="App-link" to="/events">
                Events
              </Link>
              <Link className="App-link" to="/contact_inquiry">
                Contact Inquiry
              </Link>
              <Link className="App-link" to="/donations">
                Donations
              </Link>
              <Link className="App-link" to="/gallery">
                Gallery
              </Link>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/programs" element={<ProgramList name='ProgramList' />} />
            <Route path="/events" element={<EventList name='EventList' />} />
            <Route path="/donations" element={<DonationList name='DonationList' />} />
            <Route path="/contact_inquiry" element={<ContactInquiryList name='ContactInquiry' />} />
            <Route path="/gallery" element={<GalleryList name='GalleryList' />} />
            <Route path="/signup" element={<UserForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about_us" element={<AboutUs />} />
            
            {/* ProtectedRoute should be nested under AuthProvider */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
