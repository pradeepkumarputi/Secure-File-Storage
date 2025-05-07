import React from 'react';

const FileList = ({ files }) => {
  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-center">ID</th>
              <th className="py-3 px-4">File Name</th>
              <th className="py-3 px-4 text-center">Size/MB</th>
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
                  <div className="flex justify-center space-x-2">
                    {file.actions.map((action) => (
                      <button 
                        key={action.type}
                        className={`px-3 py-1 rounded text-white ${
                          action.type === 'delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        }`}
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