import React, { useState, useEffect } from "react";
import "./dashboardstyles/dashboard.css"; // Ensure you have the necessary styles for the dashboard
import Charts from "./Charts.jsx";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components for the cards

const Dashboard = ({ isCollapsed }) => {
  const [mechanics, setMechanics] = useState([]); // State to store list of mechanics
  const [mechanicCount, setMechanicCount] = useState(0); // State to store mechanic count

  const dashboardItems = [
    { id: 2, title: "Mechanics", value: mechanicCount }, // Use mechanic count here
    { id: 3, title: "Requests", value: "3" },
  ];

  // Fetch mechanic count and list of mechanics
  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    // Fetch mechanic count
    axios
      .get("http://localhost:5000/mechanic/mechanics/count", {
        headers: { Authorization: `Bearer ${token}` }, // Include the token in the request header
      })
      .then((response) => {
        setMechanicCount(response.data.mechanicCount); // Set the mechanic count
      })
      .catch((error) => {
        console.error("Error fetching mechanic count:", error);
      });

    // Fetch list of mechanics
    axios
      .get("http://localhost:5000/mechanic/all", {
        headers: { Authorization: `Bearer ${token}` }, // Include the token in the request header
      })
      .then((response) => {
        setMechanics(response.data); // Set the list of mechanics
      })
      .catch((error) => {
        console.error("Error fetching mechanics:", error);
      });
  }, []); // Run this effect only once when the component mounts

  // Adjust margin-left based on collapsed state
  const contentStyle = {
    marginLeft: isCollapsed ? "80px" : "250px", // Adjust the left margin dynamically
    transition: "margin-left 0.3s ease", // Smooth transition for the margin
    padding: "20px", // Add padding for spacing
    backgroundColor: "#f8f9fa", // Background color for content area
    minHeight: "100vh", // Ensures content area takes up the full screen height
  };

  return (
    <div className="dash" style={contentStyle}>
      <br />
      
        <h2>Dashboard Overview</h2>
        <p>View job statistics, earnings, and updates</p>
        <center>
        <div className="board-container">
          {dashboardItems.map((item) => (
            <div key={item.id} className="board-item">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </center>

      <br /><br /><br />
      <Charts />
      <div  style={{marginRight : '30%'}}>
      
        <h3>My Mechanics</h3>
        <p>Here are the mechanics available:</p>
        <center>
        {/* Add margin-top to create more space between the dashboard cards and the mechanic cards */}
        <Container style={{ marginTop: "40px" }}>
          <Row>
          
            {mechanics.map((mechanic) => (
              <Col key={mechanic._id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{mechanic.fullName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {mechanic.specialisation}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Phone:</strong> {mechanic.phoneNumber}
                    </Card.Text>
                    {/* You can add a button or additional actions here */}
                  </Card.Body>
                </Card>
              </Col>
            ))}
           
          </Row>
        </Container>
      </center>
      </div>
      <br />
     
    </div>
  );
};

export default Dashboard;
