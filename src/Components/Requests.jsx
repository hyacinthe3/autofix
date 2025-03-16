import React, { useState } from 'react';
import { IoLocationSharp, IoChevronForwardOutline } from 'react-icons/io5'; 
import "../styles/requests.css";
import { Link } from "react-router-dom";
import bg_2 from "../assets/bg_2.jpg";

const RequestPage = () => {
  const [carIssue, setCarIssue] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [nearbyPeople, setNearbyPeople] = useState([]); // To store nearby people

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Request submitted:', { carIssue, location, contact });

    // Simulate API call to fetch nearby people based on location
    const nearbyPeopleData = await getNearbyPeople(location);

    // Update state with nearby people data
    setNearbyPeople(nearbyPeopleData);
  };

  // Simulate fetching nearby people based on the location
  const getNearbyPeople = async (location) => {
    // In a real app, you'd replace this with an actual API call
    // For now, we'll simulate with some dummy data based on location
    console.log(`Fetching people near ${location}...`);

    // Dummy data based on location
    if (location.toLowerCase().includes("new york")) {
      return [
        { name: 'John Doe', distance: '2 km', phone: '123-456-7890' },
        { name: 'Jane Smith', distance: '3 km', phone: '987-654-3210' },
      ];
    } else if (location.toLowerCase().includes("los angeles")) {
      return [
        { name: 'David Johnson', distance: '1.5 km', phone: '555-111-2222' },
        { name: 'Sara Lee', distance: '4 km', phone: '555-222-3333' },
      ];
    }
    // If no match, return empty array
    return [];
  };

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
                  <span className="mb-0">
                    <Link
                      to="/home"
                      className="nav-link text-orange"
                      style={{ textDecoration: 'none' }}
                    >
                      Home
                    </Link>
                  </span>
                  <IoChevronForwardOutline className="mx-2" />
                  <span className="mb-0">
                    <Link
                      to="/request"
                      className="nav-link text-white"
                      style={{ textDecoration: 'none' }}
                    >
                      Request
                    </Link>
                  </span>
                  <IoChevronForwardOutline className="mx-2" />
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
                onClick={handleLocateMe}
              >
                <IoLocationSharp /> Locate Me
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

      {/* Display nearby people */}
      {nearbyPeople.length > 0 && (
        <div className="mt-5">
          <h3 className="text-center">Nearby People</h3>
          <ul className="list-group">
            {nearbyPeople.map((person, index) => (
              <li key={index} className="list-group-item">
                <strong>{person.name}</strong><br />
                Distance: {person.distance}<br />
                Phone: {person.phone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RequestPage;
