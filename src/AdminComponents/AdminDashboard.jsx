import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Adminstyles/Admindashboard.css"; // Ensure you have the necessary styles
import "./AdminCharts"

const AdminDashboard = ({ isCollapsed }) => {
  const [totalGarages, setTotalGarages] = useState(0);
  const [approvedGarages, setApprovedGarages] = useState(0);
  const [pendingGarages, setPendingGarages] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/garage/garages")
      .then(response => {
        const garages = response.data;
        setTotalGarages(garages.length);
        setApprovedGarages(garages.filter(garage => garage.approvalStatus === "approved").length);
        setPendingGarages(garages.filter(garage => garage.approvalStatus === "pending").length);
      })
      .catch(error => console.error("Error fetching garages:", error));
  }, []);

  const dashboardItems = [
    { id: 1, title: "Total Garages", value: totalGarages },
    { id: 2, title: "Approved Garages", value: approvedGarages },
    { id: 3, title: "Pending Garages", value: pendingGarages },
  ];

  return (
    <div className={`dash ${isCollapsed ? 'collapsed' : ''}`} style={{width:'83.2%'}}>
      <br />
      <center>
       <p> <h2 style={{ color: isCollapsed ? 'lightgray' : 'lightviolet' ,marginLeft:'1%'}}>Dashboard Overview</h2>
        <p style={{ color: isCollapsed ? 'lightgray' : 'black' }}>View job statistics, earnings, and updates</p></p>

        <div className="board-container">
          {dashboardItems.map((item) => (
            <div key={item.id} className="board-item">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </center>
      {/* <AdminCharts/> */}
    </div>
  );
};

export default AdminDashboard;
