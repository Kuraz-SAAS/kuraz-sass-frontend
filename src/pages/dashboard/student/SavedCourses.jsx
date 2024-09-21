import React, { useState } from "react";
import DashboardLayout from "../../layouts/dashboard/student/DashboardLayouts";

const SavedCourses = () => {
  const [activeTab, setActiveTab] = useState("active"); // State to track the active tab

  return (
    <DashboardLayout>
      <div className="p-8 font-poppins">
        {/* Header with tabs */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setActiveTab("active")}
            className={`py-2 px-6 rounded-lg shadow-md ${
              activeTab === "active"
                ? "bg-green-300 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            Saved Courses
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`py-2 px-6 rounded-lg shadow-md ${
              activeTab === "completed"
                ? "bg-green-300 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            Saved Books
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "active" && (
          <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
            {/* Image section */}
            <div className="w-24 h-24">
              <img
                src="https://via.placeholder.com/100"
                alt="Laravel Course"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>

            {/* Course information */}
            <div className="flex-1 px-6">
              <h3 className="text-lg font-semibold">
                Develop Restaurant Website Using Laravel
              </h3>
              <p className="text-sm text-gray-500 mt-2">Biruk Mamo</p>
              <div className="bg-green-400 text-white py-1 px-3 rounded-full text-xs inline-block mt-2">
                Software Development
              </div>
            </div>

            {/* Progress circle */}
            <div className="flex-shrink-0 w-16 h-16 border-4 border-gray-300 rounded-full flex items-center justify-center text-lg font-semibold">
              0.0%
            </div>
          </div>
        )}

        {activeTab === "completed" && (
          <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-600">
              You have no completed courses yet!
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SavedCourses;
