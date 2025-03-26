import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Adminstyles/Admindashboard.css"; // Ensure you have the necessary styles
import "./AdminCharts"; // Assuming you have the chart component for future use

const AdminDashboard = ({ isCollapsed }) => {
  const [totalGarages, setTotalGarages] = useState(0);
  const [approvedGarages, setApprovedGarages] = useState(0);
  const [pendingGarages, setPendingGarages] = useState(0);

  useEffect(() => {
    // Fetch the garages data from the API
    axios.get("http://localhost:5000/garage/garages")
      .then(response => {
        const garages = response.data;

        // Count total garages, approved, and pending
        setTotalGarages(garages.length);
        setApprovedGarages(garages.filter(garage => garage.approvalStatus === "approved").length);
        setPendingGarages(garages.filter(garage => garage.approvalStatus === "pending").length);
      })
      .catch(error => {
        console.error("Error fetching garages:", error);
        // Handle error if necessary, for example, showing a notification
      });
  }, []);

  const dashboardItems = [
    { id: 1, title: "Total Garages", value: totalGarages },
    { id: 2, title: "Approved Garages", value: approvedGarages },
    { id: 3, title: "Pending Garages", value: pendingGarages },
  ];

  return (
    <div className={`dash ${isCollapsed ? 'collapsed' : ''}`} style={{ width: '83.2%' }}>
      <br />
      <center>
        <p>
          <h2 style={{ color: isCollapsed ? 'lightgray' : 'lightviolet', marginLeft: '1%' }}>Dashboard Overview</h2>
          <p style={{ color: isCollapsed ? 'lightgray' : 'black' }}>View statistics, Garages, and updates</p>
        </p>

        <div className="board-container">
          {dashboardItems.map((item) => (
            <div key={item.id} className="board-item">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </center>
      {/* <AdminCharts/> */} {/* You can uncomment this if you add charts later */}
    </div>
  );
};

export default AdminDashboard;
