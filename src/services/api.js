import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Update if needed

// Fetch all garages
export const fetchGarages = async () => {
  const response = await axios.get(`${API_BASE_URL}/garage`);
  return response.data;
};

// Approve a garage
export const approveGarage = async (garageId) => {
  const response = await axios.patch(`${API_BASE_URL}/garage/${garageId}/approve`);
  return response.data;
};

// Reject a garage
export const rejectGarage = async (garageId) => {
  const response = await axios.patch(`${API_BASE_URL}/garage/${garageId}/reject`);
  return response.data;
};

// Register a new garage
export const registerGarage = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/garage/register`, formData);
  return response.data;
};

// Garage login
export const garageLogin = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/garage/login`, credentials);
  return response.data;
};
