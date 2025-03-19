import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "bootstrap/dist/css/bootstrap.min.css";
import { GiMechanicGarage } from "react-icons/gi";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const GarageLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ GaragetinNumber: "", GaragePassword: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'danger'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/garages/login", formData); // Direct API call

      if (response.data.garage) {
        localStorage.setItem("garageToken", response.data.token); // Store token in localStorage

        setMessage("Login successful! Redirecting to dashboard...");
        setMessageType("success");

        setTimeout(() => {
          navigate("/Dashboard");
        }, 3000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Please check your credentials.");
      setMessageType("danger");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">
          <GiMechanicGarage /> Garage Login
        </h2>

        {message && (
          <Alert variant={messageType} className="text-center">
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label">TIN Number</label>
            <input
              type="text"
              name="GaragetinNumber"
              className="form-control"
              placeholder="Enter your TIN number"
              value={formData.GaragetinNumber}
              onChange={handleChange}
              required
              autoComplete="new-password" // Prevent autofill
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="GaragePassword"
              className="form-control"
              placeholder="Enter your password"
              value={formData.GaragePassword}
              onChange={handleChange}
              required
              autoComplete="new-password" // Prevent autofill
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>

        <center>
          Not a member? <Link to="/GarageRegistrationForm">Register</Link>
        </center>
      </div>
    </div>
  );
};

export default GarageLogin;
