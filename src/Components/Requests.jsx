import { useState, useEffect } from "react";
import axios from "axios";
import { FaCar, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    carIssue: "",
    carModel: "",
    contact: "",
    location: {
      type: "Point",
      coordinates: [],
      address: "",
    },
  });

  const [garages, setGarages] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  // Get current location using Geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse Geocode API to get address (Optional, replace with actual API if needed)
        const address = `Lat: ${latitude}, Lng: ${longitude}`;

        setFormData((prev) => ({
          ...prev,
          location: {
            type: "Point",
            coordinates: [longitude, latitude], // MongoDB uses [lng, lat]
            address: address, // Required field in backend
          },
        }));
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch nearby garages
  const fetchGarages = async () => {
    if (!formData.location.coordinates.length) {
      alert("Location not available yet");
      return;
    }
    setLoading(true);
    try {
      console.log("Sending request data:", formData);
      const response = await axios.post("http://localhost:5000/requests/send", formData);
      setGarages(response.data.nearestGarages);
    } catch (error) {
      console.error("Error fetching garages:", error.response?.data || error.message);
    }
    setLoading(false);
  };

  // Send the request to the selected garage
  const sendRequest = async () => {
    if (!selectedGarage) {
      alert("Please select a garage");
      return;
    }
    try {
      await axios.post("http://localhost:5000/requests/assign", {
        ...formData,
        garageId: selectedGarage,
      });
      setConfirmationMessage({
        success: true,
        message: "Request sent successfully! We'll contact you soon.",
      });
    } catch (error) {
      setConfirmationMessage({
        success: false,
        message: `Error sending request: ${error.response?.data || error.message}`,
      });
    }
  };

  return (
    <div className="container mt-5"><br /><br /><br /><br />
      <h2 className="text-center">Car Repair Request</h2>

      {/* Form Wrapper with Grid */}
      <div className="row justify-content-center">
        <div className="col-md-6"> {/* Form is now 50% width on medium and larger screens */}
          {/* Form Inputs */}
          <div className="form-group">
            <label>Car Issue</label>
            <input
              type="text"
              name="carIssue"
              placeholder="Enter the issue with your car"
              value={formData.carIssue}
              onChange={handleChange}
              className="form-control mb-3"
            />
          </div>
          <div className="form-group">
            <label>Car Model</label>
            <input
              type="text"
              name="carModel"
              placeholder="Enter your car model"
              value={formData.carModel}
              onChange={handleChange}
              className="form-control mb-3"
            />
          </div>
          <div className="form-group">
            <label>Contact Information</label>
            <input
              type="text"
              name="contact"
              placeholder="Enter your contact details"
              value={formData.contact}
              onChange={handleChange}
              className="form-control mb-3"
            />
          </div>

          {/* Button to find nearby garages */}
          <button onClick={fetchGarages} className="btn btn-primary w-100 mb-4">
            <FaMapMarkerAlt /> Find Nearby Garages
          </button>

          {/* Loading and Garage List */}
          {loading && <p className="text-center">Loading garages...</p>}
          {garages.length > 0 && (
            <div>
              <h3 className="text-center">Select a Garage</h3>
              <div>
                {garages.map((garage) => (
                  <div key={garage._id} className="mb-4">
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                          <span>{garage.GarageName}</span>
                          <span>{garage.distance.toFixed(2)} km</span>
                        </h5>
                        <p className="card-text">
                          <FaPhoneAlt /> {garage.Garagephone}
                        </p>
                        <div className="d-flex justify-content-between">
                          <button
                            className={`btn ${selectedGarage === garage._id ? "btn-success" : "btn-outline-primary"}`}
                            onClick={() => setSelectedGarage(garage._id)}
                          >
                            Select
                          </button>
                          <span>
                            <FaCar /> {garage.GarageName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={sendRequest} className="btn btn-warning btn-lg">
                <FaCheckCircle /> Send Request
              </button>
            </div>
          )}

          {/* Confirmation Message */}
          {confirmationMessage && (
            <div
              className={`alert mt-4 ${confirmationMessage.success ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {confirmationMessage.success ? <FaCheckCircle /> : <FaExclamationCircle />}{" "}
              {confirmationMessage.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
