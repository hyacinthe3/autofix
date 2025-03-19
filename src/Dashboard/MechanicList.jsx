import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import "./dashboardstyles/mechaniclist.css"
const MechanicList = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // Add state for delete confirmation modal
  const [currentMechanic, setCurrentMechanic] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    specialisation: '',
  });

  // Fetch all mechanics from the backend
  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mechanic/all');
        console.log(response.data); // Log the response to verify the data structure
        setMechanics(response.data);
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  // Handle mechanic deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/mechanic/${id}`); // Correct API endpoint
      setMechanics(mechanics.filter((mechanic) => mechanic._id !== id)); // Remove deleted mechanic from list
      setShowDeleteModal(false); // Close the delete confirmation modal
    } catch (error) {
      console.error('Error deleting mechanic:', error);
    }
  };

  // Open the modal for editing
  const handleEdit = (mechanic) => {
    setCurrentMechanic(mechanic);
    setFormData({
      fullName: mechanic.fullName,
      phoneNumber: mechanic.phoneNumber,
      specialisation: mechanic.specialisation,
    });
    setShowModal(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedMechanic = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        specialisation: formData.specialisation,
      };
      await axios.put(
        `http://localhost:5000/mechanic/${currentMechanic._id}`,
        updatedMechanic
      );
      setMechanics(
        mechanics.map((mechanic) =>
          mechanic._id === currentMechanic._id ? { ...mechanic, ...updatedMechanic } : mechanic
        )
      );
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error updating mechanic:', error);
    }
  };

  // Open delete confirmation modal
  const confirmDelete = (mechanic) => {
    setCurrentMechanic(mechanic); // Set the mechanic to be deleted
    setShowDeleteModal(true); // Show delete confirmation modal
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dash'>
      <center>
        <div className="containerlist mt-2" style={{ marginLeft: '-270px' }}>
          <h2 className='mechaniclisthead2'>Mechanics List</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Specialization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mechanics.length > 0 ? (
                mechanics.map((mechanic, index) => (
                  <tr key={mechanic._id}>
                    <td>{index + 1}</td>
                    <td>{mechanic.fullName}</td>
                    <td>{mechanic.phoneNumber}</td>
                    <td>{mechanic.specialisation}</td>
                    <td>
                      <Button
                        onClick={() => handleEdit(mechanic)}
                        className="btn btn-primary me-2"
                      >
                        Edit
                      </Button>
                      <button onClick={() => confirmDelete(mechanic)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No mechanics found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </center>

      {/* Edit Mechanic Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Mechanic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSpecialisation">
              <Form.Label>Specialisation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter specialisation"
                name="specialisation"
                value={formData.specialisation}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this mechanic?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(currentMechanic._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MechanicList;
