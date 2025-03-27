import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImage from '../assets/bg_2.jpg';

const LandingPage = () => {
  return (
    <div>
      <div className="position-absolute top-0 start-0 p-3">
              <Link to="/" className="btn btn-outline-light">Home</Link>
            </div>
    <div className="landing-container">
      
      <div className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
        
        <div className="hero-overlay position-absolute w-100 h-100 top-0 start-0"></div>
        <div className="container text-center text-white position-relative">
          <div className="position-absolute top-0 start-0 p-3">
                  <Link to="/" className="btn btn-outline-light" style={{marginTop:'-350px',marginLeft:'-100px'}}>Home</Link>
                </div>
          <br /><br /><br /><br /><br /><br /><br />
          <h1 className="display-4 fw-bold"><i className="fas fa-car-crash"></i> AUT FIX - Your Roadside Savior</h1>
          <p className="lead">
            Looking for more customers for your garage? Join our platform and connect with car owners in need of immediate repair assistance. 
            We help you expand your reach and grow your business, all while offering quick, reliable, and hassle-free service.
          </p>
          <div className="d-flex justify-content-center mt-4">
            <Link to="/GarageRegistrationForm" className="btn btn-outline-light">
              <i className="fas fa-tools"></i> Register Your Garage Today
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container features-section">
        <h2 className="text-center mb-4 fw-bold">Why Partner with AUT FIX?</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="feature-card">
              <h3><i className="fas fa-tools"></i> Instant Customer Leads</h3>
              <p>Get connected with car owners in need of immediate repair assistance. Increase your customer base within minutes!</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <h3><i className="fas fa-user-shield"></i> Verified & Trusted Platform</h3>
              <p>Our platform is trusted by thousands of car owners. By partnering with AUT FIX, you gain credibility and visibility with verified users.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <h3><i className="fas fa-map-marker-alt"></i> GPS-Based Service</h3>
              <p>Our real-time GPS system ensures that you get service requests from nearby car owners, reducing response time and increasing customer satisfaction.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="container text-center text-white">
          <h2 className="mb-4"><i className="fas fa-star"></i> What Our Partner Garages Say</h2>
          <p className="testimonial-text">
            <i className="fas fa-quote-left"></i> "Joining AUT FIX has helped me grow my customer base and expand my business. 
            The leads I get are high-quality and always in need of urgent repair!" – <strong>Joe's Garage</strong>
          </p>
          <p className="testimonial-text">
            <i className="fas fa-quote-left"></i> "I’ve never had so many clients in a short time. AUT FIX helped me get more work, and my reputation grew through their platform." – <strong>Smith's Auto Repair</strong>
          </p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section text-center">
        <h2 className="fw-bold"><i className="fas fa-road"></i> Join Thousands of Successful Garages</h2>
        <p className="lead">Partner with us and start receiving more customer requests! Grow your business, boost your reputation, and increase your revenue.</p>
        <div className="d-flex justify-content-center mt-4">
          <Link to="/GarageRegister" className="btn btn-warning me-3">
            <i className="fas fa-car"></i> Register Your Garage Now
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
