import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserGraduate, FaBook, FaBell, FaCog, FaPencilAlt, FaUniversity, FaChartBar, FaCalendarAlt, FaLock } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
  return (
    <aside className="w-1/5 font-poppins bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 text-white min-h-screen p-6 flex flex-col">
      {/* School Logo and Name */}
      <div className="flex flex-col items-center justify-center mb-8">
        {/* School Name */}
        <div className="text-lg font-extrabold tracking-wider">School Name</div>
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
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <FaTachometerAlt className="text-blue-400 mr-2" />
              <span className="font-medium text-sm">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/school/students"
              className={({ isActive }) =>
                `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <FaUserGraduate className="text-green-400 mr-2" />
              <span className="font-medium text-sm">Students</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/school/resources"
              className={({ isActive }) =>
                `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <FaBook className="text-yellow-400 mr-2" />
              <span className="font-medium text-sm">Resources</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/school/notices"
              className={({ isActive }) =>
                `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <FaBell className="text-red-400 mr-2" />
              <span className="font-medium text-sm">Notices</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/school/settings"
              className={({ isActive }) =>
                `flex items-center py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
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
            <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-gray-700">
              <FaPencilAlt className="text-purple-400 mr-2" />
              <span className="font-medium text-sm">Exams</span>
              <FaLock className="ml-auto text-gray-400" />
            </div>
          </li>
          <li>
            <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-gray-700">
              <FaUniversity className="text-pink-400 mr-2" />
              <span className="font-medium text-sm">Library</span>
              <FaLock className="ml-auto text-gray-400" />
            </div>
          </li>
          <li>
            <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-gray-700">
              <FaChartBar className="text-teal-400 mr-2" />
              <span className="font-medium text-sm">Reports</span>
              <FaLock className="ml-auto text-gray-400" />
            </div>
          </li>
          <li>
            <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-gray-700">
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
