import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import FileList from '../components/dashboard/FileList';
import { getFilesByUserId, downloadFile, deleteFile } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Files = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchFiles();
    } else {
      setFiles([]);
      setLoading(false);
    }
  }, [currentUser]);

  const fetchFiles = async () => {
    try {
      if (!currentUser) {
        setFiles([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const data = await getFilesByUserId(currentUser.uid);
      
      // Transform the data to match our component's expected format
      const transformedFiles = data.map(file => ({
        id: file.id,
        name: file.fileName,
        size: (file.size / (1024 * 1024)).toFixed(2), // Convert bytes to MB
        uploadDate: file.uploadDate,
        contentType: file.contentType,
        downloadKey: file.downloadKey,
        actions: [
          { type: 'download', label: 'Download' },
          { type: 'delete', label: 'Delete' }
        ]
      }));
      
      setFiles(transformedFiles);
      
      // Update the stats on the dashboard based on the number of files
      // This ensures the dashboard data is in sync even on page load
      const fileCount = transformedFiles.length;
      
      // Dispatch a custom event to update file count in the dashboard
      window.dispatchEvent(new CustomEvent('filesUpdated', { 
        detail: { fileCount } 
      }));
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch files:', err);
      setError('Failed to load files. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileId) => {
    try {
      if (!currentUser) {
        alert('You must be logged in to download files');
        return;
      }
      
      // Find the file to get its download key
      const file = files.find(f => f.id === fileId);
      if (!file) {
        alert('File not found');
        return;
      }
      
      // Prompt user for download key
      const inputKey = prompt(`Enter download key for ${file.name}:`, '');
      
      // Verify key is provided
      if (!inputKey) {
        alert('Download key is required');
        return;
      }
      
      // Attempt download with the key and user ID
      await downloadFile(fileId, inputKey, currentUser.uid);
      
      // Dispatch a custom event to update the download count
      window.dispatchEvent(new CustomEvent('fileDownloaded', { 
        detail: { fileName: file.name, fileSize: parseFloat(file.size) } 
      }));
      
      // Also update user activities
      window.dispatchEvent(new CustomEvent('userActivity', {
        detail: {
          type: 'File Downloaded',
          fileName: file.name,
          ipAddress: getUserIP()
        }
      }));
      
    } catch (err) {
      console.error('Failed to download file:', err);
      if (err.message === 'Invalid download key') {
        alert('Invalid download key. Please try again with the correct key.');
      } else {
        alert('Failed to download file. Please try again later.');
      }
    }
  };

  const handleDelete = async (fileId) => {
    if (!currentUser) {
      alert('You must be logged in to delete files');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        // Find the file to get its download key
        const file = files.find(f => f.id === fileId);
        if (!file) {
          alert('File not found');
          return;
        }
        
        // Prompt user for download key
        const inputKey = prompt(`Enter download key for ${file.name} to confirm deletion:`, '');
        
        // Verify key is provided
        if (!inputKey) {
          alert('Download key is required to delete the file');
          return;
        }
        
        // Attempt deletion with the key and user ID
        await deleteFile(fileId, inputKey, currentUser.uid);
        
        // Dispatch a custom event to update the file count
        window.dispatchEvent(new CustomEvent('fileDeleted', { 
          detail: { fileName: file.name, fileSize: parseFloat(file.size) } 
        }));
        
        // Also update user activities
        window.dispatchEvent(new CustomEvent('userActivity', {
          detail: {
            type: 'File Deleted',
            fileName: file.name,
            ipAddress: getUserIP()
          }
        }));
        
        // Refresh the file list after deletion
        fetchFiles();
      } catch (err) {
        console.error('Failed to delete file:', err);
        if (err.message === 'Invalid download key') {
          alert('Invalid download key. Please try again with the correct key.');
        } else {
          alert('Failed to delete file. Please try again later.');
        }
      }
    }
  };
  
  // Function to get user's IP - this is a placeholder
  // In a real app, you might get this from server response
  const getUserIP = () => {
    // This is a simplistic approach for demonstration
    // In a real app, the server would provide the client IP
    return window.clientInformation?.userAgentData?.platform === 'Windows' 
      ? '192.168.1.102' 
      : '10.0.0.15';
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex-grow flex">
        <Navigation />
        
        <main className="flex-grow p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium">My Files</h1>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 flex items-center"
              onClick={() => navigate('/upload')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              Upload New
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow mb-6">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-auto flex items-center mb-4 md:mb-0 mr-4">
                <input
                  type="text"
                  placeholder="Search files..."
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-2">
                <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm transition duration-200">
                  All Files
                </button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your files...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              <p>{error}</p>
              <button 
                className="mt-2 text-blue-500 hover:underline"
                onClick={fetchFiles}
              >
                Try Again
              </button>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-md shadow">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Files Found</h3>
              <p className="text-gray-600 mb-4">You haven't uploaded any files yet.</p>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                onClick={() => navigate('/upload')}
              >
                Upload Your First File
              </button>
            </div>
          ) : (
            <FileList 
              files={files} 
              onDownload={handleDownload} 
              onDelete={handleDelete} 
            />
          )}
        </main>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
};

export default Files;