import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Modal, Alert, Badge } from "react-bootstrap";
import { Notify } from "notiflix";

const GarageRequests = ({ isCollapsed }) => {
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
        fetchRequests(); // Refresh request list
        setShowModal(false);
      } else {
        Notify.failure(response.data.message);
      }
    } catch (error) {
      Notify.failure("Failed to assign mechanic.");
    }
  };

  const handleCompleteRequest = async (requestId) => {
    try {
      const response = await axios.put(`http://localhost:5000/requests/complete/${requestId}`);
      if (response.data.success) {
        Notify.success("Request marked as completed!");
        fetchRequests(); // Refresh the list of requests
      } else {
        Notify.failure("Failed to update request status.");
      }
    } catch (error) {
      Notify.failure("Failed to update request status.");
    }
  };

  return (
    <Container className="mt-5" style={{ transition: "padding 0.3s ease", marginLeft: "250px" }}>
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
            <Col key={request._id} md={isCollapsed ? 6 : 4} lg={isCollapsed ? 4 : 3} className="mb-4">
              <Card className="shadow-sm border-light rounded">
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
                  <Card.Text>
                    <strong>Status:</strong>{" "}
                    <Badge
                      bg={
                        request.status === "Completed"
                          ? "success"
                          : request.status === "Assigned"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {request.status}
                    </Badge>
                  </Card.Text>
                  {request.status !== "Completed" && (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => handleAssignMechanicClick(request)}
                        className="me-2 w-100 mb-2"
                      >
                        Assign a Mechanic
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => handleCompleteRequest(request._id)}
                        className="w-100"
                      >
                        Mark as Completed
                      </Button>
                    </>
                  )}
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
                <Button variant="success" className="w-100" onClick={() => handleSelectMechanic(mechanic)}>
                  Assign Mechanic
                </Button>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GarageRequests;
