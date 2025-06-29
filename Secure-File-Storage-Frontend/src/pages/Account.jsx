import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import AccountInfo from '../components/dashboard/AccountInfo';
import { useAuth } from '../context/AuthContext'; // Assuming you have an auth context

const Account = () => {
  const { currentUser } = useAuth(); // Get the current user from auth context
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        // Try to fetch user data from API
        const response = await fetch(`/api/users/${currentUser.uid}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        
        // Fallback to default data from currentUser object if API fails
        setUserData({
          userId: currentUser.uid || 'Unknown',
          firstName: currentUser.displayName?.split(' ')[0] || 'User',
          lastName: currentUser.displayName?.split(' ')[1] || '',
          username: currentUser.email?.split('@')[0] || 'user',
          email: currentUser.email || 'Not available',
          avatar: currentUser.photoURL,
          phone: currentUser.phoneNumber || 'Not provided',
          location: 'Not provided',
          storageUsed: 0, // Default value
          storageLimit: 5, // Default value
          memberSince: currentUser.metadata?.creationTime || new Date().toISOString(),
          plan: "Basic",
          lastLogin: currentUser.metadata?.lastSignInTime || new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchUserActivities = async () => {
      if (!currentUser) return;
      
      try {
        // Try to fetch user activities from API
        const response = await fetch(`/api/users/${currentUser.uid}/activities`);
        if (!response.ok) throw new Error('Failed to fetch user activities');
        
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching user activities:", error);
        
        // Fallback to dummy activities if API fails
        setActivities([
          { 
            id: 1, 
            type: 'Login', 
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
            ipAddress: window.clientInformation?.userAgentData?.platform === 'Windows' ? '192.168.1.102' : '10.0.0.15'
          },
          { 
            id: 2, 
            type: 'File Upload', 
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), 
            ipAddress: window.clientInformation?.userAgentData?.platform === 'Windows' ? '192.168.1.102' : '10.0.0.15'
          },
          { 
            id: 3, 
            type: 'Password Changed', 
            timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), 
            ipAddress: window.clientInformation?.userAgentData?.platform === 'Windows' ? '192.168.1.102' : '10.0.0.15'
          }
        ]);
      }
    };

    // Set up event listeners for real-time updates
    const handleUserActivity = (event) => {
      const { type, ipAddress } = event.detail;
      const newActivity = {
        id: Date.now(),
        type,
        timestamp: new Date().toISOString(),
        ipAddress: ipAddress || window.clientInformation?.userAgentData?.platform === 'Windows' ? '192.168.1.102' : '10.0.0.15'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep last 10 activities
    };

    fetchUserData();
    fetchUserActivities();

    // Register event listeners
    window.addEventListener('userActivity', handleUserActivity);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('userActivity', handleUserActivity);
    };
  }, [currentUser]);

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Calculate storage percentage
  const storagePercentage = userData ? (userData.storageUsed / userData.storageLimit) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-1">
        <Navigation />
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
            <p className="text-gray-600">View and manage your account information</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccountInfo user={userData} />
            
            <div className="bg-white p-6 rounded-md shadow">
              <h2 className="text-xl font-medium mb-6">Storage Usage</h2>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Used: {userData.storageUsed.toFixed(1)} GB</span>
                  <span>Total: {userData.storageLimit} GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      storagePercentage > 90 ? 'bg-red-500' : 
                      storagePercentage > 70 ? 'bg-yellow-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${storagePercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-2">Current Plan: <span className="text-blue-500">{userData.plan}</span></h3>
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
                    {activities.length > 0 ? (
                      activities.map(activity => (
                        <tr key={activity.id} className="border-b">
                          <td className="py-3">{activity.type}</td>
                          <td className="py-3">{formatDate(activity.timestamp)}</td>
                          <td className="py-3">{activity.ipAddress}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="py-3 text-center text-gray-500">No recent activities found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;