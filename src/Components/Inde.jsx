import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bg_1 from "../assets/bg_1.jpg";
import "../styles/inde.css"
import bg_2 from "../assets/bg_2.jpg"
import { FaLocationDot } from "react-icons/fa6";
import person_1 from "../assets/person_1.jpg"
import person_2 from "../assets/person_2.jpg"
import person_3 from "../assets/person_3.jpg"
import person_4 from "../assets/person_4.jpg"
import { FaCarCrash } from "react-icons/fa";
import { BsTools } from "react-icons/bs";
import { RiRidingFill } from "react-icons/ri";
// Function to handle the navbar background change on scroll
const handleNavbarScroll = () => {
    const navbar = document.getElementById("ftco-navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};

const Inde = () => {
    useEffect(() => {
        window.addEventListener("scroll", handleNavbarScroll);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("scroll", handleNavbarScroll);
    }, []);

    return (
        <div>
           
            <div
                className="hero-wrap"
                style={{
                    backgroundImage: `url(${bg_1})`,
                    backgroundSize: 'cover',  // Ensure image covers full section
                    backgroundPosition: 'center',  // Center the image
                    height: '100vh'  // Full viewport height
                }}
            >
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text justify-content-start align-items-center">
                        <div className="col-lg-6 col-md-6 ftco-animate d-flex align-items-end">
                            <div className="text">
                                <h1 className="mb-4"><font color="white">Now</font> <span><font color="white">It's easy for you</font></span> <span><font color="white">to get your car repaired</font></span></h1>
                                <p style={{ fontSize: '18px' }}>
                                    {/* <font color="white">A small river named Duden flows by their place and supplies it with the necessary regelialia.</font> */}
                                </p>
                                <a href="https://vimeo.com/45830194" className="icon-wrap popup-vimeo d-flex align-items-center mt-4">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <span className="ion-ios-play"></span>
                                    </div>
                                    <div className="heading-title ml-5">
                                        <span><font color="white">Easy steps for repairing  a car</font></span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2 col"></div>
                        <div className="col-lg-4 col-md-6 mt-0 mt-md-5 d-flex">br
                            
                            <div className="get"><br />
                                <b>Our Reputation Speaks For It’s Self</b><br /><br />
                               

                                We understand that your car is an essential
                                part of your life that’s why we strive to provide
                                <font color="orange"> efficient</font> and <font color="orange">realiable </font>services that will meet
                                your repair needs
                            </div>

                           
                        </div>
                    </div>
                </div>
            </div><br />
            <section className="ftco-section ftco-no-pb ftco-no-pt">
                <center><h3>vehicle information</h3></center><br />
                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="search-wrap-1 ftco-animate mb-5">
                                <form action="#" className="search-property-1">
                                    <div className="row">
                                        <div className="col-lg align-items-end">
                                            <div className="form-group">
                                                <label htmlFor="#">Car Model</label>
                                                
                                            </div>
                                        </div>

                                        <div className="col-lg align-items-end">
                                            <div className="form-group">
                                                <label htmlFor="#">Plate number</label>
                                                
                                            </div>
                                        </div>

                                        <div className="col-lg align-items-end">
                                            <div className="form-group">
                                                <label htmlFor="#">Breakdown Category</label>
                                               
                                            </div>
                                        </div>
                                        <div className="col-lg align-items-end">
                                            <div className="form-group">
                                                <label htmlFor="#">Year Model</label>
                                               
                                            </div>
                                        </div>

                                       

                                        <div className="col-lg align-self-end">
                                        Then   Submit your Request
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="ftco-section services-section ftco-no-pt ftco-no-pb">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 heading-section text-center ftco-animate mb-5">
                            <span className="subheading"><font color="orange">Our Services</font></span>
                            <h2 className="mb-2">Our Services</h2>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services">
                                <div className="media-body py-md-4">
                                    <div className="d-flex mb-3 align-items-center">
                                        <div className="icon"><span className="flaticon-customer-support"></span></div>
                                        <h3 className="heading mb-0 pl-3"><font color="black">24/7 Car Support</font></h3>
                                    </div>
                                    <p><font color="black">any time you car breaks down the mechanic team is ready to give you a</font></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services">
                                <div className="media-body py-md-4">
                                    <div className="d-flex mb-3 align-items-center">
                                        <div className="icon"><span className="flaticon-route"></span></div>
                                        <h3 className="heading mb-0 pl-3"><font color="black">Lots of location</font></h3>
                                    </div>
                                    <p><font color="black">Don't get worried on where you are,the team will be ready to serve you</font></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services">
                                <div className="media-body py-md-4">
                                    <div className="d-flex mb-3 align-items-center">
                                        <div className="icon"><span className="flaticon-online-booking"></span></div>
                                        <h3 className="heading mb-0 pl-3"><font color="black">Repairements</font></h3>
                                    </div>
                                    <p><font color="black">the mechanic team will provide you the quality replacements for your car if you don't have any on  a  fair price</font></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services">
                                <div className="media-body py-md-4">
                                    <div className="d-flex mb-3 align-items-center">
                                        <div className="icon"><span className="flaticon-rent"></span></div>
                                        <h3 className="heading mb-0 pl-3"><font color="black">trust</font></h3>
                                    </div>
                                    <p><font color="black">after a single touch on your car no worries,the problems will be fixed</font></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section
                className="ftco-section services-section img"
                style={{ backgroundImage: `url(${bg_2})` }}
            >
                <div className="overlay"></div> {/* Semi-transparent overlay */}
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-7 text-center heading-section heading-section-white ftco-animate">
                            <span className="subheading" style={{ color: 'orange' }}>Work flow</span>
                            <h2 className="mb-3" style={{ color: 'white' }}>How it works</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services services-2">
                                <div className="media-body py-md-4 text-center">
                                    <div className="icon-circle">
                                        <span className="flaticon-route">
                                            <FaLocationDot /></span>
                                    </div>
                                    <h3 style={{ color: 'white' }}>Send Destination</h3>
                                    <p style={{ color: 'white' }}>A small river named Duden flows by their place and supplies it with you</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services services-2">
                                <div className="media-body py-md-4 text-center">
                                    <div className="icon-circle">
                                        <span className="flaticon-select"><FaCarCrash /></span>
                                    </div>
                                    <h3 style={{ color: 'white' }}>Describe the Terms</h3>
                                    <p style={{ color: 'white' }}>Describe the breakdown problem your car faced and the type of the car</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services services-2">
                                <div className="media-body py-md-4 text-center">
                                    <div className="icon-circle">
                                        <span className="flaticon-rent"><BsTools /></span>
                                    </div>
                                    <h3 style={{ color: 'white' }}>Choose A Mechanic</h3>
                                    <p style={{ color: 'white' }}>choose a mechanic near you and call him or wait patiently for him to call</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services services-2">
                                <div className="media-body py-md-4 text-center">
                                    <div className="icon-circle">
                                        <span className="flaticon-review"><RiRidingFill /></span>
                                    </div>
                                    <h3 style={{ color: 'white' }}>Get your car fixed</h3>
                                    <p style={{ color: 'white' }}>Enjoy the rest of your ride without issues after getting your precious car fixed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section><br />




            <section className="ftco-section testimony-section">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-7 text-center heading-section ftco-animate">
                            <span className="subheading">Testimonial</span>
                            <h2 className="mb-3">Happy Clients</h2>
                        </div>
                    </div>
                    <div className="row ftco-animate">
                        <div className="col-md-12">
                            <div className="carousel-testimony owl-carousel ftco-owl">
                                <div className="item">
                                    <div className="testimony-wrap text-center py-4 pb-5">
                                        <div
                                            className="user-img mb-4"
                                            style={{ backgroundImage: `url(${person_1})` }}
                                        ></div>
                                        <div className="text pt-4">
                                            <p className="mb-4">
                                                Far far away, behind the word mountains, far from the
                                                countries Vokalia and Consonantia, there live the blind
                                                texts.
                                            </p>
                                            <p className="name">Roger Scott</p>
                                            <span className="position">Marketing Manager</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimony-wrap text-center py-4 pb-5">
                                        <div
                                            className="user-img mb-4"
                                            style={{ backgroundImage: `url(${person_2})` }}
                                        ></div>
                                        <div className="text pt-4">
                                            <p className="mb-4">
                                                Far far away, behind the word mountains, far from the
                                                countries Vokalia and Consonantia, there live the blind
                                                texts.
                                            </p>
                                            <p className="name">Roger Scott</p>
                                            <span className="position">Interface Designer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimony-wrap text-center py-4 pb-5">
                                        <div
                                            className="user-img mb-4"
                                            style={{ backgroundImage: `url(${person_3})` }}
                                        ></div>
                                        <div className="text pt-4">
                                            <p className="mb-4">
                                                Far far away, behind the word mountains, far from the
                                                countries Vokalia and Consonantia, there live the blind
                                                texts.
                                            </p>
                                            <p className="name">Roger Scott</p>
                                            <span className="position">UI Designer</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Add more items if needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Inde;
