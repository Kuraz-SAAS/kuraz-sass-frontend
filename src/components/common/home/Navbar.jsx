import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 font-poppins">
      <div className="container mx-auto px-4 py-4 flex items-center justify-around">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">School Logo</a>
        </div>

        {/* Search Bar */}
        {/* <div className="hidden md:flex flex-1 mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div> */}

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link
                to={"/courses"}
                className="text-gray-800 hover:text-blue-600"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link to={"/books"} className="text-gray-800 hover:text-blue-600">
                Books
              </Link>
            </li>
            <li>
              <Link
                to={"/resources"}
                className="text-gray-800 hover:text-blue-600"
              >
                Resources
              </Link>
            </li>
          </ul>
        </div>
        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <>
            <div className="flex items-center space-x-2">
              <img
                src=""
                alt={`ababe's profile`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-gray-800">{"abebe"}</span>
            </div>
          </>
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
        className={`fixed top-0 right-0 w-2/3 md:hidden bg-white shadow-lg transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-600">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-600">
                Books
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-600">
                Resources
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
