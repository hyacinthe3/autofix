import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./dashboardstyles/dashboard.css";
import { Button, Modal } from 'react-bootstrap';

const DashboardRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleShowModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
    setAccepted(false);
  };

  return (
    <div className="dash">
      <div><br />
        <center>
          <h2><font color="lightviolet">Service Requests</font></h2>
          <p>Manage incoming repair requests.</p>
        </center>
      </div>

      {/* Table with fetched data */}
      <div className="table-container">
        <table className="table table-bordered table-hover" style={{ width: '80%', margin: 'auto' }}>
          <thead>
            <tr>
              <th>Car Issue</th>
              <th>Car Model</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.carIssue}</td>
                <td>{request.carModel}</td>
                <td>{request.location}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowModal(request)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for showing request details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div>
              <p><strong>Car Issue:</strong> {selectedRequest.carIssue}</p>
              <p><strong>Car Model:</strong> {selectedRequest.carModel}</p>
              <p><strong>Location:</strong> {selectedRequest.location}</p>

              {/* Show Contact Info ONLY IF Accepted */}
              {accepted && (
                <>
                  <hr />
                  <h5>Contact Details:</h5>
                  <p><strong>Contact:</strong> {selectedRequest.contact}</p>
                </>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!accepted ? (
            <>
              <Button variant="success" onClick={() => setAccepted(true)}>Accept</Button>
              <Button variant="danger" onClick={() => setShowModal(false)}>Reject</Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardRequests;
