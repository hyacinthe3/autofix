import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Usestatehook from './LoginForm';

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Track scroll position

  // Function to handle login modal toggle
  const handleLoginForm = () => {
    setModal(!modal);
  };

  // Adding the scroll effect for background and text color change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true); // Change navbar style after scroll
      } else {
        setScrolled(false); // Reset navbar style when at the top
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Render modal only when modal state is true */}
      {modal && <Usestatehook handleLoginForm={handleLoginForm} />}

      {/* Navbar with scroll effect */}
      <nav
        className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'bg-white text-dark shadow' : 'bg-transparent text-white'}`}
        id="ftco-navbar"
        style={{ transition: 'background-color 0.3s ease, color 0.3s ease' }}
      >
        <div className="container">
          <div className={`nav-link ${scrolled ? 'text-dark' : 'text-white'}`}>Auto<span>Fix</span></div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="oi oi-menu"></span> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/inde" className={`nav-link ${scrolled ? 'text-dark' : 'text-white'}`}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${scrolled ? 'text-dark' : 'text-white'}`}>About</Link>
              </li>
              <li className="nav-item">
                <Link to="/request" className={`nav-link ${scrolled ? 'text-dark' : 'text-white'}`}>Request</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={`nav-link ${scrolled ? 'text-dark' : 'text-white'}`}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/LandingPage" className={`nav-link ${scrolled ? 'text-dark' : 'text-white'}`}>landing</Link>
              </li>
            </ul>
          </div>
          <div className="user">
            <FaUser
              style={{ fontSize: '1.4rem', color: scrolled ? 'black' : 'white', cursor: 'pointer' }}
              onClick={handleLoginForm}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
