import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/school/dashboard/Sidebar";
import TopNavbar from "../../../../components/school/dashboard/TopNavbar";
import { useSiteStore } from "../../../../context/siteStore";
import { ImSpinner10 } from "react-icons/im";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const setSchoolDashboard = useSiteStore((store) => store.setSchoolDashboard);
  const setSchoolStudents = useSiteStore((store) => store.setSchoolStudents);
  const setSchoolSubjects = useSiteStore((store) => store.setSchoolSubjects);
  const setSchoolResources = useSiteStore((store) => store.setSchoolResources);
  const setSchoolNotice = useSiteStore((store) => store.setSchoolNotice);
  const setSchoolGrade = useSiteStore((store)=>store.setSchoolGrades);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          setSchoolDashboard(),
          setSchoolStudents(),
          setSchoolSubjects(),
          setSchoolResources(),
          setSchoolNotice(),
          setSchoolGrade()
        ]);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
          {isLoading ? (
            <div className="flex items-center justify-center h-screen w-full">
              <ImSpinner10 className="animate-spin text-primary" size={80} />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
