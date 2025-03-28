import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment"; // ✅ Import moment for date formatting
import {
  Container, Row, Col, Card, Button, Spinner, Modal, Alert, Badge,
  OverlayTrigger, Tooltip
} from "react-bootstrap";
import { Notify } from "notiflix";

const GarageRequests = ({ isCollapsed }) => {
  const [requests, setRequests] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCompleteConfirmation, setShowCompleteConfirmation] = useState(false);
  const [requestToComplete, setRequestToComplete] = useState(null);

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
    fetchMechanics(); // ✅ Fetch mechanics before opening modal
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
        fetchRequests(); // ✅ Refresh requests list
        setShowModal(false);
      } else {
        Notify.failure(response.data.message);
      }
    } catch (error) {
      Notify.failure("Failed to assign mechanic.");
    }
  };

  const handleCompleteRequest = async () => {
    if (!requestToComplete) return;

    try {
      const response = await axios.put(`http://localhost:5000/requests/complete/${requestToComplete._id}`);
      if (response.data.success) {
        Notify.success("Request marked as completed!");
        fetchRequests(); // ✅ Refresh the list of requests
      } else {
        Notify.failure("Failed to update request status.");
      }
    } catch (error) {
      Notify.failure("Failed to update request status.");
    }
    setShowCompleteConfirmation(false);
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
              <Card className="shadow-sm border-light rounded h-100">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Sent: {moment(request.createdAt).format("MMMM Do YYYY, h:mm A")}</Tooltip>}
                >
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{request.carModel}</Card.Title>
                      <Card.Text><strong>Car Issue:</strong> {request.carIssue}</Card.Text>
                      <Card.Text><strong>Location:</strong> {request.location?.address || "Unknown"}</Card.Text>
                      <Card.Text><strong>Contact:</strong> {request.contact}</Card.Text>
                      <Card.Text>
                        <strong>Status:</strong>{" "}
                        <Badge
                          style={{
                            backgroundColor:
                              request.status === "Completed" ? "green" :
                              request.status === "Assigned" ? "orange" : "gray",
                            color: "white",
                          }}
                        >
                          {request.status}
                        </Badge>
                      </Card.Text>
                    </div>
                    {request.status !== "Completed" && (
                      <div>
                        <Button
                          style={{ backgroundColor: "white", border: "2px solid orange", color: "orange" }}
                          onClick={() => handleAssignMechanicClick(request)}
                          className="me-2 w-100 mb-2"
                        >
                          Assign a Mechanic
                        </Button>
                        <Button
                          style={{ backgroundColor: "white", border: "2px solid green", color: "green" }}
                          onClick={() => {
                            setRequestToComplete(request);
                            setShowCompleteConfirmation(true);
                          }}
                          className="w-100"
                        >
                          Mark as Completed
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </OverlayTrigger>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal for assigning mechanic */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><font color="black">Select a Mechanic </font></Modal.Title>
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

      {/* Confirmation Modal */}
      <Modal show={showCompleteConfirmation} onHide={() => setShowCompleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title><font color="black"> Confirm Completion</font></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to mark this request as completed?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCompleteConfirmation(false)}>Cancel</Button>
          <Button variant="success" onClick={handleCompleteRequest}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GarageRequests;
