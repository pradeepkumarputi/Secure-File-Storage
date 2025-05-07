import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import AccountInfo from '../components/dashboard/AccountInfo';

const Account = () => {
  // Sample user data
  const user = {
    userId: 'PRADEEP1234',
    firstName: 'Pradeep',
    lastName: 'kumar',
    username: 'pradeepkumar',
    email: 'pradeepkumar@example.com',
    phone: "+91 555- 123-4567",
    location: "India",
    joinDate: "January 15, 2025",
    avatar: "/assets/images/avatar.jpg", // This will only render if the file exists
    storageUsed: 1.2, // GB
    storageLimit: 5, // GB
    plan: "Premium"
  };
  
  // Assume user is logged in
  const isLoggedIn = true;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header isLoggedIn={isLoggedIn} />
      
      <div className="flex flex-1">
        <Navigation />
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
            <p className="text-gray-600">View and manage your account information</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccountInfo user={user} />
            
            <div className="bg-white p-6 rounded-md shadow">
              <h2 className="text-xl font-medium mb-6">Storage Usage</h2>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Used: {user.storageUsed} GB</span>
                  <span>Total: {user.storageLimit} GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(user.storageUsed / user.storageLimit) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-2">Current Plan: <span className="text-blue-500">{user.plan}</span></h3>
                <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
                  Upgrade Plan
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow md:col-span-2">
              <h2 className="text-xl font-medium mb-6">Recent Activity</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2">Activity</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">Login</td>
                      <td className="py-3">May 7, 2025 - 09:45 AM</td>
                      <td className="py-3">192.168.1.1</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">File Upload</td>
                      <td className="py-3">May 6, 2025 - 03:22 PM</td>
                      <td className="py-3">192.168.1.1</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Password Changed</td>
                      <td className="py-3">May 1, 2025 - 11:17 AM</td>
                      <td className="py-3">192.168.1.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account;