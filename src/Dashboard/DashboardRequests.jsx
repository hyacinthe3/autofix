import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Modal, Alert } from "react-bootstrap";
import { Notify } from "notiflix";

const GarageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const garageId = localStorage.getItem("garageId");
    if (!garageId) {
      Notify.failure("Garage not found. Please log in again.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/requests/garages/${garageId}/requests`);
      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      setError("Failed to fetch requests.");
      Notify.failure("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/mechanic/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMechanics(response.data);
    } catch (error) {
      Notify.failure("Failed to load mechanics.");
    }
  };

  const handleAssignMechanicClick = (request) => {
    setSelectedRequest(request);
    fetchMechanics();
    setShowModal(true);
  };

  const handleSelectMechanic = async (mechanic) => {
    if (!selectedRequest) return;

    try {
      const response = await axios.post("http://localhost:5000/requests/assign-mechanic", {
        requestId: selectedRequest._id,
        mechanicId: mechanic._id,
      });

      if (response.data.success) {
        Notify.success(`Mechanic ${mechanic.fullName} assigned successfully!`);
        setShowModal(false);
      } else {
        Notify.failure(response.data.message);
      }
    } catch (error) {
      Notify.failure("Failed to assign mechanic.");
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Requests Assigned to Your Garage</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center">No requests found.</div>
      ) : (
        <Row>
          {requests.map((request) => (
            <Col key={request._id} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{request.carModel}</Card.Title>
                  <Card.Text>
                    <strong>Car Issue:</strong> {request.carIssue}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong> {request.location.address || "Unknown"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Contact:</strong> {request.contact}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleAssignMechanicClick(request)}>
                    Assign a Mechanic
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal for Selecting a Mechanic */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Mechanic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mechanics.length === 0 ? (
            <p>No mechanics available.</p>
          ) : (
            mechanics.map((mechanic) => (
              <div key={mechanic._id} className="p-2 border rounded mb-2">
                <p className="mb-1"><strong>Full Name:</strong> {mechanic.fullName}</p>
                <p className="mb-1"><strong>Phone Number:</strong> {mechanic.phoneNumber}</p>
                <p className="mb-1"><strong>Specialisation:</strong> {mechanic.specialisation}</p>
                <Button variant="dark" className="w-100" onClick={() => handleSelectMechanic(mechanic)}>
                  Assign Mechanic
                </Button>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GarageRequests;