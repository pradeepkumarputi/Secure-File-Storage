import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import FileList from '../components/dashboard/FileList';

const Files = () => {
  // Mock files data
  const files = [
    { 
      id: '001', 
      name: 'family_vacation.mp4', 
      size: 34.5, 
      uploadDate: '2023-03-12',
      actions: [
        { type: 'download', label: 'Download' },
        { type: 'delete', label: 'Delete' }
      ]
    },
    { 
      id: '002', 
      name: 'business_presentation.mp3', 
      size: 12.7, 
      uploadDate: '2023-02-28',
      actions: [
        { type: 'download', label: 'Download' },
        { type: 'delete', label: 'Delete' }
      ]
    },
    { 
      id: '003', 
      name: 'wedding_speech.mp3', 
      size: 8.2, 
      uploadDate: '2023-01-15',
      actions: [
        { type: 'download', label: 'Download' },
        { type: 'delete', label: 'Delete' }
      ]
    },
    { 
      id: '004', 
      name: 'workout_routine.mp4', 
      size: 42.1, 
      uploadDate: '2022-12-05',
      actions: [
        { type: 'download', label: 'Download' },
        { type: 'delete', label: 'Delete' }
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />
      
      <div className="flex-grow flex">
        <Navigation />
        
        <main className="flex-grow p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium">My Files</h1>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 flex items-center">
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
                {/* <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm transition duration-200">
                  Audio
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm transition duration-200">
                  Video
                </button> */}
              </div>
            </div>
          </div>
          
          <FileList files={files} />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Files;