import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaCog,
  FaPencilAlt,
  FaUniversity,
  FaChartBar,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";
import { useSiteStore } from "../../context/siteStore";

const Sidebar = () => {
  const user = useSiteStore((store) => store.user);

  return (
    <aside className=" md:w-1/5 font-poppins bg-white text-black min-h-screen p-6 flex flex-col">
      {/* student Logo and Name */}
      <div className="flex flex-col gap-x-28 items-center justify-center mb-8 hidden md:flex">
        {/* School Name */}
        <h1 className="text-xl font-semibold">Student's Dashboard</h1>
        <div className="text-lg font-extrabold tracking-wider">
          {user?.name}
        </div>
      </div>

      {/* Active Links */}
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3 text-gray-300 hidden md:block">
          Active Links
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
              <span className="font-medium text-sm hidden md:block">
                Dashboard
              </span>
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
              <FaUserGraduate className="text-primary mr-2" />
              <span className="font-medium text-sm hidden md:block">
                Courses
              </span>
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
              <span className="font-medium text-sm hidden md:block">
                Settings
              </span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Coming Soon Links */}
      <div>
        <h2 className="text-sm font-bold mb-3 text-gray-300 hidden md:block">
          Coming Soon
        </h2>
        <ul className="space-y-2">
          <li>
            <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
              <FaPencilAlt className="text-purple-400 mr-2" />
              <span className="font-medium text-sm hidden md:block">Exams</span>
              <FaLock className="ml-auto text-gray-400" />
            </div>
          </li>
          <li>
            <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
              <FaUniversity className="text-pink-400 mr-2" />
              <span className="font-medium text-sm hidden md:block">
                Library
              </span>
              <FaLock className="ml-auto text-gray-400" />
            </div>
          </li>
          <li>
            <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
              <FaChartBar className="text-teal-400 mr-2" />
              <span className="font-medium text-sm hidden md:block">
                Reports
              </span>
              <FaLock className="ml-auto text-gray-400" />
            </div>
          </li>
          <li>
            <div className="flex items-center py-2 px-3 rounded-lg transition-colors duration-300 cursor-not-allowed hover:bg-black hover:text-white">
              <FaCalendarAlt className="text-orange-400 mr-2" />
              <span className="font-medium text-sm hidden md:block">
                Scheduler
              </span>
              <FaLock className="ml-auto text-gray-400" />
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
