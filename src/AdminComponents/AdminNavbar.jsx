import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Form, FormControl, OverlayTrigger, Popover, Button, FormCheck } from "react-bootstrap";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import axios from "axios";

const AdminNavbar = ({ isCollapsed }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch settings from backend
  const fetchAdminSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/admin/settings");
      setSettings(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching admin settings:", error);
      setError("Failed to load settings");
      setSettings(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdminSettings();
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  // Toggle Dark Mode
  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  const settingsPopover = (
    <Popover id="settings-popover">
      <Popover.Body>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div>
            <h6>Admin Settings</h6>
            {settings && (
              <>
                <p><strong>Name:</strong> {settings.adminName}</p>
                <p><strong>Email:</strong> {settings.email}</p>
                <p><strong>Role:</strong> {settings.role}</p>
              </>
            )}
            <hr />
            {/* Theme Toggle */}
            <FormCheck 
              type="switch"
              id="theme-switch"
              label={isDarkMode ? "Dark Mode" : "Light Mode"}
              checked={isDarkMode}
              onChange={handleThemeToggle}
            />
          </div>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg={isDarkMode ? "dark" : "white"} expand="lg" className={`shadow-sm px-3 navbar ${isCollapsed ? "collapsed" : ""}`} style={{ width: "100%" }}>
      {/* Search Input */}
      <Form className={`d-flex me-auto ${isCollapsed ? "collapsed-search" : ""}`}>
        <div className="input-group">
          <span className="input-group-text bg-light">
            <FaSearch />
          </span>
          <FormControl type="search" placeholder="Search ..." className="border-0 bg-light" />
        </div>
      </Form>

      {/* Theme Toggle Button */}
      <Button variant="link" onClick={handleThemeToggle} className="text-dark">
        {isDarkMode ? <FaSun size={24} color="yellow" /> : <FaMoon size={24} />}
      </Button>
    </Navbar>
  );
};

export default AdminNavbar;
