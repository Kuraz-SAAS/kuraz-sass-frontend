import React from "react";
import Sidebar from "../../../../components/student/Sidebar";
import TopNavbar from "../../../../components/student/TopNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen font-poppins">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <TopNavbar />

        {/* Main content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
