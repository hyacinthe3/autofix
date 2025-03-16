import React from "react";
import { Link } from "react-router-dom";
import "../styles/AboutUs.css"; // Ensure you have a CSS file for styling
import bg_2 from "../assets/bg_2.jpg"
import aboutfix from "../assets/aboutfix.png"
const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
       <section
        className="hero-wrap hero-wrap-2 js-fullheight"
        style={{ backgroundImage: `url(${bg_2})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlayindex d-flex align-items-center justify-content-center">
          <div className="container text-center text-white">
            <h1 className="display-4">About Us</h1>
            <p className="lead">Connecting Drivers with Mechanics for Emergency Repairs</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={aboutfix} alt="About Us" className="img-fluid rounded shadow" width={400} height={400}/>
          </div>
          <div className="col-md-6">
            <h2 className="mb-4">Who We Are</h2>
            <p>
              Our system is dedicated to helping car drivers connect with trusted mechanics in times of emergency. 
              Whether you're stranded on the road or need a quick repair, we ensure fast and reliable assistance.
            </p>
            <p>
              Our mission is to bridge the gap between drivers and skilled mechanics, providing a seamless, location-based service 
              that enhances road safety and minimizes downtime due to unexpected breakdowns.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Our Key Features</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-white">
                <h4>User Registration</h4>
                <p>Both drivers and mechanics can create accounts to access our services.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-white">
                <h4>Location-Based Matching</h4>
                <p>Get connected with the nearest available mechanic for quick assistance.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-white">
                <h4>Emergency Assistance</h4>
                <p>Instantly request help and get real-time responses from available mechanics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center my-5">
        <h2>Need Assistance?</h2>
        <p>Join our platform today and stay safe on the road!</p>
        {/* <Link to="/register" className="btn btn-primary py-3 px-4">
        Get Started
        </Link> */}
      </section>
    </div>
  );
};

export default AboutUs;
