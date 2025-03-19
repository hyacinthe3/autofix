import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImage from '../assets/bg_2.jpg';

const LandingPage = () => {
  return (
    <div className="landing-container">
     <div className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="hero-overlay position-absolute w-100 h-100 top-0 start-0"></div>
      <div className="container text-center text-white position-relative"><br /><br /><br /><br /><br /><br /><br />
        <h1 className="display-4 fw-bold"><i className="fas fa-car-crash"></i> AUT FIX - Your Roadside Savior</h1>
        <p className="lead">
          Stranded due to a car breakdown? Our platform connects you with professional mechanics nearby <br />
          Get immediate car repair assistance anywhere, anytime! Quick, reliable, and hassle-free.
        </p>
        <div className="d-flex justify-content-center mt-4">
            <Link to="/register" className="btn btn-warning me-3">
              <i className="fas fa-car"></i> Register as Driver
            </Link>
            <Link to="/GarageRegistrationForm" className="btn btn-outline-light">
              <i className="fas fa-tools"></i> Register as Mechanic
            </Link>
          </div>
      </div>
    </div>
      {/* Features Section */}
      <div className="container features-section">
        <h2 className="text-center mb-4 fw-bold">Why Choose AUT FIX?</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="feature-card">
              <h3><i className="fas fa-tools"></i> Instant Repair Assistance</h3>
              <p>Find the nearest available mechanic and get help in **minutes**.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <h3><i className="fas fa-user-shield"></i> Verified & Trusted Mechanics</h3>
              <p>All mechanics are **certified professionals** with a high rating.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <h3><i className="fas fa-map-marker-alt"></i> GPS-Based Service</h3>
              <p>We use **real-time GPS tracking** to match you with the **nearest mechanic**.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="container text-center text-white">
          <h2 className="mb-4"><i className="fas fa-star"></i> What Our Customers Say</h2>
          <p className="testimonial-text">
            <i className="fas fa-quote-left"></i> "I was stranded in the middle of nowhere, but AUT FIX connected me with a mechanic **in just 10 minutes**! 
            Best service ever!" – <strong>Sarah M.</strong>
          </p>
          <p className="testimonial-text">
            <i className="fas fa-quote-left"></i> "Super fast response time! The mechanic arrived **within 15 minutes** and fixed my car on the spot. 
            Highly recommend!" – <strong>James D.</strong>
          </p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section text-center">
        <h2 className="fw-bold"><i className="fas fa-road"></i> Join Thousands of Happy Drivers</h2>
        <p className="lead">Sign up now and never worry about breakdowns again!</p>
        <div className="d-flex justify-content-center mt-4">
            <Link to="/GarageRegistrationForm" className="btn btn-warning me-3">
              <i className="fas fa-car"></i> Register as Driver
            </Link>
            <Link to="/GarageRegister" className="btn btn-warning me-3">
              <i className="fas fa-car"></i> Register as Mechanic
            </Link>
            
          </div>
      </div>
    </div>
  );
};

export default LandingPage;







