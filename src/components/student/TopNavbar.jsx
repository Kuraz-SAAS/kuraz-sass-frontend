import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaChevronDown, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSiteStore } from "../../context/siteStore";
import { avatar } from "../../assets/images";

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileMenuButtonRef = useRef(null);
  const setUser = useSiteStore((store) => store.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        profileMenuButtonRef.current &&
        !profileMenuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleProfileMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-3 px-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Link
          to="/courses"
          className="flex items-center text-gray-800 dark:text-white font-semibold text-md"
        >
          <span className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
            Back To Home
          </span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-5">
        {/* Notifications Icon */}
        <button className="text-gray-800 dark:text-white hover:text-blue-600 transition">
          <FaBell className="text-lg" />
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            ref={profileMenuButtonRef}
            onClick={handleProfileMenuClick}
            className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-blue-600 text-sm"
          >
            <img src={avatar} alt="Profile" className="w-8 h-8 rounded-full" />
            <span>John Doe</span>
            <FaChevronDown className="text-xs" />
          </button>
          <div
            ref={profileMenuRef}
            className={`absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg transition-transform transform ${
              isMenuOpen ? "scale-100" : "scale-0"
            } origin-top-right`}
          >
            <button
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
              onClick={() => {
                setUser(null);
                navigate("/login");
              }}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
