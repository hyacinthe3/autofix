import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { Notify } from "notiflix";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const GarageRegister = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [certification, setCertification] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    reset();
    getLocation();
  }, [reset]);

  // ✅ Get User Location
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
        console.error("Error getting location:", error);
        Notify.failure("Failed to get location. Please enter manually.");
        setLoadingLocation(false);
      }
    );
  };

  // ✅ Convert Lat/Lon to Address
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const address = response.data.display_name;
      
      // ✅ Store location as JSON string
      const locationData = JSON.stringify({ coordinates: [longitude, latitude], address });
      setValue("location", locationData);
      setLoadingLocation(false);
    } catch (error) {
      console.error("Error fetching address:", error);
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
      console.error(error.response?.data || error.message);
      Notify.failure(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg p-4 rounded-4">
            <Card.Body>
              <h3 className="text-center">Garage Registration</h3>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* ✅ Garage Name */}
                <Form.Group>
                  <Form.Label>Garage Name</Form.Label>
                  <Form.Control type="text" {...register("GarageName", { required: true })} placeholder="Enter Garage Name" />
                </Form.Group>

                {/* ✅ TIN Number */}
                <Form.Group>
                  <Form.Label>Garage TIN Number</Form.Label>
                  <Form.Control type="text" {...register("GaragetinNumber", { required: true })} placeholder="Enter TIN Number" />
                </Form.Group>

                {/* ✅ Password */}
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" {...register("GaragePassword", { required: true })} placeholder="Enter Password" />
                </Form.Group>

                {/* ✅ Phone Number */}
                <Form.Group>
                  <Form.Label>Garage Phone Number</Form.Label>
                  <Form.Control type="text" {...register("Garagephone", { required: true })} placeholder="Enter Phone Number" />
                </Form.Group>

                {/* ✅ Location */}
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" {...register("location")} readOnly />
                  {loadingLocation && <Spinner animation="border" />}
                </Form.Group>

                {/* ✅ Certification Upload */}
                <Form.Group>
                  <Form.Label>Certification (PDF)</Form.Label>
                  <Form.Control
                    type="file"
                    // accept="application/pdf"
                    onChange={(e) => setCertification(e.target.files[0])}
                    required
                  />
                </Form.Group>

                {/* ✅ Submit Button */}
                <Button type="submit" className="mt-3">Register Garage</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GarageRegister;
