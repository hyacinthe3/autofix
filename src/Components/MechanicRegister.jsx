import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Notify } from 'notiflix';
import { Card } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa'; // Car icon
import '../styles/register.css';
import { Link } from 'react-router-dom'; // Import Link here


const MechanicRegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      const { MechanicNames, MechanicEmail, MechanicPassword, MechanicphoneNumber, location, specialisation, certification } = data;
      const formData = new FormData();
      formData.append('MechanicNames', MechanicNames);
      formData.append('MechanicEmail', MechanicEmail);
      formData.append('MechanicPassword', MechanicPassword);
      formData.append('MechanicphoneNumber', MechanicphoneNumber);
      formData.append('location', location);
      formData.append('specialisation', specialisation);
      formData.append('certification', certification[0]);

      const Response = await axios.post('http://localhost:5000/mechanic/registerMechanic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (Response.status === 201) {
        Notify.success('Registration successful!');
        navigate('/MechanicLoginForm');
      }
      else {
        Notify.failure('Registration failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
      Notify.failure('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="container p-4" style={{ maxWidth: '600px' }}>
        <Card className="shadow-lg p-4 rounded-4 car-theme-card">
          <Card.Body>
            <h3 className="text-center text-warning">
              <b><FaCar className="me-2" /> Mechanic Registration</b>
            </h3>
            <p className="text-center text-muted">Register to find customers easily</p>
            <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data" >
              <div className="d-flex flex-column align-items-center">

                {/* Full Name */}
                <div className="mb-3 w-100">
                  <input
                    type="text"
                    className={`form-control ${errors.Names ? 'is-invalid' : ''}`}
                    placeholder="Enter your full name"
                    name='MechanicNames'
                    {...register('MechanicNames', { required: 'Full name is required' })}
                  />
                  <div className="invalid-feedback">{errors.Names?.message}</div>
                </div>

                {/* Email */}
                <div className="mb-3 w-100">
                  <input
                    type="email"
                    className={`form-control ${errors.MechanicEmail ? 'is-invalid' : ''}`}
                    placeholder="Enter your email"
                    name='MechanicEmail'
                    {...register('MechanicEmail', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email format',
                      },
                    })}
                  />
                  <div className="invalid-feedback">{errors.MechanicEmail?.message}</div>
                </div>

                {/* Phone Number */}
                <div className="mb-3 w-100">
                  <input
                    type="tel"
                    className={`form-control ${errors.MechanicphoneNumber ? 'is-invalid' : ''}`}
                    placeholder="Enter your phone number"
                    name='MechanicphoneNumber'
                    {...register('MechanicphoneNumber', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: 'Invalid phone number',
                      },
                    })}
                  />
                  <div className="invalid-feedback">{errors.MechanicphoneNumber?.message}</div>
                </div>

                {/* Password */}
                <div className="mb-3 w-100">
                  <input
                    type="password"
                    className={`form-control ${errors.MechanicPassword ? 'is-invalid' : ''}`}
                    placeholder="Enter your password"
                    name='MechanicPassword'
                    {...register('MechanicPassword', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    })}
                  />
                  <div className="invalid-feedback">{errors.MechanicPassword?.message}</div>
                </div>

                {/* Location */}
                <div className="mb-3 w-100">
                  <input
                    type="url"
                    id="location"
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                    placeholder="Paste Google Maps location URL"
                    name='location'
                    {...register('location', {
                      required: 'Location is required',
                      pattern: {
                        value: /^https:\/\/www\.google\.com\/maps\/(.*)/,
                        message: 'Enter a valid Google Maps URL',
                      },
                    })}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </div>

                {/* Specialization */}
                <div className="mb-3 w-100">
                  <select
                    className={`form-control ${errors.specialisation ? 'is-invalid' : ''}`}
                    name='specialisation'
                    {...register('specialisation', { required: 'Please select your specialization' })}
                  >
                    <option value="">Choose your specialization</option>
                    <option value="engine_repair">Engine Repair</option>
                    <option value="brake_system">Brake System</option>
                    <option value="electrical_system">Electrical System</option>
                    <option value="transmission">Transmission</option>
                    <option value="tire_service">Tire Service</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.specialisation && 'Please select your specialization.'}
                  </div>
                </div>

                {/* Certification Upload */}
                <div className="mb-3 w-100">
                  <label className="form-label">Upload Certification</label>
                  <input
                    type="file"
                    name='certification'
                    className={`form-control ${errors.certification ? 'is-invalid' : ''}`}
                    accept="image/*, application/pdf"
                    {...register('certification', { required: 'Certification is required' })}
                  />
                  <div className="invalid-feedback">{errors.certification?.message}</div>
                </div>

                {/* Submit Button */}
                <div className="mb-3 w-100 text-center">
                  <button type="submit" className="btn btn-danger w-100">
                    Register Now
                  </button>
                </div>

                
              </div>
              
            </form>
            <div className="text-center mt-3">
                  <p>
                    Arleady have an account?{' '}
                    <Link to="/MechanicLoginForm" className="text-danger text-decoration-none">
                      Login here
                    </Link>
                  </p>
                </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default MechanicRegistrationForm;
