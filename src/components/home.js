import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Dashboard = () => {
    return (
        <>
            <header>
                <h1>Welcome to Hope Field Sports Academy</h1>
            </header>
            
            <div className="dashboard-container">
                <div className="dashboard-content">
                
                    <div className='us'>
                        <section>
                            <h2>OUR VISION</h2>
                            <p>
                                We envision a future where every student has access to high-quality sports education, regardless of their
                                background or ability.
                                We strive to create a community that values teamwork, sportsmanship, and fair play, both on and off the field.
                            </p>
                            <h2>OUR MISSION</h2>
                            <p>
                                Our mission: To inspire and empower young athletes to reach their full potential, both on and off the field.
                            </p>
                        </section>
                    </div>
                </div>
                
                <div className="side_content">
                    <div>
                        <Link to="/signup" className="button">SIGN UP</Link>
                    </div>
                    <div>
                        <Link to="/login" className="button">LOGIN</Link>
                    </div>
                </div>
            </div>

            <footer>
                <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
                 <p>Follow us: 
                        <a href="https://facebook.com">Facebook</a> | 
                        <a href="https://twitter.com">Twitter</a> | 
                        <a href="https://instagram.com">Instagram</a>
                    </p> 
            
            </footer>
        </>
        
    );
};

export default Dashboard;
