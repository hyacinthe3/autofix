import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa'; // Settings icon
import './dashboardstyles/settings.css'; // Importing styles
import { FaMoon, FaSun } from 'react-icons/fa'; // Icons for Dark and Light mode
import { HiUserCircle } from "react-icons/hi2";
const Settings = ({ toggleDarkMode, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Set colors for sidebar and navbar
  const [sidebarColor, setSidebarColor] = useState("#343a40"); // Default color
  const [navbarColor, setNavbarColor] = useState("#007bff"); // Default color

  // Change sidebar color and font color
  const changeSidebarColor = (color) => {
    setSidebarColor(color);
    document.documentElement.style.setProperty('--sidebar-bg-color', color);

    // Update font color and hover color based on background color
    const fontColor = getFontColor(color);
    document.documentElement.style.setProperty('--sidebar-font-color', fontColor);
    document.documentElement.style.setProperty('--sidebar-hover-color', fontColor);
  };

  // Change navbar color and font color
  const changeNavbarColor = (color) => {
    setNavbarColor(color);
    document.documentElement.style.setProperty('--navbar-bg-color', color);

    // Update font color and hover color based on background color
    const fontColor = getFontColor(color);
    document.documentElement.style.setProperty('--navbar-font-color', fontColor);
    document.documentElement.style.setProperty('--navbar-hover-color', fontColor);
  };

  // Function to determine font color based on background color
  const getFontColor = (bgColor) => {
    const color = bgColor.startsWith('#') ? bgColor : `#${bgColor}`;
    const rgb = parseInt(color.replace('#', ''), 16); 
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;

    // Using luminance to decide if font color should be dark or light
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128 ? 'black' : 'white';
  };

  const handleIconClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUserIconClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={`settings-container ${isExpanded ? 'expanded' : ''}`}>
      {/* Rotating settings icon */}
      <FaCog
        className={`settings-icon ${isExpanded ? 'expanded' : ''}`}
        onClick={handleIconClick}
      />

      {/* Settings options that expand and collapse */}
      {isExpanded && (
        <div className="settings-options">
          <h5>Settings Options</h5>

          {/* Sidebar Color Options */}
          <p>Sidebar Colors</p>
          <div className="color-options">
            <div className="color-option" onClick={() => changeSidebarColor('#343a40')} style={{ backgroundColor: '#343a40' }}></div>
            <div className="color-option" onClick={() => changeSidebarColor('#007bff')} style={{ backgroundColor: '#007bff' }}></div>
            <div className="color-option" onClick={() => changeSidebarColor('#28a745')} style={{ backgroundColor: '#28a745' }}></div>
            <div className="color-option" onClick={() => changeSidebarColor('#dc3545')} style={{ backgroundColor: '#dc3545' }}></div>
            <div className="color-option" onClick={() => changeSidebarColor('#ffc107')} style={{ backgroundColor: '#ffc107' }}></div>
            <div className="color-option" onClick={() => changeSidebarColor('#ffffff')} style={{ backgroundColor: '#ffffff' }}></div> {/* White color option */}
          </div>
          <div className="settings-container">
      {/* Dark/Light Mode Toggle */}
      <button className="mode-btn" onClick={toggleDarkMode}>
        {isDarkMode ? <FaSun /> : <FaMoon />}
        {isDarkMode ? ' Light Mode' : ' Dark Mode'}
      </button>
    </div>
          {/* Navbar Color Options */}
          <p>Navbar Colors</p>
          <div className="color-options">
            <div className="color-option" onClick={() => changeNavbarColor('#343a40')} style={{ backgroundColor: '#343a40' }}></div>
            <div className="color-option" onClick={() => changeNavbarColor('#007bff')} style={{ backgroundColor: '#007bff' }}></div>
            <div className="color-option" onClick={() => changeNavbarColor('#28a745')} style={{ backgroundColor: '#28a745' }}></div>
            <div className="color-option" onClick={() => changeNavbarColor('#dc3545')} style={{ backgroundColor: '#dc3545' }}></div>
            <div className="color-option" onClick={() => changeNavbarColor('#ffc107')} style={{ backgroundColor: '#ffc107' }}></div>
            <div className="color-option" onClick={() => changeNavbarColor('#ffffff')} style={{ backgroundColor: '#ffffff' }}></div> {/* White color option */}
          </div>

        
          
        </div>
      )}
    </div>
  );
};

export default Settings;
