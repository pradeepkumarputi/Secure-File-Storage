import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/firebase';

const Header = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Skip rendering the header on specific pages if needed
  // if (['/login', '/signup'].includes(location.pathname)) {
  //   return null;
  // }

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">CLOUDURE</Link>
          <nav className="flex space-x-4 text-sm text-blue-400">
        <Link to="/" className="hover:text-white">HOME</Link>
        <Link to="/about" className="hover:text-white">ABOUT</Link>
        <Link to="/features" className="hover:text-white">FEATURES</Link>
        <Link to="/contact" className="hover:text-white">CONTACT</Link>
        
      </nav>
          
          <nav className="flex items-center">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="mr-4 text-white hover:text-blue-500">Log In</Link>
                <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
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
                  className="text-white hover:text-blue-500"
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