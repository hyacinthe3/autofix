import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/requests/all");
        setRequests(response.data);
      } catch (err) {
        setError("Error fetching requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="container mt-5"><br /><br />
      <h2 style={{marginLeft:'40%'}}>Emergency Requests</h2>
<center>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <p>Loading requests...</p> : (
        <table className="table table-bordered mt-3" style={{marginLeft:'0%'}}>
          <thead className="thead-dark">
            <tr>
              {/* <th>Car Issue</th>
              <th>Car Model</th>
              <th>Contact</th> */}
              {/* <th>Location</th> */}
              <th>Assigned Garage</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request._id}>
                  {/* <td>{request.carIssue}</td>
                  <td>{request.carModel}</td>
                  <td>{request.contact}</td> */}
                  {/* <td>
                    📍 {request.location?.coordinates ? request.location.coordinates.join(", ") : "No Location"}
                  </td> */}
                  <td>
                    {request.assignedGarage ? (
                      <>
                        <strong>{request.assignedGarage.GarageName}</strong> <br />
                        📍 {request.assignedGarage.location?.address || "No Address"} <br />
                        📞 {request.assignedGarage.Garagephone}
                      </>
                    ) : (
                      <span className="text-danger">Not Assigned</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}</center>
    </div>
  );
};

export default ViewRequests;
