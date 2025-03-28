import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Table, Container, Alert } from 'react-bootstrap';

const MechanicList = () => {
  const [mechanics, setMechanics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentMechanic, setCurrentMechanic] = useState(null);
  const [formData, setFormData] = useState({ fullName: '', phoneNumber: '', specialisation: '' });
  const [error, setError] = useState('');
  const [deleteMechanicId, setDeleteMechanicId] = useState(null);

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/mechanic/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMechanics(response.data);
    } catch (error) {
      setError('Error fetching mechanics: ' + error.message);
      console.error('Error fetching mechanics:', error);
    }
  };

  const handleEdit = (mechanic) => {
    setCurrentMechanic(mechanic);
    setFormData({ ...mechanic });
    setShowModal(true);
  };

  const handleDeleteConfirm = (id) => {
    setDeleteMechanicId(id);
    setShowDeleteModal(true); // Show confirmation modal before deletion
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/mechanic/${deleteMechanicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMechanics(mechanics.filter((m) => m._id !== deleteMechanicId));
      setShowDeleteModal(false); // Close delete confirmation modal
    } catch (error) {
      setError('Error deleting mechanic: ' + error.message);
      console.error('Error deleting mechanic:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/mechanic/${currentMechanic._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMechanics(
        mechanics.map((m) =>
          m._id === currentMechanic._id ? { ...m, ...formData } : m
        )
      );
      setShowModal(false);
    } catch (error) {
      setError('Error updating mechanic: ' + error.message);
      console.error('Error updating mechanic:', error);
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-4">Mechanics List</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
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
          {mechanics.map((mechanic, index) => (
            <tr key={mechanic._id}>
              <td>{index + 1}</td>
              <td>{mechanic.fullName}</td>
              <td>{mechanic.phoneNumber}</td>
              <td>{mechanic.specialisation}</td>
              <td>
                <Button onClick={() => handleEdit(mechanic)} className="me-2">
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteConfirm(mechanic._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Mechanic Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><font color="black"> Edit Mechanic</font></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                value={formData.specialisation}
                onChange={(e) => setFormData({ ...formData, specialisation: e.target.value })}
              />
            </Form.Group>
            <Button type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Mechanic Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><font color="black">Confirm Deletion</font></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this mechanic?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MechanicList;
