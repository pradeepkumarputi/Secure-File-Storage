import React, { useState, useEffect } from 'react';

const AccountInfo = ({ user }) => {
  const [stats, setStats] = useState({
    uploads: 0,
    downloads: 0,
    lastActive: new Date().toISOString()
  });

  // Format date to display in a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  useEffect(() => {
    // Initialize stats from user data if available
    if (user) {
      setStats(prevStats => ({
        ...prevStats,
        uploads: user.uploadCount || 0,
        downloads: user.downloadCount || 0,
        lastActive: user.lastLogin || user.lastActive || new Date().toISOString()
      }));
    }

    // Set up event listeners for real-time updates
    const handleFileUpload = () => {
      setStats(prevStats => ({
        ...prevStats,
        uploads: prevStats.uploads + 1,
        lastActive: new Date().toISOString()
      }));
    };

    const handleFileDownload = () => {
      setStats(prevStats => ({
        ...prevStats,
        downloads: prevStats.downloads + 1,
        lastActive: new Date().toISOString()
      }));
    };

    // Register event listeners
    window.addEventListener('fileUploaded', handleFileUpload);
    window.addEventListener('fileDownloaded', handleFileDownload);

    // Clean up event listeners
    return () => {
      window.removeEventListener('fileUploaded', handleFileUpload);
      window.removeEventListener('fileDownloaded', handleFileDownload);
    };
  }, [user]);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow">
      <h2 className="text-xl font-medium mb-6">Account Info</h2>
      
      <div className="flex items-start">
        {user.avatar && (
          <div className="w-12 h-12 mr-4">
            <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover rounded" />
          </div>
        )}
        <div className="text-xl font-medium text-pink-500">{user.firstName} {user.lastName}</div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
            </svg>
            UserID
          </div>
          <div>{user.userId}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Username
          </div>
          <div>{user.username}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Email
          </div>
          <div>{user.email}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            Phone
          </div>
          <div>{user.phone || 'Not provided'}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Location
          </div>
          <div>{user.location || 'Not provided'}</div>
        </div>
        
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Joined
          </div>
          <div>{formatDate(user.memberSince || user.joinDate)}</div>
        </div>
        
        {/* Add last login time */}
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            Last Login
          </div>
          <div>{formatDate(user.lastLogin)}</div>
        </div>
        
        {/* Add last activity time */}
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Last Active
          </div>
          <div>{formatDate(stats.lastActive)}</div>
        </div>
        
        {/* Add upload statistics */}
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            Uploads
          </div>
          <div>{stats.uploads}</div>
        </div>
        
        {/* Add download statistics */}
        <div className="flex">
          <div className="w-24 text-orange-400">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Downloads
          </div>
          <div>{stats.downloads}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;