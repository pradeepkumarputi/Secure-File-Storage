import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    // Handle login logic
    console.log('Login form submitted:', formData);

    // Navigate to the Dashboard page after login
    navigate('/dashboard');
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium">Sign In</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <input 
              type="text" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              className="w-full outline-none" 
              required 
            />
          </div>
        </div>
        
        <div className="mb-6">
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
        
        <div className="text-right mb-4">
          <a href="#" className="text-sm text-gray-600 hover:text-blue-500">Forgot Password?</a>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Log In
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <Link to="/signup" className="text-sm text-gray-600 hover:text-blue-500">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;