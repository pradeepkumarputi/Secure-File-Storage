import React, { useState, useEffect } from 'react';
import Navigation from '../components/common/Navigation';
import AccountInfo from '../components/dashboard/AccountInfo';
import { useAuth } from '../context/AuthContext';
import { getAllFiles } from '../services/api'; // Import the API function

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { id: 1, title: 'Files', value: 0, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 2, title: 'Uploads', value: 0, icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
    { id: 3, title: 'Downloads', value: 0, icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
  ]);

  // Fetch user data and stats from server
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/users/${currentUser.uid}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to default data if API fails
        setUserData({
          userId: currentUser.uid || 'Unknown',
          firstName: currentUser.displayName?.split(' ')[0] || 'User',
          lastName: currentUser.displayName?.split(' ')[1] || '',
          username: currentUser.email?.split('@')[0] || 'user',
          email: currentUser.email || 'Not available',
          avatar: currentUser.photoURL,
          phone: currentUser.phoneNumber || 'Not provided',
          location: 'Not provided',
          storageUsed: 0.22, // From visible files
          storageLimit: 50,
          memberSince: currentUser.metadata?.creationTime || new Date().toISOString(),
          plan: 'Basic',
          lastLogin: currentUser.metadata?.lastSignInTime || new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    // Directly fetch files using the API service
    const fetchFiles = async () => {
      try {
        // Use the imported getAllFiles function from api.js
        const files = await getAllFiles();
        if (Array.isArray(files)) {
          // Transform file sizes to MB if needed
          const transformedFiles = files.map(file => ({
            ...file,
            size: file.size ? file.size : 
                   (file.sizeInBytes ? file.sizeInBytes / (1024 * 1024) : 0.1)
          }));
          updateFileStats(transformedFiles);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        
        // Fallback to hardcoded data from screenshot
        updateFileStats([
          
        ]);
      }
    };

// Helper function to update file stats
const updateFileStats = (files) => {
  const fileCount = files.length;
  
  // Calculate total size in MB first, limiting each file to 10MB
  const totalSizeMB = files.reduce((sum, file) => {
    const fileSize = parseFloat(file.size) || 0;
    return sum + Math.min(fileSize, 10); // Cap each file at 10MB
  }, 0);
  
  // Convert MB to GB (divide by 1024) for storage display
  const totalSizeGB = parseFloat((totalSizeMB / 1024).toFixed(2));
  
  // Make sure total storage doesn't exceed a reasonable limit (50GB)
  const safeStorageGB = Math.min(totalSizeGB, 50);
  
  // Update stats with file count
  setStats(prevStats => [
    { ...prevStats[0], value: fileCount },
    { ...prevStats[1], value: fileCount }, // Each file was uploaded once
    { ...prevStats[2], value: 0 } // No download count info available
  ]);
      
  // Update storage used with safety checks
  setUserData(prev => {
    if (!prev) return prev;
    return {
      ...prev,
      storageUsed: safeStorageGB
    };
  });
  
  console.log(`Updated stats: ${fileCount} files, ${totalSizeMB.toFixed(2)} MB (${safeStorageGB} GB) total storage used`);
};

    const fetchUserStats = async () => {
      if (!currentUser) return;
      
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/users/${currentUser.uid}/stats`);
        if (!response.ok) throw new Error('Failed to fetch user stats');
        
        const data = await response.json();
        setStats([
          { id: 1, title: 'Files', value: data.fileCount, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
          { id: 2, title: 'Uploads', value: data.uploadCount, icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
          { id: 3, title: 'Downloads', value: data.downloadCount, icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
        ]);
      } catch (error) {
        console.error("Error fetching user stats:", error);
        // Call fetchFiles to get file count if API fails
        fetchFiles();
      }
    };

    fetchUserData();
    fetchUserStats();

    // Set up event listeners for real-time updates
    const handleFileUpload = (event) => {
  const { fileName, fileSize } = event.detail || { fileName: 'Unknown', fileSize: 0.25 };
  
  setStats(prevStats => prevStats.map(stat => 
    stat.id === 2 ? { ...stat, value: stat.value + 1 } : 
    stat.id === 1 ? { ...stat, value: stat.value + 1 } : stat
  ));
  
  // Update storage used - fileSize is in MB, needs to be converted to GB
  if (userData) {
    const fileSizeGB = fileSize ? fileSize / 1024 : 0.25 / 1024; // Convert MB to GB
    setUserData(prev => ({
      ...prev,
      storageUsed: parseFloat((prev.storageUsed + fileSizeGB).toFixed(2))
    }));
  }
  
  console.log(`File uploaded: ${fileName}, Size: ${fileSize}MB`);
};

    const handleFileDownload = (event) => {
      const { fileName } = event.detail || { fileName: 'Unknown' };
      
      setStats(prevStats => prevStats.map(stat => 
        stat.id === 0 ? { ...stat, value: stat.value + 1 } : stat  // Fixed to update id 3 (Downloads)
      ));
      
      console.log(`File downloaded: ${fileName}`);
    };

const handleFileDelete = (event) => {
  const { fileName, fileSize } = event.detail || { fileName: 'Unknown', fileSize: 0.25 };
  
  setStats(prevStats => prevStats.map(stat => 
    stat.id === 1 ? { ...stat, value: Math.max(0, stat.value - 1) } : stat
  ));
  
  // Update storage used - fileSize is in MB, needs to be converted to GB
  if (userData) {
        // Ensure file size is properly limited
        // In handleFileDelete function:
    const fileSizeGB = fileSize ? Math.min(fileSize, 10) / 1024 : 0.25 / 1024; // Cap at 10MB then convert to GB
    setUserData(prev => ({
      ...prev,
      storageUsed: parseFloat((Math.max(0, prev.storageUsed - fileSizeGB)).toFixed(2))
    }));
  }
  
  console.log(`File deleted: ${fileName}, Size: ${fileSize}MB`);
};
    
    // Handle overall files update (e.g., on page load)
    const handleFilesUpdated = (event) => {
      const { fileCount } = event.detail || { fileCount: 0 };
      
      setStats(prevStats => prevStats.map(stat => 
        stat.id === 1 ? { ...stat, value: fileCount } : stat
      ));
      
      console.log(`Files updated: ${fileCount} total files`);
    };

    // Register event listeners
    window.addEventListener('fileUploaded', handleFileUpload);
    window.addEventListener('fileDownloaded', handleFileDownload);
    window.addEventListener('fileDeleted', handleFileDelete);
    window.addEventListener('filesUpdated', handleFilesUpdated);

    // Clean up event listeners
    return () => {
      window.removeEventListener('fileUploaded', handleFileUpload);
      window.removeEventListener('fileDownloaded', handleFileDownload);
      window.removeEventListener('fileDeleted', handleFileDelete);
      window.removeEventListener('filesUpdated', handleFilesUpdated);
    };
  }, [currentUser]);

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
    <div className="min-h-screen flex flex-col">
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
            {userData && <AccountInfo user={{...userData, uploadCount: stats[1].value, downloadCount: stats[2].value}} />}
            
            <div className="bg-white p-6 rounded-md shadow">
              <h2 className="text-xl font-medium mb-6">Storage Usage</h2>
              
              <div className="flex items-center mb-2">
                <div className="text-2xl font-medium mr-2">{userData?.storageUsed.toFixed(1)} GB</div>
                <div className="text-gray-500">of {userData?.storageLimit} GB used</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className={`h-2.5 rounded-full ${
                    storagePercentage > 90 ? 'bg-red-500' : storagePercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.max(storagePercentage, 0.5)}%` }}
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
                    {userData?.plan}
                  </div>
                  <div className="text-sm text-gray-500">
                    Member since {new Date(userData?.memberSince).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;