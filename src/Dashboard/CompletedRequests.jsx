import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { Notify } from "notiflix";

const CompletedRequests = () => {
  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCompletedRequests();
  }, []);

  const fetchCompletedRequests = async () => {
    const garageId = localStorage.getItem("garageId");
    if (!garageId) {
      Notify.failure("Garage not found. Please log in again.");
      return;
    }
  
    try {
      console.log("Fetching completed requests for garage:", garageId);
  
      const response = await axios.get(`http://localhost:5000/requests/garages/${garageId}/requests/completed`);
      
      console.log("API Response:", response.data);
  
      if (response.data.success) {
        setCompletedRequests(response.data.requests);
      } else {
        console.log("No completed requests found.");
      }
    } catch (error) {
      console.error("Failed to fetch completed requests:", error);
      setError("Failed to fetch completed requests.");
      Notify.failure("Failed to load completed requests.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Completed Requests</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : completedRequests.length === 0 ? (
        <div className="text-center">No completed requests found.</div>
      ) : (
        <Row>
          {completedRequests.map((request) => (
            <Col key={request._id} md={4} lg={3} className="mb-4">
              <Card className="shadow-sm border-light rounded">
                <Card.Body>
                  <Card.Title>{request.carModel}</Card.Title>
                  <Card.Text>
                    <strong>Car Issue:</strong> {request.carIssue}
                  </Card.Text>
                  <Card.Text>
                    <strong>Status:</strong>{" "}
                    <Badge bg="success">
                      {request.status}
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CompletedRequests;
