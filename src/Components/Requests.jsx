import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestForm = () => {
  const [carIssue, setCarIssue] = useState("");
  const [carModel, setCarModel] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState(null);
  const [nearestGarages, setNearestGarages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        setNearestGarages(response.data.nearestGarages);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error sending request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Request Assistance"}
        </button>
      </form>

      {nearestGarages.length > 0 && (
        <div className="mt-4">
          <h4>Nearest Garages</h4>
          <ul className="list-group">
            {nearestGarages.map((garage) => (
              <li key={garage._id} className="list-group-item">
                <strong>{garage.GarageName}</strong>
                <p>📍 {garage.location.address}</p>
                <p>📞 {garage.Garagephone}</p>
                <p>🚗 Distance: {garage.distance.toFixed(2)} km</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
