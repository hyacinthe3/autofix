import React, { useState } from 'react';
import { IoLocationSharp, IoChevronForwardOutline } from 'react-icons/io5'; // Import React Icons
import "../styles/requests.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import bg_2 from "../assets/bg_2.jpg"

const RequestPage = () => {
  const [carIssue, setCarIssue] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Request submitted:', { carIssue, location, contact });
  };

  // Function to get the user's current location
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          try {
            // Reverse geocoding using OpenStreetMap's Nominatim API
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await response.json();
  
            if (data && data.display_name) {
              setLocation(data.display_name); // Update state with the full address
            } else {
              alert("Could not retrieve your address.");
            }
          } catch (error) {
            alert("Error retrieving location details.");
          }
        },
        (error) => {
          alert("Could not retrieve your location. Please enable geolocation.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  

  return (
    <div className="container mt-5">

      {/* Hero Section with Background Image */}
      <section
  className="hero-wrap2 hero-wrap-2 js-fullheight"
  style={{ backgroundImage: `url(${bg_2})` }}
  data-stellar-background-ratio="0.5"
>
  <div className="overlay2 d-flex align-items-end">
    <div className="container">
      <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
      <div className="col-md-9 ftco-animate pb-5">
  <p className="breadcrumbs text-white d-flex align-items-center mb-0">
    {/* Home Link */}
    <span className="mb-0">
      <Link
        to="/inde"
        className="nav-link text-orange"
        style={{ textDecoration: 'none' }}
      >
        Home
      </Link>
    </span>
    <IoChevronForwardOutline className="mx-2" /> {/* Add margin between icon and text */}

    {/* Request Link */}
    <span className="mb-0">
      <Link
        to="/request"
        className="nav-link text-white"
        style={{ textDecoration: 'none' }}
      >
        Request
      </Link>
    </span>
    <IoChevronForwardOutline className="mx-2" /> {/* Add margin between icon and text */}
  </p>
  <h1 className="mb-3 bread2 text-white">Request</h1>
</div>

      </div>
    </div>
  </div>
</section>

<br /><br />
      <h2 className="text-center mb-4">Request Emergency Assistance</h2>

      {/* Request Form */}
      <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <div className="form-group">

          <textarea
            id="carIssue"
            className="form-control"
            rows="3"
            placeholder="Describe the issue with your car"
            value={carIssue}
            onChange={(e) => setCarIssue(e.target.value)}
            required
          />
        </div><br />

        <div className="form-group">

          <div className="input-group">
            <input
              type="text"
              id="location"
              className="form-control"
              placeholder="Enter your current location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleLocateMe} // Call function on button click
              >
                <IoLocationSharp /> {/* Use React Icon for Location */}
                Locate Me
              </button>
            </div>
          </div>
        </div><br />

        <div className="form-group">

          <input
            type="text"
            id="contact"
            className="form-control"
            placeholder="Your phone number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div><br />

        <div className="form-group text-center">
          <button className="btn btn-warning btn-lg"><i className="fas fa-user-plus"></i> Request Assistance</button>

        </div>
      </form>

    </div>
  );
};

export default RequestPage;
