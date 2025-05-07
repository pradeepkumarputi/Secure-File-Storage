import React from 'react';
import Header from '../components/common/Header';
import Navigation from '../components/common/Navigation';
import AccountInfo from '../components/dashboard/AccountInfo';
import Footer from '../components/common/Footer'; 



const Dashboard = () => {
  // Mock user data
  const user = {
    userId: 'PRADEEP1234',
    firstName: 'Pradeep',
    lastName: 'kumar',
    username: 'pradeepkumar',
    email: 'pradeepkumar@example.com',
    avatar: null,
    phone: "+91 555- 123-4567",
    location: "India",
    storageUsed: 15.2,
    storageLimit: 50,
    memberSince: '2025-01-15',
    plan: 'Premium'
  };
  
  // Mock statistics
  const stats = [
    { id: 1, title: 'Files', value: 34, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 2, title: 'Uploads', value: 124, icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
    { id: 3, title: 'Downloads', value: 97, icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
  ];
  
  // Calculate storage percentage
  const storagePercentage = (user.storageUsed / user.storageLimit) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />
      
      <div className="flex-grow flex">
        <Navigation />
        
        <main className="flex-grow p-6 bg-gray-100">
          <h1 className="text-2xl font-medium mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white p-6 rounded-md shadow flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-medium">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccountInfo user={user} />
            
            <div className="bg-white p-6 rounded-md shadow">
              <h2 className="text-xl font-medium mb-6">Storage Usage</h2>
              
              <div className="flex items-center mb-2">
                <div className="text-2xl font-medium mr-2">{user.storageUsed} GB</div>
                <div className="text-gray-500">of {user.storageLimit} GB used</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className={`h-2.5 rounded-full ${
                    storagePercentage > 90 ? 'bg-red-500' : storagePercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${storagePercentage}%` }}
                ></div>
              </div>
              
              <div className="text-sm text-gray-500">
                {storagePercentage > 90 
                  ? 'Your storage is almost full! Consider upgrading your plan or removing some files.'
                  : storagePercentage > 70
                  ? 'You\'re using quite a bit of storage space.'
                  : 'You have plenty of storage space left.'}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Membership</h3>
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                    {user.plan}
                  </div>
                  <div className="text-sm text-gray-500">Member since {user.memberSince}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;