import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { Notify } from "notiflix";
import { Link } from "react-router-dom";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if the admin is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Notify.info("You are already logged in.");
      navigate("/admin"); // Redirect to admin dashboard
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/admin/adminlogin", { 
        userEmail: email,       // Use state email
        userPassword: password  // Use state password
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        Notify.success("Login successful!");
        navigate("/admin"); // Redirect to admin dashboard
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      setError(error.response?.data?.message || "Login failed. Try again.");
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
            <h1 style={{ fontSize: "70px" }}>Admin Login</h1>
            <p>Login to manage your admin dashboard.</p>
          </Col>
          <Col md={6} lg={5} className="mx-auto">
            <Card className="shadow-lg p-4 rounded-4 form-card">
              <Card.Body>
                <h3 className="text-center" style={{ color: "orange" }}>ADMIN LOGIN</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin} autoComplete="off">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter admin email"
                      autoComplete="new-password"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;
