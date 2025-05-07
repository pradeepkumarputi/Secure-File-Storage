import React, { useState } from 'react';

const DeleteAccount = () => {
  const [confirmText, setConfirmText] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleRequestDelete = () => {
    setShowConfirmation(true);
  };
  
  const handleCancel = () => {
    setShowConfirmation(false);
    setConfirmText('');
  };
  
  const handleConfirmDelete = () => {
    if (confirmText.toLowerCase() === 'delete my account') {
      console.log('Account deletion confirmed');
      // Handle account deletion logic
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow">
      <h2 className="text-xl font-medium mb-2">Delete Account</h2>
      <p className="text-gray-500 mb-6">
        Once your account is deleted, all of your data will be permanently removed.
        This action cannot be undone.
      </p>
      
      {!showConfirmation ? (
        <button 
          onClick={handleRequestDelete}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      ) : (
        <div className="border border-red-200 rounded-md p-4 bg-red-50">
          <p className="text-red-600 font-medium mb-4">
            Are you sure you want to delete your account?
          </p>
          
          <p className="mb-4 text-gray-700">
            Please type <span className="font-mono bg-gray-100 px-1">delete my account</span> to confirm.
          </p>
          
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4"
            placeholder="Type 'delete my account'"
          />
          
          <div className="flex space-x-4">
            <button 
              onClick={handleConfirmDelete}
              disabled={confirmText.toLowerCase() !== 'delete my account'}
              className={`px-4 py-2 rounded text-white ${
                confirmText.toLowerCase() === 'delete my account'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Confirm Delete
            </button>
            
            <button 
              onClick={handleCancel}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;