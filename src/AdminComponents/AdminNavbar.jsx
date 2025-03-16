import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Adminstyles/Adminsidebar.css";
import "./Adminstyles/Adminnavbar.css";
import { Navbar, Form, FormControl, Nav, Badge, Image, Popover, OverlayTrigger } from "react-bootstrap";
import { FaSearch, FaEnvelope, FaBell, FaLayerGroup } from "react-icons/fa";

const AdminNavbar = ({ isCollapsed }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  // Mock data for notifications and messages
  const notifications = [
    "Your car repair request has been accepted.",
    "New mechanic available near you.",
    "Your service is completed. Ready for pickup.",
  ];

  const messages = [
    { from: "John Doe", message: "Your car service is scheduled for tomorrow." },
    { from: "Jane Smith", message: "Please confirm your vehicle model." },
    { from: "Admin", message: "Your mechanic account is verified." },
  ];

  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMessageToggle = () => {
    setShowMessages(!showMessages);
  };

  // Popover for Notifications
  const notificationPopover = (
    <Popover id="notification-popover" className="notification-popover">
      <Popover.Body>
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <p>{notification}</p>
            </div>
          ))
        )}
      </Popover.Body>
    </Popover>
  );

  // Popover for Messages
  const messagePopover = (
    <Popover id="message-popover" className="message-popover">
      <Popover.Body>
        {messages.length === 0 ? (
          <p>No new messages</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message-item">
              <strong>{msg.from}:</strong> <p>{msg.message}</p>
            </div>
          ))
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg="white" expand="lg" className={`shadow-sm px-3 navbar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Search Input */}
      <Form className={`d-flex me-auto ${isCollapsed ? "collapsed-search" : ""}`}>
        <div className="input-group">
          <span className="input-group-text bg-light">
            <FaSearch />
          </span>
          <FormControl
            type="search"
            placeholder="Search ..."
            className="border-0 bg-light"
          />
        </div>
      </Form>

      {/* Icons & Profile */}
      <Nav className="ms-auto align-items-center">
        {/* Envelope Icon with Message Popover */}
        <Nav.Link href="#" onClick={handleMessageToggle} className="position-relative">
          <FaEnvelope size={18} />
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={messagePopover}
            show={showMessages}
            onHide={() => setShowMessages(false)}
          >
            <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
              3
            </Badge>
          </OverlayTrigger>
        </Nav.Link>

        {/* Bell Icon with Notification Popover */}
        <Nav.Link href="#" onClick={handleNotificationToggle} className="position-relative">
          <FaBell size={18} />
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={notificationPopover}
            show={showNotifications}
            onHide={() => setShowNotifications(false)}
          >
            <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
              4
            </Badge>
          </OverlayTrigger>
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
