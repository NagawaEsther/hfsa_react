import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming axios is used for HTTP requests
// import { Link } from 'react-router-dom';



const ProgramList = () => {
  const [programs, setPrograms] = useState(null); // Start with null while fetching

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/program/programs'); // Adjust URL as per your API endpoint
        setPrograms(response.data.programs); // Assuming response.data.programs is an array
      } catch (error) {
        console.error('Error fetching programs:', error);
        setPrograms([]); // Set programs to an empty array on error
      }
    };

    fetchPrograms(); // Call fetchData function when component mounts
  }, []);

  return (
    <div>
      <header>
        <h1>Hope Field Sports Academy</h1>
      </header>
                    {/* <div className="side_content">  
                    <div >
                        <Link to="/programs/add" className="button">Add program</Link>
                    </div>
                    </div> */}

      <section id="program-list">
        <h2>Our Programs</h2>
        <div className="program-list-container">
          <div className="program-grid">
            {programs === null ? (
              <p>Loading programs...</p>
            ) : programs.length === 0 ? (
              <p>No programs available.</p>
            ) : (
              programs.map((program) => (
                <div className="program-item" key={program.id}>
                  <div className="program-details">
                    <h3>{program.name}</h3>
                    <p>{program.description}</p>
                    <p>
                      <strong>Schedule:</strong> {program.schedule}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {program.capacity}
                    </p>
                    <p>
                      <strong>Duration:</strong> {program.duration}
                    </p>
                    <p>
                      <strong>Fees:</strong> {program.fees}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      
      <footer>
        <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
      </footer>
    </div>
    
  );
};

export default ProgramList;
