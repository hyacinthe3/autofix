import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBars, FaEllipsisH } from "react-icons/fa";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { GiMechanicGarage } from "react-icons/gi";
import { RiFeedbackFill } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboardstyles/sidebar.css";
import MechanicNavbar from "./DashboardNavbar";
import axios from "axios";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [garageName, setGarageName] = useState(""); // Store the garage name

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedGarage = JSON.parse(localStorage.getItem("garage"));

    if (storedGarage && storedGarage.GarageName) {
      setGarageName(storedGarage.GarageName); // Use localStorage data if available
    } else if (token && storedGarage) {
      fetchGarageDetails(storedGarage.id, token);
    }
  }, []);

  const fetchGarageDetails = async (garageId, token) => {
    try {
      const response = await axios.get(`http://localhost:5000/garages/${garageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGarageName(response.data.GarageName);
      localStorage.setItem("garage", JSON.stringify(response.data)); // Store in localStorage
    } catch (error) {
      console.error("Error fetching garage details:", error);
    }
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="d-flex">
      <div className={`sidebar bg-dark text-white ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header d-flex flex-column p-3">
          <div className="d-flex justify-content-between align-items-center">
            {!isCollapsed && <h5 className="fw-bold">AUT FIX</h5>}
            <button className="btn btn-outline-light" onClick={handleCollapseToggle}>
              {isCollapsed ? <FaEllipsisH style={{ color: "#343a40" }} /> : <FaBars style={{ color: "#343a40" }} />}
            </button>

          </div>
          <hr className="styled-hr" />


          {/* Display the garage name below "AUT FIX" */}
          {!isCollapsed && garageName && (
            <big className="text-muted">
              <font color="white"> <b>{garageName.toUpperCase()}</b></font>
            </big>
          )}

        </div>

        <hr className="border-light" />
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
              <FaHome className="me-2 fs-5" /> {!isCollapsed && "Dashboard Overview"}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/DashboardRequests" className="nav-link text-white d-flex align-items-center">
              <IoGitPullRequestSharp className="me-2 fs-5" /> {!isCollapsed && "View Requests"}
            </Link>
          </li>


          <li className="nav-item">
            <Link to="/MechanicRegister" className="nav-link text-white d-flex align-items-center">
              <GiMechanicGarage className="me-2 fs-5" /> {!isCollapsed && "Register Mechanic"}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/MechanicList" className="nav-link text-white d-flex align-items-center">
              <GiMechanicGarage className="me-2 fs-5" /> {!isCollapsed && "View Mechanics"}
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link to="/FeedBack" className="nav-link text-white d-flex align-items-center">
              <RiFeedbackFill className="me-2 fs-5" /> {!isCollapsed && "Ratings & Feedback"}
            </Link>
          </li> */}

          <li className="nav-item">
            <Link to="/support" className="nav-link text-white d-flex align-items-center">
              <RiFeedbackFill className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Get Support"}
            </Link>
          </li>
        </ul>
      </div>

      <div className={`content-container ${isCollapsed ? "expanded" : ""}`}>
        <MechanicNavbar isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
