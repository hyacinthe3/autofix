import React, { useState, useEffect } from "react";
import ConfirmDialog from "./ConfirmDialog";
import Swal from "sweetalert2"; // Import SweetAlert for success message

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/contact/contacts"); 
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    ConfirmDialog("Delete Message?", "Are you sure you want to delete this message?", "Yes, Delete", "#d33")
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`http://localhost:5000/contact/delete/${id}`, {
              method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete contact");

            setContacts(contacts.filter(contact => contact._id !== id)); // Remove from state
            
            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "Message deleted successfully.",
              icon: "success",
              confirmButtonColor: "#28a745",
            });

          } catch (error) {
            console.error("Error deleting contact:", error);
          }
        }
      });
  };

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dash">
      <h2 style={{ marginLeft: "4%" }}>Contact Submissions</h2><br />
      <table border="1" cellPadding="8" style={{ marginLeft: "4%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <tr key={contact._id || index}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject}</td>
                <td>{contact.message}</td>
                <td>{new Date(contact.createdAt).toLocaleString()}</td>
                <td>
                  <button 
                    onClick={() => deleteContact(contact._id)} 
                    title="Delete"
                    style={{ 
                      background: "none", 
                      color: "white", 
                      border: "none", 
                      padding: "5px 10px", 
                      cursor: "pointer", 
                      borderRadius: "5px" 
                    }}
                  >
                    🗑️ 
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No contacts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
