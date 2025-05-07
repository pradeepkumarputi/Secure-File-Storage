import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <header className="bg-gray-800 text-blue-400 py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">CLOUDURE</Link>
      </div>
      <nav className="flex space-x-4 text-sm">
        <Link to="/" className="hover:text-white">HOME</Link>
        <Link to="/about" className="hover:text-white">ABOUT</Link>
        <Link to="/features" className="hover:text-white">FEATURES</Link>
        <Link to="/contact" className="hover:text-white">CONTACT</Link>
        {isLoggedIn ? (
          <Link to="/" className="text-red-400 hover:text-red-300">SIGN OUT</Link>
        ) : (
          <>
            <Link to="/login" className="hover:text-white">LOG IN</Link>
            <Link to="/signup" className="hover:text-white">SIGN UP</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;