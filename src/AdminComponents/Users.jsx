import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import "./Adminstyles/users.css";

const Users = () => {
  const [mechanics, setMechanics] = useState([]); // State to store mechanics data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedMechanic, setSelectedMechanic] = useState(null); // State to store the selected mechanic for the modal

  // Fetch mechanics data when the component mounts
  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mechanic/getAllMechanics');
        setMechanics(response.data.mechanics); // Save mechanics to state
      } catch (err) {
        setError('Failed to fetch mechanics');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMechanics();
  }, []);

  const handleViewClick = (mechanic) => {
    setSelectedMechanic(mechanic);
    setShowModal(true); // Show the modal when a "View" button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMechanic(null); // Reset selected mechanic when the modal is closed
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dash"><br />
      <h1>Mechanics List</h1><br />
      <table className="table" style={{ width: '80%', margin: 'auto' }}>
        <thead>
          <tr>
            <th>Mechanic Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Action</th> {/* Added an Action column for the View button */}
          </tr>
        </thead>
        <tbody>
          {mechanics.map((mechanic) => (
            <tr key={mechanic._id}>
              <td>{mechanic.MechanicNames}</td>
              <td>{mechanic.MechanicEmail}</td>
              <td>{mechanic.specialisation}</td>
              <td>
                <Button variant="primary" onClick={() => handleViewClick(mechanic)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to display full mechanic details */}
      {selectedMechanic && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Mechanic Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Name:</strong> {selectedMechanic.MechanicNames}</p>
            <p><strong>Email:</strong> {selectedMechanic.MechanicEmail}</p>
            <p><strong>Phone Number:</strong> {selectedMechanic.MechanicphoneNumber}</p>
            <p><strong>Location:</strong> {selectedMechanic.location}</p>
            <p><strong>Specialization:</strong> {selectedMechanic.specialisation}</p>
            <p><strong>Certification:</strong> {selectedMechanic.certification}</p>
            {/* If there's an image URL, make sure to handle long links */}
            {selectedMechanic.imageUrl && (
              <div style={{ wordBreak: 'break-word', maxWidth: '100%' }}>
                <strong>Image URL:</strong>
                <p>{selectedMechanic.imageUrl}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Users;
