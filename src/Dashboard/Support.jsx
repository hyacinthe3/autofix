import React, { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent to the admin.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="dash mt-4 d-flex justify-content-center">
    {/* <Container className="mt-4 d-flex justify-content-center"> */}
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center">Mechanic Support</h2>
        <Card className="p-3 mb-4">
          <h4>Frequently Asked Questions</h4>
          <ul>
            {/* <li><strong>How do I update my profile?</strong> - Go to your dashboard and click on 'Edit Profile'.</li> */}
            <li><strong>How do I check a service request?</strong> - Navigate to 'view Requests' and  you will see requests sent to yoy and the location and contact info.</li>
            <li><strong>How do I contact the admin?</strong> - Use the support form below or email  hyacintheihimbazwe98@gmail.com</li>
          </ul>
        </Card>
        
        <Card className="p-3 mb-4">
          <h4>Contact Admin</h4>
          <p>If you need further assistance, you can reach out to the admin via email or by filling out the form below.</p>
          <p><strong>Email:</strong>  hyacintheihimbazwe98@gmail.com</p>
        </Card>
        
        <Card className="p-3">
          <h4>Support Form</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
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
    {/* </Container> */}
    </div>
  );
};

export default Support;
