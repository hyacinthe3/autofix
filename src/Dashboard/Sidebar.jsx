import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaHome, FaTable, FaChartBar, FaLayerGroup, FaFileAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboardstyles/sidebar.css"; // Ensure this file is linked
import MechanicNavbar from './DashboardNavbar'; // Import the MechanicNavbar
import { IoGitPullRequestSharp } from "react-icons/io5";
import { GiSatelliteCommunication } from "react-icons/gi";
import { MdEventAvailable } from "react-icons/md";

import { RiFeedbackFill } from "react-icons/ri";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // Track which submenu is active

  // Function to toggle a specific submenu
  const toggleSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu); // If it's already open, close it; otherwise, open it
  };

  // Function to toggle collapse behavior
  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        {/* Company Name (Top Section) */}
        <div className="company-name text-center">
          {!isCollapsed && <span className="fw-bold text-white">AUT FIX</span>}
        </div>

        {/* Sidebar Menu */} <br />
        <ul className="nav flex-column mt-2">
          {/* Dashboard */}
          <li className="nav-item">
            <Link to="/" className="nav-link text-white d-flex align-items-center">
              <FaHome className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Dashboard Overview"}
            </Link>
          </li>

          {/* Total Requests (Submenu example) */}
          <li className="nav-item">
            <a href="#" className="nav-link text-white d-flex align-items-center" onClick={() => toggleSubmenu('base')}>
            <IoGitPullRequestSharp className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Service Requests"}
              {/* Dropdown arrow aligned to the right */}
              <span className={`submenu-arrow ms-auto ${activeSubmenu === 'base' ? 'open' : ''}`}>
                {activeSubmenu === 'base' ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </a>
            {/* Submenu for Total Requests */}
            <div className={`submenu ${activeSubmenu === 'base' ? 'open' : ''} ${isCollapsed ? "collapsed-submenu" : ""}`}>
              <ul className="nav flex-column ms-4">
                <li className="nav-item">
                  <Link to="/DashboardRequests" className="nav-link text-white">New Requests</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Older-requests" className="nav-link text-white">Older Requests</Link>
                </li>
              </ul>
            </div>
          </li>

          


          {/* Earnings Overview */}
          <li className="nav-item">
            <Link to="/earnings" className="nav-link text-white d-flex align-items-center">
              <FaChartBar className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Earnings Overview"}
            </Link>
          </li>
           {/* Communication */}
           <li className="nav-item">
            <Link to="/Communication" className="nav-link text-white d-flex align-items-center">
            <GiSatelliteCommunication className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Communication"}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/FeedBack" className="nav-link text-white d-flex align-items-center">
              <RiFeedbackFill className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Ratings&Feedback"}
            </Link>
          </li>

         
          <li className="nav-item">
            <Link to="/support" className="nav-link text-white d-flex align-items-center">
              <FaFileAlt className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Support"}
            </Link>
          </li>
        </ul>

        {/* Sidebar Toggle Button on the Right */}
        <button className="btn btn-dark toggle-btn" onClick={handleCollapseToggle}>
          {isCollapsed ? (
            <span className="three-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </span>
          ) : (
            <FaBars />
          )}
        </button>
      </div>

      {/* Content container that holds the MechanicNavbar */}
      <div className={`content-container ${isCollapsed ? "expanded" : ""}`}>
        <MechanicNavbar isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
