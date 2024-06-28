
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './WhatsApp_Image_2024-06-11_at_11.12.34_9ad8ac49-removebg-preview.png';
import './App.css';
// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.css';
import ProgramList from './components/program';
import EventList from './components/events';
import DonationList from './components/donations';
import ContactInquiryList from './components/contact_inquiry';
import GalleryList from './components/gallery';
import Dashboard from './components/home';
import UserForm from './components/userForm';
import LoginForm from './components/login';
import AboutUs from './components/about_us';
import AdminDashboard from './components/admin_dashboard/admin_dashboard';
import ProtectedRoute from './components/admin_dashboard/protected_routes';
import { AuthProvider, AuthContext } from './components/admin_dashboard/auth_context'; 



import ProgramForm from './components/programForm';
import ProgramAll from './components/backEnd.js/programAll';
import ProgramGet from './components/backEnd.js/programGet';
import ProgramUpdate from './components/backEnd.js/programUpdate';
import ProgramDelete from './components/backEnd.js/programDelete';
import CreateEvent from './components/backEnd.js/events/createEvent';
import EventGet from './components/backEnd.js/events/getEvent';
import EventAll from './components/backEnd.js/events/eventsAll';
import EventUpdate from './components/backEnd.js/events/eventUpdate';
import EventDelete from './components/backEnd.js/events/eventDelete';
import ContactInquiryGetAll from './components/backEnd.js/contactInquiry.js/contactInquiryGetAll';
import ContactInquiryGet from './components/backEnd.js/contactInquiry.js/specificContactInquiry';
import ContactInquiryUpdate from './components/backEnd.js/contactInquiry.js/updateContactInquiry';
import UploadImage from './components/backEnd.js/gallery.js/uploadimage';
import GetALLImages from './components/backEnd.js/gallery.js/getAllImages';
import GetImageById from './components/backEnd.js/gallery.js/getAspecificImage';
import UpdateImageById from './components/backEnd.js/gallery.js/updateImage';
import DeleteImageById from './components/backEnd.js/gallery.js/deleteImage';
import DeleteContactInquiry from './components/backEnd.js/contactInquiry.js/deleteContactInquiry';
import DonationCreate from './components/backEnd.js/donations/createdonations';
import GetAllDonors from './components/backEnd.js/donations/getAllDonars';
import GetDonorById from './components/backEnd.js/donations/getspecificDonar';
import UpdateDonorById from './components/backEnd.js/donations/updateDonar';
import DeleteDonorById from './components/backEnd.js/donations/deleteDonar';
import UserRegister from './components/backEnd.js/user/createUser';
import GetAllUsers from './components/backEnd.js/user/getallUsers';
import GetUserById from './components/backEnd.js/user/getaspecificUser';
import UpdateUser from './components/backEnd.js/user/updateUser';
import DeleteUser from './components/backEnd.js/user/deleteUser';
import ContactInquiryCreate from './components/backEnd.js/contactInquiry.js/createContactInquiry';

function App() {
  return (
    <AuthProvider> 
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

            {/* ProtectedRoutes */}
            <Route element={<ProtectedRoute isAdminRoute={true} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/programs/add" element={<ProgramForm />} />
              <Route path="/admin/programs/all" element={<ProgramAll />} />
              <Route path="/admin/program/id" element={<ProgramGet />} />
              <Route path="/admin/program/update" element={<ProgramUpdate />} />
              <Route path="/admin/program/delete" element={<ProgramDelete />} />
              <Route path="/admin/create/event" element={<CreateEvent />} />
              <Route path="/admin/get/event" element={<EventGet />} />
              <Route path="/admin/all/events" element={<EventAll />} />
              <Route path="/admin/update/event" element={<EventUpdate />} />
              <Route path="/admin/delete/event" element={<EventDelete />} />
              <Route path="/admin/contact_inquiry/create" element={<ContactInquiryCreate />} />
              <Route path="/admin/contact_inquiry/all" element={<ContactInquiryGetAll />} />
              <Route path="/admin/contact_inquiry/get" element={<ContactInquiryGet />} />
              <Route path="/admin/contact_inquiry/update" element={<ContactInquiryUpdate />} />
              <Route path="/admin/contact_inquiry/delete" element={<DeleteContactInquiry />} />
              <Route path="/admin/upload/image" element={<UploadImage />} />
              <Route path="/admin/getall/images" element={<GetALLImages />} />
              <Route path="/admin/getspecific/image" element={<GetImageById />} />
              <Route path="/admin/update/image" element={<UpdateImageById />} />
              <Route path="/admin/delete/image" element={<DeleteImageById />} />
              <Route path="/admin/donation/add" element={<DonationCreate />} />
              <Route path="/admin/getall/donations" element={<GetAllDonors />} />
              <Route path="/admin/getspecific/donar" element={<GetDonorById />} />
              <Route path="/admin/update/donar" element={<UpdateDonorById />} />
              <Route path="/admin/delete/donar" element={<DeleteDonorById />} />
              <Route path="/admin/user/register" element={<UserRegister />} />
              <Route path="/admin/getall/users" element={<GetAllUsers />} />
              <Route path="/admin/getspecific/user" element={<GetUserById />} />
              <Route path="/admin/update/user" element={<UpdateUser />} />
              <Route path="/admin/delete/user" element={<DeleteUser />} />
              
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
