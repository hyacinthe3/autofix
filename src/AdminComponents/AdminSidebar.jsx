import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChevronDown, FaChevronUp, FaBars } from "react-icons/fa";
import { GiMechanicGarage } from "react-icons/gi";
import { LuMessageSquareText } from "react-icons/lu";
import admin from "../assets/admin.jpg"; 
import AdminNavbar from './AdminNavbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Adminstyles/Adminsidebar.css";

const AdminSidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
    if (onToggle) onToggle(!isCollapsed);  // Notify parent (AdminDashboard) about collapse state
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        {/* Profile Section */}
        <h4 className="sidebar-title">AUTO FIX</h4>
        <hr />
        <div className="admin-section">
          <img src={admin} alt="Admin" className="profile-image" />
          {!isCollapsed && <span className="admin-text">ADMIN</span>}
        </div>
        <hr />

        <ul className="nav flex-column mt-2">
          {/* Dashboard */}
          <li className="nav-item">
            <Link to="/admin" className="nav-link text-white d-flex align-items-center">
              <FaHome className="me-2" style={{ fontSize: '20px' }} /> 
              {!isCollapsed && "Dashboard Overview"}
            </Link>
          </li>

          {/* Garage Management */}
          <li className="nav-item">
            <a href="#" className="nav-link text-white d-flex align-items-center" onClick={() => toggleSubmenu('garage-management')}>
              <GiMechanicGarage className="me-2" style={{ fontSize: '20px' }} /> 
              {!isCollapsed && "Garage Management"}
              <span className={`submenu-arrow ms-auto ${activeSubmenu === 'garage-management' ? 'open' : ''}`}>
                {activeSubmenu === 'garage-management' ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </a>
            <div className={`submenu ${activeSubmenu === 'garage-management' ? 'open' : ''} ${isCollapsed ? "collapsed-submenu" : ""}`}>
              <ul className="nav flex-column ms-4">
                <li className="nav-item">
                  <Link to="/GarageList" className="nav-link text-white">View Garages</Link>
                </li>
                <li className="nav-item">
                  <Link to="/ApprovedGarages" className="nav-link text-white">Approved Garages</Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Messages */}
          <li className="nav-item">
            <Link to="/Messages" className="nav-link text-white d-flex align-items-center">
              <LuMessageSquareText className="me-2" style={{ fontSize: '20px' }} /> 
              {!isCollapsed && "My Messages"}
            </Link>
          </li>
        </ul>

        {/* Collapse Button */}
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

      {/* Content Area */}
      <div className={`content-container ${isCollapsed ? "expanded" : ""}`}>
        <AdminNavbar isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default AdminSidebar;
