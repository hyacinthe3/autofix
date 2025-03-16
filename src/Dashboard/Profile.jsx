import React from 'react';
import '../styles/profile.css'; // Optional: Add custom styles for the modal

const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Change Your Profile</h3>
        {/* Form to allow user to change profile info */}
        <div>
          <label>Profile Picture:</label>
          <input type="file" />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" />
        </div>
        <div>
          <label>Experience:</label>
          <input type="text" />
        </div>
        <div>
          <label>Certificates:</label>
          <input type="file" />
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;
