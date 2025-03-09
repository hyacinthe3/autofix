import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RegistrationForm = ({ handleRegistrationFormVisibility }) => {
    return (
        <Modal show={true} onHide={handleRegistrationFormVisibility} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Registration Form */}
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
                        Create Account
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default RegistrationForm;
