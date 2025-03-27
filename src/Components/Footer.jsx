import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { GiFlatTire } from "react-icons/gi";
import { FaTwitter } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { TiSocialFacebook } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { FaInstagramSquare } from "react-icons/fa";
import "../styles/footer.css";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div>
      <div className="line">
        <h3>
          <center>
            AUT<GiFlatTire className="tire" /> FIX
          </center>
        </h3>
      </div>
      <div className="line2"></div>
      <footer className="ftco-footer ftco-bg-dark ftco-section">
        <div className="container">
          <div className="row mb-5">
            {/* About Section */}
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">About Autoroad</h2>
                <p>
                  Far far away, behind the word mountains, far  where your car
                  break down, there live the expert team.
                </p>
                <ul
                  className="ftco-footer-social list-unstyled float-md-left float-lft mt-5"
                  style={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center' }}
                >                  <li className="ftco-animate">
                    <a href="#">
                      <span className="icon-twitter">
                        <FaTwitter style={{ fontSize: '2rem', color: 'white', transition: 'color 0.3s ease' }} />
                      </span>
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="#">
                      <span className="icon-facebook">
                        <TiSocialFacebook style={{ fontSize: '2rem', color: 'white', transition: 'color 0.3s ease' }} />
                      </span>
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="#">
                      <span className="icon-instagram">
                        <FaInstagramSquare style={{ fontSize: '2rem', color: 'white', transition: 'color 0.3s ease' }} />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Information Section */}
            <div className="col-md">
              <div className="ftco-footer-widget mb-4 ml-md-5">
                <h2 className="ftco-heading-2">Information</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="/" className="py-2 d-block">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="about" className="py-2 d-block">
                    About
                    </a>
                  </li>
                  <li>
                    <a href="request" className="py-2 d-block">
                      Request
                    </a>
                  </li>
                  <li>
                    <a href="contact" className="py-2 d-block">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Customer Support Section */}
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Customer Support</h2>
                <ul className="list-unstyled">
                 
                 
                  <li>
                    <a href="#" className="py-2 d-block">
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      How it Works
                    </a>
                  </li>
                  <li>
                    <a href="contact" className="py-2 d-block">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Have a Question?</h2>
                <div className="block-23 mb-3">
                  {/* <ul>
                    <li> */}
                  <a href="#">
                    <span className="icon icon-phone">
                      <IoCall />
                    </span>
                    <span className="text">+250 785 394 831</span>
                  </a><br />
                  {/* </li>

                    <li> */}
                  <a href="#">
                    <span className="icon icon-envelope">
                      <MdEmail />
                    </span>
                    <span className="text">hyacintheihimbazwe@gmail.com</span>
                  </a>
                  {/* </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="row">
            <div className="col-md-12 text-center">
              <p>
                Copyright &copy; {year} All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
