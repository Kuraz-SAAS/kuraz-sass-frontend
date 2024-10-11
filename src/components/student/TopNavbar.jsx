import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa"; // React Icons
import { Link, useNavigate } from "react-router-dom";
import { useSiteStore } from "../../context/siteStore";
import { avatar } from "@material-tailwind/react";

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

  const handleNavigation = (path) => {
    history.push(path);
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <nav className="bg-white  py-3 px-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Link
          to={"/courses"}
          className="flex items-center text-gray-800 font-semibold text-md"
        >
          <span className="bg-primary text-white p-2 rounded-md">
            Back To Home
          </span>
        </Link>
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
        {/* Profile Menu */}
        <div className="relative">
          <button
            ref={profileMenuButtonRef}
            onClick={handleProfileMenuClick}
            className="flex items-center space-x-1 text-gray-800 hover:text-blue-600 text-sm"
          >
            <img src={avatar} alt="Profile" className="w-7 h-7 rounded-full" />
            <span>John Doe</span>
            <FaChevronDown className="text-xs" />
          </button>
          <div
            ref={profileMenuRef}
            className={`absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <button
              className="block px-3 py-1 text-gray-700 w-full text-start hover:bg-gray-100 text-sm"
              onClick={() => {
                setUser(null);
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
