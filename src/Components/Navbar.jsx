import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link, useLocation } from "react-router-dom";
import { GiFlatTire } from "react-icons/gi";
import "../styles/Navbar.css"; // Import the custom CSS file

const Navbar = () => {
  const location = useLocation();

  // Function to add active class
  const getActiveClass = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav
      className="custom-navbar navbar navbar-expand-lg fixed-top"
      style={{
        width: "100%",
        backgroundColor: "white", // Always white
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Keep shadow for design
        padding: "10px 0",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid custom-container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center custom-logo">
          <h2 className="mb-0 text-dark">AUT</h2>
          <GiFlatTire className="mx-1 custom-tire-icon" style={{ fontSize: "2rem", color: "black" }} />
          <h2 className="mb-0 text-dark">FIX</h2>
        </Link>

        <button
          className="navbar-toggler custom-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#customNavMenu"
          aria-controls="customNavMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="customNavMenu">
          <ul className="navbar-nav custom-nav-list d-flex gap-3">
            <li className="nav-item custom-nav-item">
              <Link to="/" className={`nav-link text-dark ${getActiveClass("/home")}`}>Home</Link>
            </li>
            <li className="nav-item custom-nav-item">
              <Link to="/about" className={`nav-link text-dark ${getActiveClass("/about")}`}>About</Link>
            </li>
            <li className="nav-item custom-nav-item">
              <Link to="/request" className={`nav-link text-dark ${getActiveClass("/request")}`}>Request</Link>
            </li>
            <li className="nav-item custom-nav-item">
              <Link to="/contact" className={`nav-link text-dark ${getActiveClass("/contact")}`}>Contact</Link>
            </li>


            <li className="nav-item custom-nav-item">
              <Link to="/ViewRequests" className={`nav-link text-dark ${getActiveClass("/ViewRequests")}`}>ViewRequests</Link>
            </li>

            
            <li className="nav-item custom-nav-item">
              <Link to="/LandingPage" className={`nav-link text-dark ${getActiveClass("/LandingPage")}`}>Landing</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
