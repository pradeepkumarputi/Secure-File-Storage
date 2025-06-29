import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const UploadSection = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }

    if (!currentUser || !currentUser.uid) {
      setError('You must be logged in to upload files');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadedFiles([]);

    try {
      // Upload each file
      for (const file of selectedFiles) {
        try {
          // Update progress for this file
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 'uploading'
          }));
          
          // Upload the file with user ID
          const response = await uploadFile(file, currentUser.uid);

          // Add to uploaded files with download key
          setUploadedFiles(prev => [
            ...prev,
            {
              name: file.name,
              id: response.id,
              downloadKey: response.downloadKey
            }
          ]);

          // Mark as complete
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 'complete'
          }));
        } catch (err) {
          console.error(`Error uploading ${file.name}:`, err);
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 'error'
          }));
        }
      }

      setUploadSuccess(true);

      // Don't redirect automatically, let user see the download keys
    } catch (err) {
      console.error('Upload failed:', err);
      setError('File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full p-6">
      {uploadSuccess ? (
        <div className="text-center py-8">
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
            <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Files uploaded successfully!
          </div>
          
          <div className="mt-4 mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2 text-yellow-800">Important: Save Your Download Keys</h3>
            <p className="text-sm text-yellow-700 mb-4">You will need these keys to download your files. Please save them in a secure location.</p>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="bg-white p-3 rounded border border-yellow-200">
                  <p className="font-medium">{file.name}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2">Download Key:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{file.downloadKey}</code>
                    <button 
                      className="ml-2 text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        navigator.clipboard.writeText(file.downloadKey);
                        alert('Download key copied to clipboard!');
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/files')} 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Go to My Files
          </button>
        </div>
      ) : (
        <>
          <div
            className={`border-2 border-dashed rounded-md p-16 flex flex-col items-center justify-center
              ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFiles.length > 0 ? (
              <div className="w-full">
                <h3 className="text-lg font-medium mb-4 text-center">Selected Files</h3>
                <ul className="mb-6 max-h-40 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      {uploadProgress[file.name] && (
                        <div className="ml-2">
                          {uploadProgress[file.name] === 'uploading' && (
                            <div className="animate-pulse h-2 w-2 bg-yellow-500 rounded-full"></div>
                          )}
                          {uploadProgress[file.name] === 'complete' && (
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                          {uploadProgress[file.name] === 'error' && (
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <button
                    className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200 mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : 'Upload Files'}
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setSelectedFiles([])}
                    disabled={uploading}
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                  Select Files
                </button>
              </>
            )}
          </div>
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <p className="text-xs text-center mt-2 text-gray-500">Maximum file size 50 MB. All types of files.</p>
        </>
      )}
    </div>
  );
};

export default UploadSection;