import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm'; // Import Registration form component

const Usestatehook = ({ handleLoginForm }) => {
    // State to control visibility of login and registration modals
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

    // Function to toggle login modal visibility
    const handleLoginFormVisibility = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    // Function to toggle registration modal visibility
    const handleRegistrationFormVisibility = () => {
        setIsRegistrationModalOpen(!isRegistrationModalOpen);
    };

    return (
        <>
            {/* Login Form Modal */}
            {isLoginModalOpen && (
                <Modal show={true} onHide={handleLoginFormVisibility} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Login Form */}
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                />
                            </div>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </form>

                        {/* Link to Open Registration Modal */}
                        <div className="mt-3">
                            <p className="text-center">
                                Don't have an account?{' '}
                                <a href="#" onClick={handleRegistrationFormVisibility}>
                                    Create account
                                </a>
                            </p>
                        </div>
                    </Modal.Body>
                </Modal>
            )}

            {/* Registration Form Modal */}
            {isRegistrationModalOpen && (
                <RegistrationForm handleRegistrationFormVisibility={handleRegistrationFormVisibility} />
            )}
        </>
    );
};

export default Usestatehook;
