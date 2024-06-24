import React from 'react';
import './about_us.css';

const AboutUs = () => {
    return (
        <>
            <header>
                <h1>About Hope Field Sports Academy</h1>
            </header>
            
            <div className="about-us-container">
                <div className="about-us-content">
                    <section>
                        <h2>ABOUT US</h2>
                        <p>
                            At Hope Sports Academy, we are dedicated to nurturing and developing athletic talent.
                            Explore our programs and join our community.
                        </p>

                        <h2>OUR VALUES</h2>
                        <ul>
                            <li>Excellence: We strive for excellence in everything we do, from coaching to training to competition.</li><br></br>
                            <li>Inclusion: We believe that sports should be accessible to all, regardless of age, gender, or ability.</li><br></br>
                            <li>Respect: We foster a culture of respect, where every student feels valued and supported.</li><br></br>
                            <li>Fun: We believe that sports should be enjoyable, and we strive to create a positive and uplifting environment for all our students.</li>
                        </ul>

                        <h2>OUR TEAM</h2>
                        <p>We have  experienced and dedicated coaches, trainers, and staff who are committed to helping your child succeed.</p>

                        <h2>OUR PROGRAMS</h2>
                        <p>
                            We offer a range of programs for students of all ages and skill levels, from beginner to advanced. Our programs include:
                        </p>
                        <ul>
                            <li>Basketball</li>
                            <li>Netball</li>
                            <li>Football</li>
                        </ul>
                    </section>
                </div>
            </div>
            
            <footer>
                <p>&copy; 2024 Hope Field Sports Academy. All rights reserved.</p>
            </footer>
        </>
    );
};

export default AboutUs;
