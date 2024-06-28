
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import designpreview from '../designPreview.png';

const Dashboard = () => {
    return (
        <>
            <div className="homecontainer">
                <div className="first-container">
                    <div className="home-title">
                        <h6>Welcome to Hope Field Sports Academy</h6>
                        <br/>
                        <p className="home-subtitle">Unlock Your Potential, Excel in Sports.</p>
                        <p className="home-text">
                            At Hope Field Sports Academy, we're passionate about developing young athletes into champions.
                            With our dedicated coaching staff and state-of-the-art facilities, we provide a nurturing environment
                            where athletes can thrive and excel in their chosen sport.
                        </p>
                    </div>
                    <div className="additional-info">
                    <h3 style={{ fontWeight: 'bold', color: 'black' ,fontsize:'50px;'}}>Programs offered</h3>
                        <div className="accordion">
                            <div className="accordion-item">
                                <div className="accordion-header">
                                    <h4>Netball</h4>
                                    
                                </div>
                                <br/>
                            </div>
                            <div className="accordion-item">
                                <div className="accordion-header">
                                    <h4>Football</h4>
        
                                </div>
                                <br/>
                            </div>
                            <div className="accordion-item">
                                <div className="accordion-header">
                                    <h4>Volleyball</h4>
                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="second-container">
                    <div className="my-image">
                        <img src={designpreview} alt="Design Preview" />
                    </div>
                    <div className="buttons">
                        <Link to="/signup" className="button">SIGN UP</Link>
                        <Link to="/login" className="button">LOGIN</Link>
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
                <p>Follow us: 
                    <a href="https://facebook.com"><i className="fab fa-facebook"></i> Facebook</a> | 
                    <a href="https://twitter.com"><i className="fab fa-twitter"></i> Twitter</a> | 
                    <a href="https://instagram.com"><i className="fab fa-instagram"></i> Instagram</a>
                </p> 
            </footer>
        </>
    );
};

export default Dashboard;
