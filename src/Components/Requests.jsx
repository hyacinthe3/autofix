import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestForm = () => {
  const [carIssue, setCarIssue] = useState("");
  const [carModel, setCarModel] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState(null);
  const [nearestGarages, setNearestGarages] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  // Get user's live location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            type: "Point",
            coordinates: [position.coords.longitude, position.coords.latitude],
          });
        },
        (error) => {
          setError("Location access denied. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      setError("Failed to get location. Please allow location access.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/requests/send", {
        carIssue,
        carModel,
        location,
        contact,
      });

      if (response.data.success) {
        // ✅ Filter only approved garages
        const approvedGarages = response.data.nearestGarages.filter(
          (garage) => garage.approvalStatus === "approved"
        );
        setNearestGarages(approvedGarages);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error sending request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGarage = async (garageId) => {
    setLoading(true);
    setRequestSent(false);

    try {
      const response = await axios.post("http://localhost:5000/requests/assign", {
        garageId,
        carIssue,
        carModel,
        location,
        contact,
      });

      if (response.data.success) {
        setRequestSent(true);
        setSelectedGarage(garageId);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error assigning request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ width: "50%" }}>
      <br /><br /><br />
      <h2>Request Emergency Assistance</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Car Issue</label>
          <input
            type="text"
            className="form-control"
            value={carIssue}
            onChange={(e) => setCarIssue(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Car Model</label>
          <input
            type="text"
            className="form-control"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contact</label>
          <input
            type="text"
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning btn-lg" disabled={loading}>
          {loading ? "Sending..." : "Request Assistance"}
        </button>
      </form>

      <br />

      {nearestGarages.length > 0 && (
        <div className="mt-4">
          <h4>Nearest Approved Garages</h4>
          <p>Select a garage to send your request:</p>
          <ul className="list-group">
            {nearestGarages.map((garage) => (
              <li key={garage._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{garage.GarageName}</strong>
                  <p>📍 {garage.location.address}</p>
                  <p>📞 {garage.Garagephone}</p>
                  <p>🚗 Distance: {garage.distance.toFixed(2)} km</p>
                </div>
                <button
                  className={`btn btn-${selectedGarage === garage._id ? "success" : "primary"}`}
                  onClick={() => handleSelectGarage(garage._id)}
                  disabled={loading || selectedGarage === garage._id}
                >
                  {selectedGarage === garage._id ? "Request Sent ✅" : "Select & Send Request"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {requestSent && (
        <div className="alert alert-success mt-3">
          Request sent successfully to the selected garage! 🚗🔧
        </div>
      )}
    </div>
  );
};

export default RequestForm;
