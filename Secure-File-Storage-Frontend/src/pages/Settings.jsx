import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import ProfileSettings from '../components/settings/ProfileSettings';
import PasswordChange from '../components/settings/PasswordChange';
import DeleteAccount from '../components/settings/DeleteAccount';

const Settings = () => {
  // Assume user is logged in
  const isLoggedIn = true;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      
      <div className="flex flex-1">
        <Navigation />
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
          
          <div className="space-y-6">
            <ProfileSettings />
            <PasswordChange />
            <DeleteAccount />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;