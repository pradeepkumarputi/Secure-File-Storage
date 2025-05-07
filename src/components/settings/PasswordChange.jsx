import React, { useState } from 'react';

const PasswordChange = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear messages when user types
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // Password change logic would go here
    console.log('Password change submitted:', formData);
    
    // Show success message
    setSuccess('Password successfully changed');
    
    // Reset form
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow">
      <h2 className="text-xl font-medium mb-6">Change Password</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;