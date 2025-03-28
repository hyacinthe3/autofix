import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { IoChevronForwardOutline } from "react-icons/io5";
import "../styles/contact.css";
import bg_2 from "../assets/bg_2.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ success: false, message: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: false, message: "Sending..." });

    try {
      const response = await fetch("http://localhost:5000/contact/createContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ success: true, message: "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ success: false, message: "Error sending message. Try again!" });
      }
    } catch (error) {
      setStatus({ success: false, message: "Server error. Please try again later." });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-wrap hero-wrap-2 js-fullheight"
        style={{ backgroundImage: `url(${bg_2})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlayindex d-flex align-items-end">
          <div className="container">
            <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
              <div className="col-md-9 ftco-animate pb-5">
                <p className="breadcrumbs text-white d-flex align-items-center">
                  <span className="mb-0">
                    <Link to="/" className="nav-link text-orange" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </span>
                  <IoChevronForwardOutline className="mx-2" />
                  <span className="mb-0">
                    <Link to="/contact" className="nav-link text-white" style={{ textDecoration: "none" }}>
                      Contact
                    </Link>
                  </span>
                </p>
                <h1 className="mb-3 bread text-white">Contact Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="ftco-section contact-section py-5">
        <div className="container">
          <div className="row block-9 justify-content-center mb-5">
            <div className="col-md-8 mb-md-5">
              <h2 className="text-center mb-4">
                If you have any questions <br /> please do not hesitate to send us a message
              </h2>
              <form onSubmit={handleSubmit} className="bg-light p-5 contact-form border rounded shadow-lg">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div><br />
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div><br />
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div><br />
                <div className="form-group">
                  <textarea
                    name="message"
                    cols="30"
                    rows="7"
                    className="form-control"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div><br />
                <div className="form-group">
                  <button type="submit" className="btn btn-warning btn-lg">
                    <i className="fas fa-paper-plane"></i> Send Message
                  </button>
                </div>
                {status.message && (
                  <p className={status.success ? "text-success" : "text-danger"}>{status.message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
