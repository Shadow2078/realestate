import React from 'react';

const Header = () => {
  return (
    <div style={{ backgroundColor: '#72B944' }} className="py-1 sticky top-0 z-50 shadow-lg">
      <div className="mx-auto max-w-7xl px-2 lg:px-10 md:px-5 flex justify-between items-center h-6 lg:h-8">
        {/* Contact Information */}
        <div className="flex items-center text-white gap-4">
          <span className="text-sm md:text-md lg:text-base">
            <i className="fa fa-phone"></i> +977 9812345678
          </span>
          <span className="text-sm md:text-md lg:text-base">
            <i className="fa fa-envelope"></i> gharghaderi@gmail.com
          </span>
        </div>
        {/* Social Media Icons (hidden on smaller screens) */}
        <div className="hidden md:flex gap-4">
          <a href="#" target='_blank' className="text-white">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" className="text-white">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#" className="text-white">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
