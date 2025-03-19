import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MechanicUpdate = () => {
  const { id } = useParams(); // Get mechanic ID from URL
  const navigate = useNavigate(); // To redirect after update
  const [mechanic, setMechanic] = useState({
    fullName: '',
    phoneNumber: '',
    specialisation: '',
  });
  const [loading, setLoading] = useState(true);

  // Fetch the mechanic details to populate the form
  useEffect(() => {
    const fetchMechanic = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/mechanic/${id}`);
        setMechanic(response.data); // Set the fetched mechanic data
      } catch (error) {
        console.error('Error fetching mechanic:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMechanic();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMechanic((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (update mechanic)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/mechanic/${id}`, mechanic); // API request to update mechanic
      navigate('/MechanicList'); // Redirect to the mechanic list after updating
    } catch (error) {
      console.error('Error updating mechanic:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dash'>
      <center>
        <div className="containerlist" style={{ marginRight: '190px' }}>
          <h2>Update Mechanic</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={mechanic.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={mechanic.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="specialisation">Specialization</label>
              <input
                type="text"
                className="form-control"
                id="specialisation"
                name="specialisation"
                value={mechanic.specialisation}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-3">
              Update
            </button>
          </form>
        </div>
      </center>
    </div>
  );
};

export default MechanicUpdate;
