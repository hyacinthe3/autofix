import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChartBar, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Adminstyles/Adminsidebar.css";
import AdminNavbar from './AdminNavbar';
import { IoGitPullRequestSharp } from "react-icons/io5";
import { GiSatelliteCommunication } from "react-icons/gi";
import { RiFeedbackFill } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";
import admin from "../assets/admin.jpg";  
import { LuMessageSquareText } from "react-icons/lu";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="d-flex">
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        {/* Profile Section */}
        <h4><b>AUTO FIX</b></h4>
        <br /><b></b>
        <hr />
        <div className="admin-section">
  <img src={admin } alt="" className="profile-image" />
  {!isCollapsed && <span className="admin-text">ADMIN</span>}
</div>


        <hr />

        <ul className="nav flex-column mt-2">
          {/* Dashboard */}
          <li className="nav-item">
            <Link to="/admin" className="nav-link text-white d-flex align-items-center">
              <FaHome className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Dashboard Overview"}
            </Link>
          </li>

          {/* User Management */}
          <li className="nav-item">
            <a href="#" className="nav-link text-white d-flex align-items-center" onClick={() => toggleSubmenu('user-management')}>
              <GrUserManager className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Garage Management"}
              <span className={`submenu-arrow ms-auto ${activeSubmenu === 'user-management' ? 'open' : ''}`}>
                {activeSubmenu === 'user-management' ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </a>
            <div className={`submenu ${activeSubmenu === 'user-management' ? 'open' : ''} ${isCollapsed ? "collapsed-submenu" : ""}`}>
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


          {/* Reports & Analytics */}
          <li className="nav-item">
            <Link to="/Adminreports" className="nav-link text-white d-flex align-items-center">
              <FaChartBar className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Reports & Analytics"}
            </Link>
          </li>

          {/* Notifications & Alerts */}
          <li className="nav-item">
            <Link to="/Messages" className="nav-link text-white d-flex align-items-center">
            <LuMessageSquareText className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "My Messages"}
            </Link>
          </li>

          {/* Customer Support */}
          <li className="nav-item">
            <Link to="/Adminsupport" className="nav-link text-white d-flex align-items-center">
              <RiFeedbackFill className="me-2" style={{ fontSize: '25px' }} /> {!isCollapsed && "Customer Support"}
            </Link>
          </li>
        </ul>

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

      <div className={`content-container ${isCollapsed ? "expanded" : ""}`}>
        <AdminNavbar isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default AdminSidebar;
