import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Notify } from "notiflix";

const MessageModal = ({ show, handleClose, senderId, receiverId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return Notify.failure("Message cannot be empty");

    try {
      await axios.post("http://localhost:5000/messages/send", {
        senderId,
        receiverId,
        message,
      });

      Notify.success("Message sent successfully!");
      setMessage("");
      handleClose();
    } catch (error) {
      console.error("Error sending message:", error);
      Notify.failure("Failed to send message.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Send Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={sendMessage}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
