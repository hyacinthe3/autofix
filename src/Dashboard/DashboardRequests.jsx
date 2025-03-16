import React, { useState } from 'react';
import "./dashboardstyles/dashboard.css";
import { Button, Modal } from 'react-bootstrap';

const DashboardRequests = () => {
  const requests = [
    { id: 1, name: 'John Doe', carModel: 'Toyota Corolla', description: 'Engine Failure', location: 'Downtown', phone: '123-456-7890', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', carModel: 'Honda Civic', description: 'Flat Tire', location: 'Uptown', phone: '987-654-3210', email: 'janesmith@example.com' },
    { id: 3, name: 'Michael Johnson', carModel: 'Ford Focus', description: 'Battery Dead', location: 'Midtown', phone: '555-789-1234', email: 'michaelj@example.com' },
  ];

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);

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

      {/* Table with reduced width */}
      <div className="table-container">
        <table className="table table-bordered table-hover" style={{ width: '80%', margin: 'auto' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Car Model</th>
              <th>Breakdown Issue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.name}</td>
                <td>{request.carModel}</td>
                <td>{request.description}</td>
                <td>
                  <Button
                    style={{ backgroundColor: 'bluev' }}
                    onClick={() => handleShowModal(request)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for showing full request details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div>
              <p><strong>Name:</strong> {selectedRequest.name}</p>
              <p><strong>Car Model:</strong> {selectedRequest.carModel}</p>
              <p><strong>Breakdown Issue:</strong> {selectedRequest.description}</p>
              <p><strong>Location:</strong> {selectedRequest.location}</p>

              {/* Show Contact Info ONLY IF Accepted */}
              {accepted && (
                <>
                  <hr />
                  <h5>Contact Details:</h5>
                  <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                  <p><strong>Email:</strong> {selectedRequest.email}</p>
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
