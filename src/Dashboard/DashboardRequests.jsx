import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardRequests = ({ isGarage, garageId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locations, setLocations] = useState({});
  const [mechanics, setMechanics] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/requests/all");
        setRequests(response.data);

        // Fetch addresses for all requests with coordinates
        response.data.forEach((request) => {
          if (request.location?.coordinates) {
            fetchAddress(request._id, request.location.coordinates);
          }
        });
      } catch (err) {
        setError("Error fetching requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Fetch address using reverse geocoding
  const fetchAddress = async (requestId, coordinates) => {
    let [lon, lat] = coordinates;
    console.log(`Fetching address for request ${requestId}: Lat=${lat}, Lon=${lon}`);

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      setLocations((prev) => ({ ...prev, [requestId]: res.data.display_name }));
    } catch (error) {
      setLocations((prev) => ({ ...prev, [requestId]: "Address not found" }));
    }
  };

  // Fetch list of mechanics for a garage
  const fetchMechanics = async (garageId) => {
    try {
      const response = await axios.get(`http://localhost:5000/garages/${garageId}/mechanics`);
      setMechanics((prev) => ({ ...prev, [garageId]: response.data }));
    } catch (error) {
      console.error("Error fetching mechanics:", error);
    }
  };

  // Assign mechanic to a request
  const handleAssignMechanic = async (requestId, mechanicId) => {
    try {
      const response = await axios.post("http://localhost:5000/requests/assign-mechanic", {
        requestId,
        mechanicId,
      });

      if (response.data.success) {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === requestId ? { ...req, assignedMechanic: response.data.mechanic } : req
          )
        );
      }
    } catch (err) {
      setError("Error assigning mechanic. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isGarage ? "Incoming Service Requests" : "Your Requests"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Car Issue</th>
              <th>Car Model</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Assigned Mechanic</th>
              {isGarage && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.carIssue}</td>
                  <td>{request.carModel}</td>
                  <td>{request.contact}</td>
                  <td>📍 {locations[request._id] || "Fetching address..."}</td>
                  <td>
                    {request.assignedMechanic ? (
                      <strong>{request.assignedMechanic.name}</strong>
                    ) : (
                      <span className="text-danger">Not Assigned</span>
                    )}
                  </td>
                  {isGarage && (
                    <td>
                      {!request.assignedMechanic ? (
                        <div>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => fetchMechanics(garageId)}
                          >
                            Load Mechanics
                          </button>
                          {mechanics[garageId] && mechanics[garageId].length > 0 && (
                            <select
                              className="form-select d-inline w-auto"
                              onChange={(e) => handleAssignMechanic(request._id, e.target.value)}
                            >
                              <option value="">Select Mechanic</option>
                              {mechanics[garageId].map((mechanic) => (
                                <option key={mechanic._id} value={mechanic._id}>
                                  {mechanic.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      ) : (
                        <button className="btn btn-success btn-sm" disabled>
                          Assigned
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardRequests;
