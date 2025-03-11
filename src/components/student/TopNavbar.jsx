import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaChevronDown, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSiteStore } from "../../context/siteStore";
import { avatar } from "../../assets/images";
import { GoHomeFill } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { Button } from "../ui/button";

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

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-3 px-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Link
          to="/courses"
          className="flex items-center text-gray-800 dark:text-white font-semibold text-md"
        >
          <Button variant="outline" className="flex items-center gap-2 font-light text-sm  text-white p-2 rounded-md transition">
            <GoHomeFill /> Back To Home
          </Button>
        </Link>
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
            className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-blue-600 text-sm"
          >
            <BsPerson size={22} />
            <span className="capitalize">{user?.name}</span>
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
                navigate("/");
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
