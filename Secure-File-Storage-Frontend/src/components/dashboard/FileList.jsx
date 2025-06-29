import React, { useState } from 'react';

const FileList = ({ files, onDownload, onDelete }) => {
  const [showKeyForFile, setShowKeyForFile] = useState(null);

  const toggleShowKey = (fileId) => {
    if (showKeyForFile === fileId) {
      setShowKeyForFile(null);
    } else {
      setShowKeyForFile(fileId);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-center">ID</th>
              <th className="py-3 px-4">File Name</th>
              <th className="py-3 px-4 text-center">Size/MB</th>
              <th className="py-3 px-4 text-center">Download Key</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="border-b border-gray-200 bg-green-50 hover:bg-green-100">
                <td className="py-3 px-4 text-center">{file.id}</td>
                <td className="py-3 px-4">{file.name}</td>
                <td className="py-3 px-4 text-center">{file.size}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center">
                    {showKeyForFile === file.id ? (
                      <div className="flex items-center">
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
                    ) : (
                      <button 
                        className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200"
                        onClick={() => toggleShowKey(file.id)}
                      >
                        Show Key
                      </button>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center space-x-2">
                    {file.actions.map((action) => (
                      <button 
                        key={action.type}
                        className={`px-3 py-1 rounded text-white ${
                          action.type === 'delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        }`}
                        onClick={() => {
                          if (action.type === 'download') {
                            onDownload(file.id);
                          } else if (action.type === 'delete') {
                            onDelete(file.id);
                          }
                        }}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;