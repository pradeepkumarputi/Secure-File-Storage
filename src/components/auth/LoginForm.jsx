import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, resetPassword } from '../../services/firebase';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await loginUser(formData.email, formData.password);
      // Navigate to the Dashboard page after login
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    try {
      await resetPassword(formData.email);
      setResetEmailSent(true);
      setError('');
    } catch (err) {
      console.error('Password reset error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Invalid password';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later';
      default:
        return 'An error occurred. Please try again';
    }
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium">Sign In</h2>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {resetEmailSent && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Password reset email sent! Check your inbox.
        </div>
      )}
      
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
          <button 
            type="button" 
            onClick={handleForgotPassword} 
            className="text-sm text-gray-600 hover:text-blue-500"
          >
            Forgot Password?
          </button>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-70"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Log In'}
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