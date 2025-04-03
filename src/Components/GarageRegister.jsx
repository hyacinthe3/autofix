import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { Notify } from "notiflix";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";

const GarageRegister = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [certification, setCertification] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    reset();
    getLocation();
  }, [reset]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      Notify.failure("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await getAddressFromCoordinates(latitude, longitude);
      },
      (error) => {
        Notify.failure("Failed to get location. Please enter manually.");
        setLoadingLocation(false);
      }
    );
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const address = response.data.display_name;
      setValue("location", JSON.stringify({ coordinates: [longitude, latitude], address }));
      setLoadingLocation(false);
    } catch {
      Notify.failure("Failed to retrieve address.");
      setLoadingLocation(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("GarageName", data.GarageName);
      formData.append("GaragetinNumber", data.GaragetinNumber);
      formData.append("GaragePassword", data.GaragePassword);
      formData.append("location", data.location);
      formData.append("Garagephone", data.Garagephone);
      formData.append("certification", certification);

      await axios.post("http://localhost:5000/garages/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Notify.success("Garage registered successfully! Pending approval.");
      reset();
      navigate("/GarageLogin");
    } catch (error) {
      Notify.failure(error.response?.data?.message || "Registration failed.");
    }
  };

  // Regex for Rwanda phone number validation
  const phoneRegex = /^(?:\+2507\d{8}|07\d{8})$/;

  return (
    <div className="garage-register-container">
      <div className="overlaygarageregister"></div>
      <div className="position-absolute top-0 start-0 p-3">
        <Link to="/" className="btn btn-outline-light">Home</Link>
      </div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={6} className="welcome-text text-white text-center">
            <h1 style={{fontSize:'70px',marginTop:'200px'}}>Welcome To AutoFix</h1>
            <p>Register your garage and join our network of trusted car repair professionals.</p>
            
          </Col>
          
          <Col md={6} lg={5} className="mx-auto">
            <Card className="shadow-lg p-4 rounded-4 form-card">
              <Card.Body>
                <h3 className="text-center" style={{color:'orange'}}>Garage Registration</h3>
                <p><IoIosWarning /> You must register your garage at the location where it is situated</p>
                <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <Form.Group>
                    <Form.Label>Garage Name</Form.Label>
                    <Form.Control type="text" {...register("GarageName", { required: "Garage Name is required" })} placeholder="Enter Garage Name" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Garage TIN Number</Form.Label>
                    <Form.Control 
                      type="text"
                      {...register("GaragetinNumber", {
                        required: "TIN Number is required",
                        pattern: {
                          value: /^(10|11|12|13)\d{7}$/,
                          message: "TIN Number must be 9 digits, starting with 10, 11, 12, or 13."
                        }
                      })}
                      placeholder="Enter TIN Number" 
                      autoComplete="new-password"
                    />
                    {errors.GaragetinNumber && <small className="text-danger">{errors.GaragetinNumber.message}</small>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      {...register("GaragePassword", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                          message: "Password must be 8+ characters with uppercase, lowercase, number, and symbol."
                        }
                      })} 
                      placeholder="Enter Password" 
                      autoComplete="new-password"
                    />
                    {errors.GaragePassword && <small className="text-danger">{errors.GaragePassword.message}</small>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Garage Phone Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      {...register("Garagephone", { 
                        required: "Phone number is required", 
                        pattern: {
                          value: phoneRegex,
                          message: "Please enter a valid phone number (e.g., +250XXXXXXXX or 07XXXXXXXX)"
                        }
                      })} 
                      placeholder="Enter Phone Number" 
                    />
                    {errors.Garagephone && <small className="text-danger">{errors.Garagephone.message}</small>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" {...register("location")} readOnly />
                    {loadingLocation && <Spinner animation="border" />}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Certification </Form.Label>
                    <Form.Control type="file" onChange={(e) => setCertification(e.target.files[0])} required />
                  </Form.Group>
                  <br />
                  <center><Button type="submit" className="btn btn-warning btn-lg">Register Garage</Button></center>
                </Form>
                <center>Already a member? <Link to="/GarageLogin">Login Here</Link></center>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GarageRegister;
