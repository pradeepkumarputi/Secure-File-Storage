import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic
    console.log('Register form submitted:', formData);
    
    // Navigate to dashboard after successful registration
    navigate('/Login');
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-medium mb-4">Sign up</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name" 
              className="w-full outline-none" 
              required 
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name" 
              className="w-full outline-none" 
              required 
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <input 
              type="text" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
              placeholder="Username" 
              className="w-full outline-none" 
              required 
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              className="w-full outline-none" 
              required 
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
              className="w-full outline-none" 
              required 
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password" 
              className="w-full outline-none" 
              required 
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <input 
              type="text" 
              name="location" 
              value={formData.location}
              onChange={handleChange}
              placeholder="Location" 
              className="w-full outline-none" 
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (Optional)" 
              className="w-full outline-none" 
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Register
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <Link to="/login" className="text-sm text-gray-600 hover:text-blue-500">
          I am already member
        </Link>
      </div>
      
      <div className="mt-6 text-center text-xs text-gray-500">
        © Cloudure - 2025
      </div>
    </div>
  );
};

export default RegisterForm;