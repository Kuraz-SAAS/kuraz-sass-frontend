import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard/student/DashboardLayouts";
import { useSiteStore } from "../../../context/siteStore";
import { MdOutlineMenuBook } from "react-icons/md"; // Import the book icon
import { VideoImage } from "../../../assets/images";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("active");
  const student = useSiteStore((store) => store.studentDashboard);
  const getStudentDashboard = useSiteStore(
    (store) => store.getStudentDashboard
  );

  const ongoing_course = student.ongoing_course;
  const completed_courses = student?.completed_course;

  useEffect(() => {
    getStudentDashboard();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-8 font-poppins">
        {/* Header with tabs */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4 sm:gap-0">
          <button
            onClick={() => setActiveTab("active")}
            className={`py-2 px-4 sm:px-6 rounded-lg transition duration-300 shadow-md ${
              activeTab === "active"
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            Active Courses
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`py-2 px-4 sm:px-6 rounded-lg transition duration-300 shadow-md ${
              activeTab === "completed"
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            Completed Courses
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "active" && (
          <div className="grid gap-6">
            {ongoing_course?.length ? (
              ongoing_course.map((crs, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center"
                >
                  {/* Image section */}
                  <div className="w-24 h-24 mb-4 sm:mb-0">
                    <img
                      src={VideoImage}
                      alt="Course"
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>

                  {/* Course information */}
                  <div className="flex-1 px-6">
                    <h3 className="text-lg font-semibold">
                      {crs?.course_title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {crs?.instructor}
                    </p>
                    <div className="bg-green-500 text-white py-1 px-3 rounded-full text-xs inline-block mt-2">
                      {crs?.category}
                    </div>
                  </div>

                  {/* Progress circle */}
                  <div className="flex-shrink-0 w-12 h-12 border-4 border-green-400 rounded-full flex items-center justify-center text-sm font-semibold">
                    {crs?.total_percentage.toFixed(0)}%
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full flex flex-col items-center">
                <MdOutlineMenuBook className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-600 text-lg">
                  No active courses at the moment.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="grid gap-6">
            {completed_courses?.length ? (
              completed_courses.map((crs, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center"
                >
                  {/* Image section */}
                  <div className="w-24 h-24 mb-4 sm:mb-0">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Course"
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>

                  {/* Course information */}
                  <div className="flex-1 px-6">
                    <h3 className="text-lg font-semibold">
                      {crs?.course_title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {crs?.instructor}
                    </p>
                    <div className="bg-green-500 text-white py-1 px-3 rounded-full text-xs inline-block mt-2">
                      {crs?.category?.category_title}
                    </div>
                  </div>

                  {/* Progress circle */}
                  <div className="flex-shrink-0 w-12 h-12 border-4 border-green-400 rounded-full flex items-center justify-center text-sm font-semibold">
                    100%
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full flex flex-col items-center">
                <MdOutlineMenuBook className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-600 text-lg">
                  You have no completed courses yet!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Courses;
