import React from "react";
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
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-1/5 font-poppins bg-white text-black min-h-screen p-6 flex flex-col">
      {/* student Logo and Name */}
      <div className="flex flex-col items-center justify-center mb-8">
        {/* student Name */}
        <div className="text-lg font-extrabold tracking-wider">
          Student Name
        </div>
      </div>

      {/* Active Links */}
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3 text-gray-300">Active Links</h2>
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
              <span className="font-medium text-sm">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/students"
              className={({ isActive }) =>
                `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`
              }
            >
              <FaUserGraduate className="text-primary mr-2" />
              <span className="font-medium text-sm">Cources</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/notices"
              className={({ isActive }) =>
                `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`
              }
            >
              <FaBell className="text-red-400 mr-2" />
              <span className="font-medium text-sm">Saved Exams</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/settings"
              className={({ isActive }) =>
                `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`
              }
            >
              <FaCog className="text-gray-400 mr-2" />
              <span className="font-medium text-sm">Settings</span>
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
  );
};

export default Sidebar;
