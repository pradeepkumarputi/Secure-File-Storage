import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center p-3 text-gray-700 rounded-md hover:bg-blue-50 ${isActive('/dashboard') ? 'bg-blue-50 text-blue-500' : ''}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/files" 
              className={`flex items-center p-3 text-gray-700 rounded-md hover:bg-blue-50 ${isActive('/files') ? 'bg-blue-50 text-blue-500' : ''}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Files
            </Link>
          </li>
          <li>
            <Link 
              to="/upload" 
              className={`flex items-center p-3 text-gray-700 rounded-md hover:bg-blue-50 ${isActive('/upload') ? 'bg-blue-50 text-blue-500' : ''}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              Upload
            </Link>
          </li>
          <li>
            <Link 
              to="/download" 
              className={`flex items-center p-3 text-gray-700 rounded-md hover:bg-blue-50 ${isActive('/download') ? 'bg-blue-50 text-blue-500' : ''}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l4 4m0 0l-4 4m4-4H4"></path>
              </svg>
              Download
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`flex items-center p-3 text-gray-700 rounded-md hover:bg-blue-50 ${isActive('/settings') ? 'bg-blue-50 text-blue-500' : ''}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Settings
            </Link>
          </li>
          <li>
            <Link 
              to="/account" 
              className={`flex items-center p-3 text-gray-700 rounded-md hover:bg-blue-50 ${isActive('/account') ? 'bg-blue-50 text-blue-500' : ''}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;