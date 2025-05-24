import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/firebase';

const Header = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-400">CLOUDURE</Link>
          <nav className="flex space-x-4 text-sm text-blue-400">
        <Link to="/" className="hover:text-white">HOME</Link>
        <Link to="/about" className="hover:text-white">ABOUT</Link>
        <Link to="/features" className="hover:text-white">FEATURES</Link>
        <Link to="/contact" className="hover:text-white">CONTACT</Link>
        
      </nav>
          <nav className="flex items-center">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="mr-4 text-blue-400 hover:text-white">Log In</Link>
                <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition duration-200">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center">
                <span className="mr-4 text-white">
                  Hello, {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;