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
} from "react-icons/fa"; // Import icons
import { useSiteStore } from "../../../context/siteStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to track sidebar visibility
  const user = useSiteStore((store) => store.user);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <FaBars
        className="text-black absolute md:hidden top-3"
        size={24}
        onClick={() => toggleSidebar()}
      />
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative top-0 left-0 w-64 h-full p-2 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Hamburger Menu Icon */}
        <div className="flex justify-between items-center p-4 bg-gray-200 md:hidden">
          <h1 className="text-lg font-bold">School's Dashboard</h1>
          <button onClick={toggleSidebar}>
            {isOpen && <FaTimes className="text-black" />}
          </button>
        </div>

        {/* School Logo and Name */}
        <div className="flex flex-col gap-x-28 items-center justify-center mb-8 p-4">
          {/* School Name */}
          <div className="text-lg font-extrabold tracking-wider">
            {user?.name}
          </div>
        </div>

        {/* Active Links */}
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-3 text-gray-300">Active Links</h2>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/school/dashboard"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaTachometerAlt className="text-blue-400 mr-2" />
                <span className="font-medium text-sm">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/school/grades"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaUserGraduate className="text-green-400 mr-2" />
                <span className="font-medium text-sm">Grades</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/school/subjects"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaBook className="text-yellow-400 mr-2" />
                <span className="font-medium text-sm">Subjects</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/school/resources"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaBook className="text-yellow-400 mr-2" />
                <span className="font-medium text-sm">Resources</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/school/students"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaUserGraduate className="text-green-400 mr-2" />
                <span className="font-medium text-sm">Students</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/school/notices"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
              >
                <FaBell className="text-red-400 mr-2" />
                <span className="font-medium text-sm">Notices</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Coming Soon Links */}
        <div>
          <h2 className="text-sm font-bold mb-3 text-gray-300">Coming Soon</h2>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaPencilAlt className="text-purple-400 mr-2" />
                <span className="font-medium text-sm">Exams</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaUniversity className="text-pink-400 mr-2" />
                <span className="font-medium text-sm">Library</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaChartBar className="text-teal-400 mr-2" />
                <span className="font-medium text-sm">Reports</span>
                <FaLock className="ml-auto text-gray-400" />
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
                <FaCalendarAlt className="text-orange-400 mr-2" />
                <span className="font-medium text-sm">Scheduler</span>
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
