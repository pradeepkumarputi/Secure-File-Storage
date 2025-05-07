import React, { useState } from 'react';

const DownloadSection = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleDownload = () => {
    if (selectedFile) {
      console.log('Downloading file:', selectedFile);
      // Download logic would go here
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-medium mb-4">Download Files</h2>
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="bg-gray-100 p-4">
          <input 
            type="text" 
            placeholder="Search files..." 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {files && files.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {files.map((file) => (
                <li 
                  key={file.id} 
                  className={`p-4 hover:bg-blue-50 cursor-pointer ${selectedFile?.id === file.id ? 'bg-blue-100' : ''}`}
                  onClick={() => handleFileSelect(file)}
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.size} MB - {file.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No files available to download
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button 
          onClick={handleDownload}
          disabled={!selectedFile}
          className={`flex items-center py-2 px-6 rounded-md text-white
            ${selectedFile ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadSection;