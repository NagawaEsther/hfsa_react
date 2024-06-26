import React, { useState } from 'react';
import axios from 'axios';
import TokenLogin from './tokenLogin';

const ProgramUpdate = () => {
  const [programId, setProgramId] = useState('');
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token')); 


  
  const handleTokenReceived = (token) => {
    setToken(token); 
    sessionStorage.setItem('token', token);
  };

 
  const fetchProgram = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/program/program/${programId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setProgram(response.data); 
    } catch (error) {
      console.error('Error fetching program:', error.response ? error.response.data : error.message);
      setError('Error fetching program. Please check the ID and try again.');
      setProgram(null);
    } finally {
      setLoading(false);
    }
  };

 
  const handleInputChange = (e) => {
    setProgramId(e.target.value);
  };

  
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };

 
  const handleFetchClick = () => {
    if (programId) {
      fetchProgram();
    } else {
      setError('Please enter a program ID.');
    }
  };

  
  const handleUpdateClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/program/program/${programId}`, program, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setProgram(response.data.program); 
      alert('Program updated successfully!');
    } catch (error) {
      console.error('Error updating program:', error.response ? error.response.data : error.message);
      setError('Error updating program. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/admin'; 
  };


  return (
    <div>
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>

      <section id="program-details">
        <h2>Program Details</h2>
        {token ? (
          <div>
            <input
              type="text"
              placeholder="Enter Program ID"
              value={programId}
              onChange={handleInputChange}
            />
            <button onClick={handleFetchClick} disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch Program'}
            </button>
            <button onClick={handleLogout}>Logout</button> 
          </div>
        ) : (
          <TokenLogin onTokenReceived={handleTokenReceived} />
        )}
        {error && <p className="error-message">{error}</p>}
        {!program && !loading && !error ? (
          <p>Enter a program ID to fetch details.</p>
        ) : (
          program && (
            <div className="program-details-container">
              <div className="program-item">
                <input
                  type="text"
                  name="name"
                  value={program.name || ''}
                  onChange={handleFieldChange}
                  placeholder="Program Name"
                />
                <textarea
                  name="description"
                  value={program.description || ''}
                  onChange={handleFieldChange}
                  placeholder="Program Description"
                />
                <input
                  type="text"
                  name="schedule"
                  value={program.schedule || ''}
                  onChange={handleFieldChange}
                  placeholder="Program Schedule"
                />
                <input
                  type="number"
                  name="capacity"
                  value={program.capacity || ''}
                  onChange={handleFieldChange}
                  placeholder="Program Capacity"
                />
                <input
                  type="text"
                  name="duration"
                  value={program.duration || ''}
                  onChange={handleFieldChange}
                  placeholder="Program Duration"
                />
                <input
                  type="number"
                  name="fees"
                  value={program.fees || ''}
                  onChange={handleFieldChange}
                  placeholder="Program Fees"
                />
                <button onClick={handleUpdateClick} disabled={loading}>
                  {loading ? 'Updating...' : 'Update Program'}
                </button>
              </div>
            </div>
          )
        )}
      </section>

      <footer>
        <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProgramUpdate;
