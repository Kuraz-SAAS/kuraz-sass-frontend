import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaBook,
  FaBell,
  FaCog,
  FaPencilAlt,
  FaUniversity,
  FaChartBar,
  FaCalendarAlt,
  FaLock,
  FaBars, // Hamburger icon
  FaTimes, // Close icon
} from "react-icons/fa";
import { useSiteStore } from "../../context/siteStore";
import { BsArrowBarRight } from "react-icons/bs";
import { MdAccountBox } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track sidebar visibility
  const user = useSiteStore((store) => store.user);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Menu Icon */}
      <div className="absolute top-3 left-3  z-50 md:hidden">
        <FaBars className="text-black" size={24} onClick={toggleSidebar} />
      </div>

      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:hidden top-0 left-0 w-64 h-full bg-white p-2 shadow-lg transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0`}
      >
        {/* Close Icon for Mobile View */}
        <div className="flex justify-between items-center p-4 bg-gray-200 md:hidden">
          <h1 className="text-lg font-bold">Student's Dashboard</h1>
          <button onClick={toggleSidebar}>
            <FaTimes className="text-black" />
          </button>
        </div>

        {/* School Logo and Name */}
        <div className="flex flex-col gap-x-28 p-5">
          <div className="text-lg flex gap-2 items-center capitalize font-light tracking-wider">
            <MdAccountBox /> {user?.name}
          </div>
        </div>

        {/* Active Links */}
        <div className="mb-6 p-5">
          <h2 className="text-sm font-light flex items-center gap-2 mb-3">
            <BsArrowBarRight /> Active Links
          </h2>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaTachometerAlt className="text-blue-400 mr-2" />
                <span className="font-light text-sm">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student/courses"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaUserGraduate className="text-green-400 mr-2" />
                <span className="font-light text-sm">Courses</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Coming Soon Links */}
        <div className="px-5">
          <h2 className="text-sm font-light items-center gap-2 mb-3 flex">
            <BsArrowBarRight /> Coming Soon
          </h2>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaPencilAlt className="text-purple-400 mr-2" />
                <span className="font-light text-sm">Exams</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaUniversity className="text-pink-400 mr-2" />
                <span className="font-light text-sm">Library</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaChartBar className="text-teal-400 mr-2" />
                <span className="font-light text-sm">Reports</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaCalendarAlt className="text-orange-400 mr-2" />
                <span className="font-light text-sm">Scheduler</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <aside
        className={`hidden md:block  top-0 left-0 w-64 h-full bg-white p-2 shadow-lg transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0`}
      >
        {/* Close Icon for Mobile View */}
        <div className="flex justify-between items-center p-4 bg-gray-200 md:hidden">
          <h1 className="text-lg font-bold">Student's Dashboard</h1>
          <button onClick={toggleSidebar}>
            <FaTimes className="text-black" />
          </button>
        </div>

        {/* School Logo and Name */}
        <div className="flex flex-col gap-x-28 p-5">
          <div className="text-lg flex gap-2 items-center capitalize font-light tracking-wider">
            <MdAccountBox /> {user?.name}
          </div>
        </div>

        {/* Active Links */}
        <div className="mb-6 p-5">
          <h2 className="text-sm font-light flex items-center gap-2 mb-3">
            <BsArrowBarRight /> Active Links
          </h2>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaTachometerAlt className="text-blue-400 mr-2" />
                <span className="font-light text-sm">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student/courses"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaUserGraduate className="text-green-400 mr-2" />
                <span className="font-light text-sm">Courses</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Coming Soon Links */}
        <div className="px-5">
          <h2 className="text-sm font-light items-center gap-2 mb-3 flex">
            <BsArrowBarRight /> Coming Soon
          </h2>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaPencilAlt className="text-purple-400 mr-2" />
                <span className="font-light text-sm">Exams</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaUniversity className="text-pink-400 mr-2" />
                <span className="font-light text-sm">Library</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaChartBar className="text-teal-400 mr-2" />
                <span className="font-light text-sm">Reports</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaCalendarAlt className="text-orange-400 mr-2" />
                <span className="font-light text-sm">Scheduler</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
