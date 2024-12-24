import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {
  FaSearch,
  FaBook,
  FaHome,
  FaUser,
  FaPersonBooth,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSiteStore } from "../../../context/siteStore";
import { bookImg } from "../../../assets/test_img";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSiteStore((store) => store.user);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 font-poppins">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800 capitalize flex items-center space-x-2">
          <FaHome className="text-secondary" />
          <p className="font-light">{user?.name || "MyApp"}</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/courses"
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
              >
                <FaBook />
                <span className="font-light">Courses</span>
              </Link>
            </li>
            <li>
              <Link
                to="/books"
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
              >
                <FaBook />
                <span className="font-light">Books</span>
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
              >
                <FaUser />
                <span className="font-light">Resources</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Link
              to={
                user?.user_type === "student"
                  ? "/student/dashboard"
                  : "/school/dashboard"
              }
              className="flex items-center space-x-2  px-3 py-2 rounded-lg "
            >
              <FaPersonBooth />
              <span className="font-light">Dashboard</span>
            </Link>
          ) : (
            <Link to="/login" className="text-gray-800 hover:text-blue-600">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-800 hover:text-blue-600 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transition-transform transform md:hidden z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <ul className="space-y-6">
            <li>
              <Link
                to="/courses"
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
              >
                <FaBook />
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link
                to="/books"
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
              >
                <FaBook />
                <span>Books</span>
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
              >
                <FaUser />
                <span>Resources</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
