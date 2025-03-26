import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import { Link } from "react-router-dom";

const GarageLogin = () => {
  const [GaragetinNumber, setGaragetinNumber] = useState("");
  const [GaragePassword, setGaragePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Notify.info("You are already logged in.");
      navigate("/Dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/garages/login", {
        GaragetinNumber,
        GaragePassword,
      });

      if (response.data.success) {
        // Store garage details in localStorage
        localStorage.setItem("token", response.data.token); 
        localStorage.setItem("garage", JSON.stringify(response.data.garage));
        localStorage.setItem("garageId", response.data.garage.id); // Store garageId separately

        Notify.success("Login successful!");
        navigate("/Dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        Notify.failure("Invalid TIN Number or Password.");
      } else if (error.response?.status === 403) {
        Notify.failure("Your account is not approved. Contact support.");
      } else {
        Notify.failure(error.response?.data?.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="garage-register-container">
      <div className="overlaygarageregister"></div>
      <div className="position-absolute top-0 start-0 p-3">
              <Link to="/" className="btn btn-outline-light">Home</Link>
            </div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={6} className="welcome-text text-white text-center">
            <h1 style={{ fontSize: "70px" }}>Welcome to AutoFix</h1>
            <p>Login to manage your garage and connect with car owners in need.</p>
          </Col>
          <Col md={6} lg={5} className="mx-auto">
            <Card className="shadow-lg p-4 rounded-4 form-card">
              <Card.Body>
                <h3 className="text-center" style={{ color: "orange" }}>GARAGE LOGIN</h3>
                <Form onSubmit={handleLogin} autoComplete="off">
                  <Form.Group>
                    <Form.Label>TIN Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={GaragetinNumber}
                      onChange={(e) => setGaragetinNumber(e.target.value)}
                      placeholder="Enter TIN Number"
                      autoComplete="new-password"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={GaragePassword}
                      onChange={(e) => setGaragePassword(e.target.value)}
                      placeholder="Enter Password"
                      autoComplete="new-password"
                      required
                    />
                  </Form.Group>

                  <center>
                    <br />
                    <Button type="submit" className="btn btn-warning btn-lg" disabled={loading}>
                      {loading ? <Spinner as="span" animation="border" size="sm" /> : "Login"}
                    </Button>
                  </center>
                </Form>
                <br />
                <center>
                  Not A Member? <Link to="/GarageRegistrationForm">Register Here</Link>
                </center>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GarageLogin;
