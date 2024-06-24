import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/api/v1'; 

// Contact Inquiry Endpoints
const apiContactInquiries = axios.create({
  baseURL: `${baseURL}/contact-inquiry`,
});

export const fetchContactInquiries = () => apiContactInquiries.get("/inquiries");
export const getContactInquiry = (id) => apiContactInquiries.get(`/inquiry/${id}`);
export const createContactInquiry = (inquiryData) => apiContactInquiries.post("/create", inquiryData);
export const updateContactInquiry = (id, inquiryData) => apiContactInquiries.put(`/inquiry/${id}`, inquiryData);
export const deleteContactInquiry = (id) => apiContactInquiries.delete(`/inquiry/${id}`);

// Programs Endpoints
const apiPrograms = axios.create({
  baseURL: `${baseURL}/program`,
});

export const fetchPrograms = () => apiPrograms.get("/programs");
export const getProgram = (id) => apiPrograms.get(`/program/${id}`);
export const createProgram = (programData) => apiPrograms.post("/create", programData);
export const updateProgram = (id, programData) => apiPrograms.put(`/program/${id}`, programData);
export const deleteProgram = (id) => apiPrograms.delete(`/program/${id}`);

// Gallery Endpoints
const apiGallery = axios.create({
  baseURL: `${baseURL}/gallery`,
});

export const fetchGalleryItems = () => apiGallery.get("/images");
export const uploadGalleryItem = (imageData) => apiGallery.post("/upload", imageData);
export const deleteGalleryItem = (id) => apiGallery.delete(`/image/${id}`);

// Events Endpoints
const apiEvents = axios.create({
  baseURL: `${baseURL}/event`,
});

export const fetchEvents = () => apiEvents.get("/events");
export const getEvent = (id) => apiEvents.get(`/${id}`);
export const createEvent = (eventData) => apiEvents.post("/create", eventData);
export const updateEvent = (id, eventData) => apiEvents.put(`/${id}`, eventData);
export const deleteEvent = (id) => apiEvents.delete(`/${id}`);

// Donations Endpoints
const apiDonations = axios.create({
  baseURL: `${baseURL}/donation`,
});

export const fetchDonations = () => apiDonations.get("/donations");
export const getDonation = (id) => apiDonations.get(`/${id}`);
export const createDonation = (donationData) => apiDonations.post("/create", donationData);
export const updateDonation = (id, donationData) => apiDonations.put(`/${id}`, donationData);
export const deleteDonation = (id) => apiDonations.delete(`/${id}`);

// User Endpoints
const apiUser = axios.create({
  baseURL: `${baseURL}/user`,
});

export const registerUser = (userData) => apiUser.post("/register", userData);
export const loginUser = (userData) => apiUser.post("/login", userData);
export const updateUser = (id, userData) => apiUser.put(`/${id}`, userData);
export const deleteUser = (id) => apiUser.delete(`/${id}`);
export const getUser = (id) => apiUser.get(`/${id}`);
