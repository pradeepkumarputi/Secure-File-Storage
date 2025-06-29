import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import { getFilesByUserId, downloadFile } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Download = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('All');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [downloadKey, setDownloadKey] = useState('');
  const [downloadError, setDownloadError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchFiles();
    } else {
      setFiles([]);
      setFilteredFiles([]);
      setLoading(false);
    }
  }, [currentUser]);

  const fetchFiles = async () => {
    try {
      if (!currentUser) {
        setFiles([]);
        setFilteredFiles([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const data = await getFilesByUserId(currentUser.uid);

      // Transform the data to match our component's expected format
      const transformedFiles = data.map(file => ({
        id: file.id,
        name: file.fileName,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        date: new Date(file.uploadDate).toISOString().split('T')[0],
        type: getFileType(file.contentType)
      }));

      setFiles(transformedFiles);
      setFilteredFiles(transformedFiles);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch files:', err);
      setError('Failed to load files. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getFileType = (contentType) => {
    if (contentType.includes('audio')) return 'Audio';
    if (contentType.includes('video')) return 'Video';
    if (contentType.includes('image')) return 'Image';
    if (contentType.includes('pdf')) return 'PDF';
    return 'Other';
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    applyFilters(type, dateRange);
  };

  const handleDateChange = (field, value) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    applyFilters(selectedType, newDateRange);
  };

  const applyFilters = (type = selectedType, dates = dateRange) => {
    let filtered = [...files];

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.id.toString().includes(searchQuery)
      );
    }

    // Apply type filter
    if (type !== 'All') {
      filtered = filtered.filter(file => file.type === type);
    }

    // Apply date range filter
    if (dates.from) {
      filtered = filtered.filter(file => file.date >= dates.from);
    }
    if (dates.to) {
      filtered = filtered.filter(file => file.date <= dates.to);
    }

    setFilteredFiles(filtered);
  };

  const handleDownload = async (fileId) => {
    try {
      setDownloadError(null);
      if (!downloadKey.trim()) {
        setDownloadError('Please enter a download key');
        return;
      }
      if (!currentUser) {
        setDownloadError('You must be logged in to download files');
        return;
      }
      await downloadFile(fileId, downloadKey.trim(), currentUser.uid);
    } catch (err) {
      console.error('Failed to download file:', err);
      if (err.message === 'Invalid download key') {
        setDownloadError('Invalid download key. Please try again with the correct key.');
      } else {
        setDownloadError('Failed to download file. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex-grow flex">
        <Navigation />
        
        <main className="flex-grow p-6 bg-gray-100">
          <h1 className="text-2xl font-medium mb-6">Download Files</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-md shadow p-6">
              <h2 className="text-lg font-medium mb-4">Search Files</h2>
              
              <div className="mb-6">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter file name or ID..."
                    className="flex-grow px-4 py-2 focus:outline-none"
                  />
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-200"
                    onClick={handleSearch}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Filter by Type</h3>
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 rounded-md text-sm transition duration-200 ${selectedType === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => handleTypeFilter('All')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm transition duration-200 ${selectedType === 'Audio' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => handleTypeFilter('Audio')}
                  >
                    Audio
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm transition duration-200 ${selectedType === 'Video' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => handleTypeFilter('Video')}
                  >
                    Video
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm transition duration-200 ${selectedType === 'Image' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => handleTypeFilter('Image')}
                  >
                    Image
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm transition duration-200 ${selectedType === 'PDF' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => handleTypeFilter('PDF')}
                  >
                    PDF
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Filter by Date</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">From</label>
                    <input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => handleDateChange('from', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">To</label>
                    <input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => handleDateChange('to', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-md shadow p-6">
              <h2 className="text-lg font-medium mb-4">Files</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  <p className="mt-2 text-gray-600">Loading files...</p>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              ) : filteredFiles.length > 0 ? (
                <div className="space-y-4">
                  {filteredFiles.map((file) => (
                    <div key={file.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{file.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          file.type === 'Audio' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {file.type}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Size: {file.size}</span>
                        <span>Uploaded: {file.date}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-col space-y-2">
                          <div className="flex">
                            <input 
                              type="text" 
                              placeholder="Enter download key" 
                              className="border border-gray-300 rounded-l px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                              value={downloadKey}
                              onChange={(e) => setDownloadKey(e.target.value)}
                            />
                            <button 
                              className="bg-blue-500 text-white px-3 py-1 rounded-r text-sm hover:bg-blue-600 transition duration-200 flex items-center"
                              onClick={() => handleDownload(file.id)}
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                              </svg>
                              Download
                            </button>
                          </div>
                          {downloadError && (
                            <div className="text-xs text-red-600">{downloadError}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p>No files found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
   
    </div>
  );
};

export default Download;