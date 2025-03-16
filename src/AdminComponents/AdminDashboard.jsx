import React, { useState } from 'react';
import "./Adminstyles/Admindashboard.css"; // Ensure you have the necessary styles for the dashboard
// import AdminCharts from "./AdminCharts.js";

const AdminDashboard = ({ isDarkMode }) => {
  const dashboardItems = [
    { id: 1, title: "Clients", value: "2,500" },
    { id: 2, title: "Earnings", value: "1,200" },
    { id: 3, title: "Requests", value: "$75K" },
  ];

  return (
    <div className={`dash ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <br /><center>
        <h2 style={{ color: isDarkMode ? 'white' : 'lightviolet' }}>Dashboard Overview</h2>
        <p style={{ color: isDarkMode ? 'lightgray' : 'black' }}>View job statistics, earnings, and updates</p>

        <div className="board-container">
          {dashboardItems.map((item) => (
            <div key={item.id} className="board-item">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </center>
      {/* <AdminCharts /> */}
    </div>
  );
};

export default AdminDashboard;
