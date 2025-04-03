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
    backgroundColor: "#fff", // Background color for content area
    minHeight: "100vh", // Ensures content area takes up the full screen height
  };

  return (
    // <div className="dash" style={contentStyle}>
      <div className="b">
      <br />
      <h2 className="dashboard-header" style={{ color: "#FF6A00" }}>Dashboard Overview</h2>

      <div className="board-container">
        {dashboardItems.map((item) => (
          <div key={item.id} className="board-item" style={{ height: "10rem", marginTop: "4rem", marginLeft: "rem" }}>
            <h3 className="board-title">{item.title}</h3>
            <p className="board-value">{item.value}</p>
          </div>
        ))}
        <div className="board-conta" style={{ width: "80vh", marginTop: "0rem", marginLeft: "3rem" }}> <h5>Request Statistics</h5 > <Charts /></div>
      </div>


      <div className="mechanic-section" style={{ marginRight: "30%", width: "98%" }}>
        <h3 className="section-header" style={{ color: "#FF6A00" }}>My Mechanics</h3>
        <p className="section-subheader">Here are the mechanics available:</p>
        <table className="custom-table" style={{ backgroundColor: 'white' }}>
          <thead>
            <tr>
              <th>Names</th>
              <th>Phone Number</th>
              <th>Specialisation</th>
            </tr>
          </thead>
          <tbody>
            {mechanics.map((mechanic) => (
              <tr key={mechanic._id}>
                <td>{mechanic.fullName}</td>
                <td> {mechanic.phoneNumber}</td>
                <td>{mechanic.specialisation}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      </div>
    // </div>
  );
};

export default Dashboard;
