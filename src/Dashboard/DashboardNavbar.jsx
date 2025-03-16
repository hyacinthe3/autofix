import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboardstyles/sidebar.css";
import "./dashboardstyles/dashboardnavbar.css";
import Settings from "./Settings";
import { Navbar, Form, FormControl, Nav, Badge, Image, Popover, OverlayTrigger, Modal, Button } from "react-bootstrap";
import { FaSearch, FaEnvelope, FaBell } from "react-icons/fa";

const MechanicNavbar = ({ isCollapsed }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

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

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className={`shadow-sm px-3 navbar ${isCollapsed ? "collapsed" : ""}`}>
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
            <OverlayTrigger trigger="click" placement="bottom" overlay={
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
            } show={showMessages}>
              <Badge bg="primary" pill className="position-absolute top-0 start-100 translate-middle">3</Badge>
            </OverlayTrigger>
          </Nav.Link>

          {/* Bell Icon with Notification Popover */}
          <Nav.Link href="#" onClick={handleNotificationToggle} className="position-relative">
            <FaBell size={18} />
            <OverlayTrigger trigger="click" placement="bottom" overlay={
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
            } show={showNotifications}>
              <Badge bg="primary" pill className="position-absolute top-0 start-100 translate-middle">4</Badge>
            </OverlayTrigger>
          </Nav.Link>

          {/* Profile Icon */}
          <OverlayTrigger
            trigger="hover"
            placement="bottom"
            overlay={<Popover><Popover.Body>Click to edit profile</Popover.Body></Popover>}
          >
            <Nav.Link href="#" className="d-flex align-items-center" onClick={handleProfileClick}>
              <Image src="https://via.placeholder.com/30" roundedCircle className="me-2" alt="Profile" />
              {!isCollapsed && <span className="fw-bold">Hizrian</span>}
            </Nav.Link>
          </OverlayTrigger>
        </Nav>
      </Navbar> 

      {/* Profile Edit Modal */}
      <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add Certificates</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseProfileModal} style={{ backgroundColor: "blue", borderColor: "blue" }}>Close</Button>
          <Button variant="primary" style={{ backgroundColor: "blue", borderColor: "blue" }}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <Settings/>
    </>
  );
};

export default MechanicNavbar;
