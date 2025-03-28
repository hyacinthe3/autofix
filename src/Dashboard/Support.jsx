import React, { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";

const Support = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/contacts/support", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        Notify.success("Your message has been sent! We will get back to you soon.");
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        Notify.failure("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Notify.failure("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="dash mt-4 d-flex justify-content-center">
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center">Mechanic Support</h2>
        <Card className="p-3 mb-4">
          <h4>Frequently Asked Questions</h4>
          <ul>
            <li><strong>How do I check a service request?</strong> - Navigate to 'View Requests' to see requests sent to you, including location and contact info.</li>
            <li><strong>How do I contact the admin?</strong> - Use the support form below or email hyacintheihimbazwe98@gmail.com</li>
          </ul>
        </Card>
        
        <Card className="p-3 mb-4">
          <h4>Contact Admin</h4>
          <p>If you need further assistance, you can reach out to the admin via email or by filling out the form below.</p>
          <p><strong>Email:</strong> hyacintheihimbazwe98@gmail.com</p>
        </Card>
        
        <Card className="p-3">
          <h4>Support Form</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Support;
