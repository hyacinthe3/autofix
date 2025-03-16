import React, { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Notify } from 'notiflix';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa'; // Car icon
import bg_2 from "../assets/bg_2.jpg"
import "../styles/register.css"
const DriverRegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Clear form fields on component mount
  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const { userEmail, userPassword, phoneNumber, Names } = data;

      // Send POST request to backend with the registration data
      await axios.post('http://localhost:5000/register', {
        userEmail,
        userPassword,
        Names,
        phoneNumber,
      });

      Notify.success('Registered successfully');
      reset(); // Clears input fields after submission
      navigate('/LoginForm'); // Redirect to login page after successful registration
    } catch (error) {
      console.log(error);
      Notify.failure('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={6} lg={5} className="mx-auto">
            <Card className="shadow-lg p-4 rounded-4 car-theme-card">
              <Card.Body>
                <h3 className="text-center car-theme-title">
                  <font color="orange">
                  <FaCar className="me-2" /> Driver Registration</font>
                </h3>
                <p className="text-center car-theme-subtitle">
                <font color="gray">  Join our network of skilled drivers today!  </font>
                </p>
                <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  {/* Full Name */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      {...register('Names', { required: true })}
                      isInvalid={!!errors.Names}
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      Full name is required.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      {...register('userEmail', { required: true })}
                      isInvalid={!!errors.userEmail}
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      Email is required.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Phone Number */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      placeholder="Enter your phone number"
                      {...register('phoneNumber', { required: true })}
                      isInvalid={!!errors.phoneNumber}
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      Phone number is required.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Create a secure password"
                      {...register('userPassword', { required: true })}
                      isInvalid={!!errors.userPassword}
                      autoComplete="new-password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Password is required.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Submit Button */}
                  <div className="text-center ">
                    <Button variant="danger" type="submit" className="w-100">
                      Register Now
                    </Button>
                  </div>
                </Form>

                {/* Login Link */}
                <div className="text-center mt-3">
                  <p>
                    Already have an account?{' '}
                    <Link to="/LoginForm" className="text-danger text-decoration-none">
                      Login here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DriverRegistrationForm;
