import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-3 text-center text-xs text-black ">
      © Cloudure - {year}
    </footer>
  );
};

export default Footer;