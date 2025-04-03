import React, { useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaWrench } from 'react-icons/fa';
import { Notify } from 'notiflix';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./dashboardstyles/mechanic.css"; 

const MechanicRegister = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset();

    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [reset]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) {
      Notify.failure('Authentication error. Please log in.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/mechanic/register',
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Notify.success('Mechanic registered successfully!');
      reset();
      navigate('/MechanicList');
    } catch (error) {
      console.error(error.response?.data || error);
      Notify.failure(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Container fluid className="register-container">
      <Row className="align-items-start vh-100">
        <center>
        <Col md={6} lg={4} className="register-card-container">
        <h2 style={{color: "#FF6A00"}}>Register A Mechanic</h2><br />
          <Card className="register-card shadow-lg p-4 rounded-4">
            <Card.Body>
              <h3 className="register-title">
                <FaWrench className="me-2" /> Mechanic Registration
              </h3>
              <p className="text-muted">Register a new mechanic for your garage.</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('fullName', { required: true })}
                    placeholder="Enter full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    {...register('phoneNumber', { required: true })}
                    placeholder="Enter phone number"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Select {...register('specialisation', { required: true })}>
                    <option value="">Select Specialization</option>
                    <option value="engine">Engine Repair</option>
                    <option value="transmission">Transmission Repair</option>
                    <option value="brakes">Brake Repair</option>
                    <option value="electrical">Electrical Systems</option>
                    <option value="bodywork">Bodywork and Painting</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="custom-btn w-100 mt-3">
                  Register Mechanic
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        </center>
      </Row>
    </Container>
  );
};

export default MechanicRegister;
