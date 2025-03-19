import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBars, FaEllipsisH } from "react-icons/fa";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { GiMechanicGarage } from "react-icons/gi";
import { RiFeedbackFill } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboardstyles/sidebar.css";
import MechanicNavbar from "./DashboardNavbar";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [garageNames, setGarageNames] = useState([]);

  useEffect(() => {
    // Retrieve garage names from localStorage (or from API if needed)
    const storedGarageNames = localStorage.getItem("garageNames");
    if (storedGarageNames) {
      setGarageNames(JSON.parse(storedGarageNames));  // Parse and set garage names from storage
    }
  }, []);

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="d-flex">
      <div className={`sidebar bg-dark text-white ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          {!isCollapsed && <h5 className="fw-bold">AUT FIX</h5>}
          <button className="btn btn-outline-light" onClick={handleCollapseToggle}>
            {isCollapsed ? <FaEllipsisH /> : <FaBars />}
          </button>
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
              <IoGitPullRequestSharp className="me-2 fs-5" /> {!isCollapsed && "New Requests"}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/Older-requests" className="nav-link text-white d-flex align-items-center">
              <IoGitPullRequestSharp className="me-2 fs-5" /> {!isCollapsed && "Older Requests"}
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

          <li className="nav-item">
            <Link to="/FeedBack" className="nav-link text-white d-flex align-items-center">
              <RiFeedbackFill className="me-2 fs-5" /> {!isCollapsed && "Ratings & Feedback"}
            </Link>
          </li>
          
          {/* Displaying garage names dynamically */}
          {garageNames.length > 0 && (
            <li className="nav-item">
              <span className="nav-link text-white d-flex align-items-center">
                <GiMechanicGarage className="me-2 fs-5" /> {!isCollapsed && "Registered Garages:"}
              </span>
              <ul className="list-unstyled ps-3">
                {garageNames.map((garage, index) => (
                  <li key={index} className="text-white">
                    {garage}
                  </li>
                ))}
              </ul>
            </li>
          )}

          {/* Customer Support */}
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
