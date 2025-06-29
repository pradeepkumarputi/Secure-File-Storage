import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import UploadSection from '../components/dashboard/UploadSection';

const Upload = () => {
  return (
    <div className="min-h-screen flex flex-col">

      
      <div className="flex-grow flex">
        <Navigation />
        
        <main className="flex-grow p-6 bg-gray-100">
          <h1 className="text-2xl font-medium mb-6">Upload Files</h1>
          
          <div className="bg-white rounded-md shadow">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium">Select Files to Upload</h2>
              <p className="text-sm text-gray-500">Supported formats: ALL</p>
            </div>
            
            <UploadSection />
            
            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium mb-3">Upload Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Each file should be under 50MB in size.
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  You can drag and drop multiple files at once.
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  All files are encrypted for your privacy and security.
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
};

export default Upload;