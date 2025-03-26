import React from "react";
import "./dashboardstyles/dashboard.css"; // Ensure you have the necessary styles for the dashboard
import Charts from "./Charts.jsx";

const Dashboard = ({ isCollapsed }) => {
  const dashboardItems = [
    { id: 2, title: "Mechanics", value: "2" },
    { id: 3, title: "Requests", value: "3" },
  ];

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
      <center>
        <h2>Dashboard Overview</h2>
        <p>View job statistics, earnings, and updates</p>

        <div className="board-container">
          {dashboardItems.map((item) => (
            <div key={item.id} className="board-item">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </center>
      <br />
      <Charts />
    </div>
  );
};

export default Dashboard;
