import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { IoChevronForwardOutline } from "react-icons/io5";
import "../styles/contact.css"
import bg_2 from "../assets/bg_2.jpg"
const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-wrap hero-wrap-2 js-fullheight"
        style={{ backgroundImage:  `url(${bg_2})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay d-flex align-items-end">
          <div className="container">
            <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
            <div className="col-md-9 ftco-animate pb-5">
  <p className="breadcrumbs text-white d-flex align-items-center">
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
    <IoChevronForwardOutline className="mx-2" /> {/* Add some margin between icon and text */}

    {/* Contact Link */}
    <span className="mb-0">
      <Link
        to="/contact"
        className="nav-link text-white"
        style={{ textDecoration: 'none' }}
      >
        Contact
      </Link>
    </span>
    <IoChevronForwardOutline className="mx-2" /> {/* Add some margin between icon and text */}
  </p>
  <h1 className="mb-3 bread text-white">Contact Us</h1>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="ftco-section contact-section py-5">
        <div className="container">
          <div className="row d-flex mb-5 contact-info justify-content-center">
            <div className="col-md-8">
              <div className="row mb-5">
                {/* Address */}
                <div className="col-md-4 text-center py-4">
                  <div className="icon">
                    <span className="icon-map-o"></span>
                  </div>
                  <p className="font-weight-bold">
                    <span>Address:</span><br /> 198 West 21th Street,
                  </p>
                </div>

                {/* Phone */}
                <div className="col-md-4 text-center border-height py-4">
                  <div className="icon">
                    <span className="icon-mobile-phone"></span>
                  </div>
                  <p className="font-weight-bold">
                    <span>Phone:</span><br /> <a href="tel://1234567920">+250 785 394 831</a>
                  </p>
                </div>

                {/* Email */}
                <div className="col-md-4 text-center py-4">
                  <div className="icon">
                    <span className="icon-envelope-o"></span>
                  </div>
                  <p className="font-weight-bold">
                    <span>Email:</span> <a href="mailto:info@yoursite.com">hyacintheihimbazwe98@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message Form Section */}
          <div className="row block-9 justify-content-center mb-5">
            <div className="col-md-8 mb-md-5">
              <h2 className="text-center mb-4">
                If you have any questions <br /> please do not hesitate to send us a message
              </h2>
              <form action="#" className="bg-light p-5 contact-form border rounded shadow-lg">
                <div className="form-group"><br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div><br />
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div><br />
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div><br />
                <div className="form-group">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="7"
                    className="form-control"
                    placeholder="Message"
                    required
                  ></textarea>
                </div><br />
                <div className="form-group">
                <button className="btn btn-warning btn-lg"><i className="fas fa-user-plus"></i> Contact Us</button>
                </div>
              </form>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div id="map" className="bg-white border rounded">
                {/* Embed Google Maps iframe */}
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=..."
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
