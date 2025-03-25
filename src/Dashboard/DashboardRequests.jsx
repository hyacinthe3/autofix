import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Notify } from "notiflix";

const GarageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      const garageId = localStorage.getItem("garageId");
  
      if (!garageId) {
        Notify.failure("Garage not found. Please log in again.");
        setError("Garage ID not found. Please log in.");
        setLoading(false);
        return;
      }
  
      console.log("Fetching requests for garage ID:", garageId); // Debugging: Ensure garageId is correct
  
      try {
        const response = await axios.get(`http://localhost:5000/requests/garages/${garageId}/requests`);
        
        if (response.data.success) {
          console.log("Requests received:", response.data.requests); // Debugging: Log the received requests
          setRequests(response.data.requests);
        } else {
          throw new Error(response.data.message || "Failed to fetch requests");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Failed to fetch requests.");
        Notify.failure("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRequests();
  }, []);

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Requests Assigned to Your Garage</h3>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
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
                    <strong>Location:</strong> {request.location?.address || "Address not available"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Contact:</strong> {request.contact}
                  </Card.Text>
                  <Button variant="primary" onClick={() => alert(`Viewing details for request ${request._id}`)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GarageRequests;
