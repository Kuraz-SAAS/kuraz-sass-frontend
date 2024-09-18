import React from 'react';
import DashboardLayout from '../../../pages/layouts/dashboard/school/DashboardLayout'


const Dashboard = () => {

    const students = 12;
    const grades = 24;
    const resources = 13
    const upcomingEvents = 21;


  return (

    <DashboardLayout>
      <div className="grid grid-cols-4 gap-4 mb-8">
    
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="text-3xl font-semibold mb-2">{students}</div>
          <div className="mt-1 flex items-center text-sm font-medium">
            <span>Total Students</span>
            <svg
              className="ml-1 w-5 h-5 text-white opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 20l9 2-2-9-9-9-9 9 9 9z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Total Grades Card */}
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="text-3xl font-semibold mb-2">{grades}</div>
          <div className="mt-1 flex items-center text-sm font-medium">
            <span>Total Grades</span>
            <svg
              className="ml-1 w-5 h-5 text-white opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        {/* Total Resources Card */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="text-3xl font-semibold mb-2">{resources}</div>
          <div className="mt-1 flex items-center text-sm font-medium">
            <span>Total Resources</span>
            <svg
              className="ml-1 w-5 h-5 text-white opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3h14v18H5z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Upcoming Events Card */}
        <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="text-3xl font-semibold mb-2">{upcomingEvents}</div>
          <div className="mt-1 flex items-center text-sm font-medium">
            <span>Upcoming Events</span>
            <svg
              className="ml-1 w-5 h-5 text-white opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16l2-2-2-2m8 4l-2-2 2-2"
              ></path>
            </svg>
          </div>
        </div>
      </div>
  </DashboardLayout>
  )
}

export default Dashboard