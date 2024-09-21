import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../pages/layouts/dashboard/school/DashboardLayout";
import Axios from "../../../middleware/Axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const feachDashboard = async () => {
      await Axios.get("api/tenant/admin/dashboard").then((res) => {
        setDashboardData(res.data);
      });
    };

    feachDashboard();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
          <div className="text-3xl font-semibold mb-2">
            {dashboardData?.total_students}
          </div>
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
        <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
          <div className="text-3xl font-semibold mb-2">
            {dashboardData?.total_grades}
          </div>
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
        <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
          <div className="text-3xl font-semibold mb-2">
            {dashboardData?.total_resources}
          </div>
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
        <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
          <div className="text-3xl font-semibold mb-2">
            {dashboardData?.total_notices}
          </div>
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
  );
};

export default Dashboard;
