import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Notify } from "notiflix";
import bg_2 from "../assets/bg_2.jpg";  // Add path to your background image
import "../styles/viewrequests.css"

const ViewRequests = () => {
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssignedMechanic();
  }, []);

  const fetchAssignedMechanic = async () => {
    const requestId = localStorage.getItem("requestId");
    if (!requestId) {
      Notify.failure("Request ID not found. Please submit a request first.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/requests/requests/${requestId}/mechanic`);
      console.log("API Response:", response.data); // Debugging
      console.log("Mechanic Data:", response.data.mechanic); // Check if it's an array
  
      if (response.data.success && response.data.mechanic.length > 0) {
        setMechanic(response.data.mechanic[0]); // ✅ Set the first mechanic from the array
      } else {
        console.warn("No mechanic assigned in response");
        setError("No mechanic assigned yet.");
      }
    } catch (error) {
      console.error("Error fetching mechanic:", error);
      setError("Failed to fetch mechanic details.");
      Notify.failure("Failed to load assigned mechanic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section with Background Image and Overlay */}
      <section
        className="hero-wrapview hero-wrapview-2 js-fullheight"
        style={{ backgroundImage: `url(${bg_2})` }}
        data-stellar-background-ratio="0.5"
      >
       
<div className="overlayview d-flex align-items-center justify-content-center">
          <div className="container text-center text-white">
            <h1 className="display-4">Assigned Mechanic</h1>
            <p className="lead">View the mechanic assigned to your request</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <Container className="mt-5 d-flex justify-content-center">
        <div style={{ width: "40%" }}>
          <h3 className="text-center mb-4">Assigned Mechanic</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          ) : mechanic ? (
            <Card className="text-right p-3">
              <Card.Body>
                <Card.Title>{mechanic.fullName}</Card.Title>
                <Card.Text>
                  <strong>Phone:</strong> {mechanic.phoneNumber}
                </Card.Text>
                <Card.Text>
                  <strong>Specialization:</strong> {mechanic.specialisation}
                </Card.Text>
                <Button variant="warning" href={`tel:${mechanic.phoneNumber}`} className="w-100">
                  Call Mechanic
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-center">No mechanic has been assigned yet.</div>
          )}
        </div>
      </Container><br />
    </div>
  );
};

export default ViewRequests;
