import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa"; // React Icons
import { Link, useNavigate } from "react-router-dom";
import { useSiteStore } from "../../../context/siteStore";
import { avatar } from "../../../assets/images";
import { BsPerson } from "react-icons/bs";

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileMenuButtonRef = useRef(null);
  const user = useSiteStore((store) => store.user);
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
    <nav className="bg-white  py-3 px-4 flex items-center justify-end">
      {/* Logo Section */}

      {/* Right Side Icons */}
      <div className="flex items-center justify-end space-x-3">
        {/* Profile Menu */}
        <div className="relative">
          <button
            ref={profileMenuButtonRef}
            onClick={handleProfileMenuClick}
            className="flex items-center space-x-1 text-gray-800 hover:text-blue-600 text-sm"
          >
            <BsPerson size={24} />
            <span className="capitalize">{user?.name}</span>
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
                document.cookie = "XSRF-TOKEN=; Max-Age=0"; // Delete CSRF Token
                document.cookie = "session=; Max-Age=0"; // Delete session cookie
                localStorage.clear();
                sessionStorage.clear();
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
