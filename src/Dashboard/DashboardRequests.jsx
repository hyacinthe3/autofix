import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment"; // Import moment.js
import { Container, Row, Col, Card, Button, Spinner, Modal, Alert, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Notify } from "notiflix";

const GarageRequests = ({ isCollapsed }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <Container className="mt-5" style={{ marginLeft: "250px" }}>
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
              {/* Wrap the entire card with OverlayTrigger */}
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    Sent: {moment(request.createdAt).format("MMMM Do YYYY, h:mm A")}
                  </Tooltip>
                }
              >
                <Card className="shadow-sm border-light rounded h-100">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{request.carModel}</Card.Title>
                      <Card.Text><strong>Car Issue:</strong> {request.carIssue}</Card.Text>
                      <Card.Text><strong>Location:</strong> {request.location.address || "Unknown"}</Card.Text>
                      <Card.Text><strong>Contact:</strong> {request.contact}</Card.Text>

                      {/* Status */}
                      <Card.Text>
                        <strong>Status:</strong>{" "}
                        <Badge
                          style={{
                            backgroundColor:
                              request.status === "Completed" ? "green" : request.status === "Assigned" ? "orange" : "gray",
                            color: "white",
                          }}
                        >
                          {request.status}
                        </Badge>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GarageRequests;
