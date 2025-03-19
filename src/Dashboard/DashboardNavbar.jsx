import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Form, FormControl, Nav, Badge, OverlayTrigger, Popover } from "react-bootstrap";
import { FaSearch, FaEnvelope, FaBell, FaLayerGroup } from "react-icons/fa";
import axios from "axios";

const AdminNavbar = ({ isCollapsed }) => {
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Handle API errors

  useEffect(() => {
    fetchRecentMessages();
  }, []);

  const fetchRecentMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/contact/contacts");

      // Ensure the response data is an array before setting state
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        setMessages([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to load messages");
      setMessages([]); // Ensure it's an empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  const handleMessageToggle = () => {
    setShowMessages(!showMessages);
  };

  // Popover for Messages (Shows name & subject)
  const messagePopover = (
    <Popover id="message-popover" className="message-popover">
      <Popover.Body>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : messages.length === 0 ? (
          <p>No new messages</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message-item">
              <strong>{msg.name}</strong>: <p>{msg.subject}</p>
            </div>
          ))
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg="white" expand="lg" className={`shadow-sm px-3 navbar ${isCollapsed ? "collapsed" : ""}`} style={{ width: "100%" }}>
      {/* Search Input */}
      <Form className={`d-flex me-auto ${isCollapsed ? "collapsed-search" : ""}`}>
        <div className="input-group">
          <span className="input-group-text bg-light">
            <FaSearch />
          </span>
          <FormControl type="search" placeholder="Search ..." className="border-0 bg-light" />
        </div>
      </Form>

      {/* Icons & Profile */}
      <Nav className="ms-auto align-items-center">
        {/* Envelope Icon with Message Popover */}
        <Nav.Link href="#" onClick={handleMessageToggle} className="position-relative">
          <FaEnvelope size={18} />
          <OverlayTrigger trigger="click" placement="bottom" overlay={messagePopover} show={showMessages}>
            <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
              {messages.length}
            </Badge>
          </OverlayTrigger>
        </Nav.Link>

        {/* Bell Icon */}
        <Nav.Link href="#" className="position-relative">
          <FaBell size={18} />
          <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
            4
          </Badge>
        </Nav.Link>

        {/* Other Icons */}
        <Nav.Link href="#">
          <FaLayerGroup size={18} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminNavbar;
