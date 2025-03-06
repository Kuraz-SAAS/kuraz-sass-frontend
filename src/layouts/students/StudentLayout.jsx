import React, { useEffect, useState } from "react";
import { useSiteStore } from "../../context/siteStore";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import { ImSpinner10 } from "react-icons/im";

const StudentLayout = () => {
  const getCourses = useSiteStore((store) => store.getCourses);
  const setSchoolGrades = useSiteStore((store) => store.setSchoolGrades);
  const setBooks = useSiteStore((store) => store.setBooks);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCourses();
    setSchoolGrades();
    setBooks();
    setLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <ImSpinner10 className="animate-spin text-primary" size={80} />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default StudentLayout;
