import React, { useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaWrench } from 'react-icons/fa';
import { Notify } from 'notiflix';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const MechanicRegister = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  // Clear form fields on component mount
  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const { fullName, phoneNumber, specialisation } = data;

      // Send POST request to backend with the registration data
      await axios.post('http://localhost:5000/mechanic/register', {
        fullName,
        phoneNumber,
        specialisation,
      });

      Notify.success('Registered successfully');
      reset(); // Clears input fields after submission
      navigate('/MechanicList'); // Redirect to view mechanics page after successful registration
    } catch (error) {
      console.error(error);
      Notify.failure('Registration failed. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-150">
      <Row className="w-100" style={{ marginRight: "120px" }}><br />
        <center><br /><h2 className='mechanic'>Register A New Mechanic</h2></center>
        <Col md={8} lg={6} className="mx-auto"><br />
          <Card className="shadow-lg p-4 rounded-4" style={{ backgroundColor: '#f4f4f4' }}>
            <Card.Body>
              <h3 className="text-center text-dark">
                <FaWrench className="me-2" /> Mechanic Registration
              </h3>
              <p className="text-center text-muted">
                Register a new mechanic for your garage.
              </p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Mechanic Full Name */}
                <Form.Group className="mb-3" controlId="formMechanicName">
                  <Form.Label className="text-dark">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Enter mechanic's full name"
                    {...register('fullName', { required: true })}
                    style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                  />
                </Form.Group>

                {/* Phone Number */}
                <Form.Group className="mb-3" controlId="formMechanicPhone">
                  <Form.Label className="text-dark">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter mechanic's phone number"
                    {...register('phoneNumber', { required: true })}
                    style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                  />
                </Form.Group>

                {/* Specialization Select */}
                <Form.Group className="mb-3" controlId="formMechanicSpecialization">
                  <Form.Label className="text-dark">Specialization</Form.Label>
                  <Form.Control
                    as="select"
                    name="specialisation"
                    {...register('specialisation', { required: true })}
                    style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                  >
                    <option value="">Select Specialization</option>
                    <option value="engine">Engine Repair</option>
                    <option value="transmission">Transmission Repair</option>
                    <option value="brakes">Brake Repair</option>
                    <option value="electrical">Electrical Systems</option>
                    <option value="bodywork">Bodywork and Painting</option>
                  </Form.Control>
                </Form.Group>

                {/* Submit Button */}
                <div className="text-center">
                  <Button variant="secondary" type="submit" className="w-100">
                    Register Mechanic
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MechanicRegister;
