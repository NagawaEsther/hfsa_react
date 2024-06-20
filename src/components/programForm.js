import React, { useState } from "react";
import axios from "axios";

const ProgramForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        schedule: '',
        capacity: '',
        Duration:'',
        fees: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/program/create', formData);
            console.log('Program created successful:', response.data);
            alert('Program created successful!');
        } catch (error) {
            console.error('Program creation failed:', error.response ? error.response.data : error.message);
            alert('Program creation failed: Please check your details and try again.');
        }
    };

    return (
        <div className="program-container">
            <form onSubmit={handleSubmit}>
                <h1>Program Form</h1>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="schedule">Schedule:</label>
                    <input
                        type="text"
                        id="schedule"
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Duration">Duration:</label>
                    <input
                        type="number"
                        id="Duration"
                        name="Duration"
                        value={formData.Duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fees">Fees:</label>
                    <input
                        type="number"
                        id="fees"
                        name="fees"
                        value={formData.fees}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProgramForm;
