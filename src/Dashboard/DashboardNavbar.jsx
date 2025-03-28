import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { FaSearch, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Toggle Dark Mode
  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  // Show Logout Confirmation Modal
  const handleShowLogoutModal = () => setShowLogoutModal(true);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("garage");
    navigate("/"); // Redirect to login page
  };

  return (
    <>
    <div className="mynav">
      <Navbar
        bg={isDarkMode ? "dark" : "white"}
        expand="lg"
        className={`shadow-sm px-3 navbar ${isCollapsed ? "collapsed" : ""}`}
        style={{ width: "100%" }}
      >

        {/* Theme Toggle Button */}
        <Button
          variant="link"
          onClick={handleThemeToggle}
          className="text-dark"
          style={{ transition: "transform 0.3s ease" }}
        >
          {isDarkMode ? (
            <FaSun size={24} color="gray" style={{ transform: "rotate(180deg)" }} />
          ) : (
            <FaMoon size={24} style={{ transform: "rotate(0deg)" }} />
          )}
        </Button>

        {/* Logout Button (Only visible if logged in) */}
        {isLoggedIn && (
          <Button
            variant="danger"
            className="ms-2 d-flex align-items-center gap-2"
            onClick={handleShowLogoutModal}
            style={{ transition: "background 0.3s ease" }}
          >
            <FaSignOutAlt /> Logout
          </Button>
        )}
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to log out?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes, Logout
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
};

export default AdminNavbar;
