import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';

const Download = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock recent files data
  const recentFiles = [
    { 
      id: '001', 
      name: 'family_vacation.mp4', 
      size: '34.5 MB', 
      date: '2023-03-12',
      type: 'Video'
    },
    { 
      id: '002', 
      name: 'business_presentation.mp3', 
      size: '12.7 MB', 
      date: '2023-02-28',
      type: 'Audio'
    },
    { 
      id: '003', 
      name: 'wedding_speech.mp3', 
      size: '8.2 MB', 
      date: '2023-01-15',
      type: 'Audio'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />
      
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
                  <button className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Filter by Type</h3>
                <div className="flex space-x-2">
                  <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm transition duration-200">
                    All
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm transition duration-200">
                    Audio
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm transition duration-200">
                    Video
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm transition duration-200">
                    images
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm transition duration-200">
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">To</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-md shadow p-6">
              <h2 className="text-lg font-medium mb-4">Recent Files</h2>
              
              {recentFiles.length > 0 ? (
                <div className="space-y-4">
                  {recentFiles.map((file) => (
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
                        <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600 transition duration-200 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                          Download
                        </button>
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
      
      <Footer />
    </div>
  );
};

export default Download;