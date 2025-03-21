import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Notify } from 'notiflix';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa'; // Car icon
import { Link } from 'react-router-dom'; // Import Link here
const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const { userEmail, userPassword } = data;
            const response = await axios.post(
                'http://localhost:5000/login',
                { userEmail, userPassword },
                { headers: { "Content-Type": "application/json" } }
            );
    
            Notify.success("Logged in successfully");
            reset();
    
            console.log("Full Response Data:", response.data);
            
            const userToken = response.data;
            localStorage.setItem("userToken", JSON.stringify(userToken));
    
            // Store the user's name in localStorage
            const userName = userToken?.user?.Names;
            localStorage.setItem("userName", userName);
    
            // Redirect based on role
            const userRole = userToken?.user?.userRole;
            if (userRole === "admin") {
                navigate("/Dashboard");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.log("Login error:", error.response ? error.response.data : error.message);
            Notify.failure("Login failed. Please check your credentials.");
        }
    };
    

    return (
        <div className="register-page">
            <Container className="d-flex justify-content-center align-items-center vh-100" >
                <Row className="w-100">
                    <Col md={6} lg={5} className="mx-auto">
                        <Card className="shadow-lg p-4 rounded-4 car-theme-card">
                            <Card.Body>
                                <h3 className="text-center car-theme-title">
                                    <FaCar className="me-2" /> Driver Login
                                </h3>
                                <p className="text-center car-theme-subtitle">
                                    Welcome back! Please log in to continue.
                                </p>
                                <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

                                    {/* Email */}
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            {...register('userEmail')}
                                            autoComplete="off"
                                        />
                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            {...register('userPassword')}
                                            autoComplete="new-password"
                                        />
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <div className="text-center">
                                        <Button variant="danger" type="submit" className="w-100">
                                            Login
                                        </Button>
                                    </div>
                                </Form>

                                {/* Registration Link */}
                                <div className="text-center mt-3">
                                    <p>
                                        Don't have an account?{' '}
                                        <Link to="/DriverRegistrationForm" className="text-danger text-decoration-none">
                                            Register here
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

export default LoginForm;
