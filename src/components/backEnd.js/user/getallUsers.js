
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TokenLogin from '../tokenLogin';

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  const handleTokenReceived = (token) => {
    setToken(token);
    sessionStorage.setItem('token', token);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/user/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
      setError('Error fetching users. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/admin'; 
  };

  if (!token) {
    return <TokenLogin onTokenReceived={handleTokenReceived} />;
  }

  return (
    <div className="users-container">
      <header>
        <h1>Admin Dashboard</h1>
      </header>

      <section id="user-list">
        <h2>All Users</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Contact Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.date_of_birth}</td>
                  <td>{user.contact_number}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default GetAllUsers;
