import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Adminstyles/Admindashboard.css"; // Ensure you have the necessary styles
import "./AdminCharts"; // Assuming you have the chart component for future use
import Areas from './DashCharts';
const AdminDashboard = ({ isCollapsed }) => {
  const [totalGarages, setTotalGarages] = useState(0);
  const [approvedGarages, setApprovedGarages] = useState(0);
  const [pendingGarages, setPendingGarages] = useState(0);

  useEffect(() => {
    // Fetch the garages data from the API
    axios.get("http://localhost:5000/garages/garages/all")
      .then(response => {
        setTotalGarages(response.data.totalGarages);
        setApprovedGarages(response.data.approvedGarages);
        setPendingGarages(response.data.pendingGarages);
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

        <h2 style={{ color: isCollapsed ? 'lightgray' : 'lightviolet', marginLeft: '1%' }}>Dashboard Overview</h2>
        <p style={{ color: isCollapsed ? 'lightgray' : 'black' }}>View statistics, Garages, and updates</p>

        <br /><br />
        <div className="board-container">
          {dashboardItems.map((item) => (
            <div key={item.id} className="board-item">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </center><br /><br />
      <Areas />
    </div>
  );
};

export default AdminDashboard;
