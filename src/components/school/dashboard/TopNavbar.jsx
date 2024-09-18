import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa'; // React Icons

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileMenuButtonRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target) &&
          profileMenuButtonRef.current && !profileMenuButtonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleProfileMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    history.push(path);
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <nav className="bg-white shadow-md py-3 px-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <a href="#" className="flex items-center text-gray-800 font-semibold text-lg">
          <span>Falcon Dashboard</span>
        </a>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-3">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full py-1 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 text-sm" 
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <button className="relative text-gray-800 hover:text-blue-600 text-lg">
          <FaBell />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button 
            ref={profileMenuButtonRef}
            onClick={handleProfileMenuClick}
            className="flex items-center space-x-1 text-gray-800 hover:text-blue-600 text-sm"
          >
            <img 
              src="./Frontend/assets/images/kuraz.png" 
              alt="Profile" 
              className="w-7 h-7 rounded-full" 
            />
            <span>John Doe</span>
            <FaChevronDown className="text-xs" />
          </button>
          <div 
            ref={profileMenuRef}
            className={`absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}
          >
            <a 
              href="/profile" 
              className="block px-3 py-1 text-gray-700 hover:bg-gray-100 text-sm"
              onClick={() => handleNavigation('/profile')}
            >
              Profile
            </a>
            <a 
              href="/settings" 
              className="block px-3 py-1 text-gray-700 hover:bg-gray-100 text-sm"
              onClick={() => handleNavigation('/settings')}
            >
              Settings
            </a>
            <a 
              href="/logout" 
              className="block px-3 py-1 text-gray-700 hover:bg-gray-100 text-sm"
              onClick={() => handleNavigation('/logout')}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
