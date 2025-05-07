import React, { useState } from 'react';

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log("Files dropped:", e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload
      console.log("Files selected:", e.target.files);
    }
  };
  
  return (
    <div className="w-full p-6">
      <div 
        className={`border-2 border-dashed rounded-md p-16 flex flex-col items-center justify-center
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <p className="text-gray-500 mb-4">Drag and drop a file here</p>
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          onChange={handleFileChange}
          multiple
        />
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          onClick={() => document.getElementById('file-upload').click()}
        >
          <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
          </svg>
          Upload
        </button>
      </div>
      <p className="text-xs text-center mt-2 text-gray-500">Maximum file size 50 MB. All types of files.</p>
    </div>
  );
};

export default UploadSection;