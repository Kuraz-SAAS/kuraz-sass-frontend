import React, { useEffect, useState } from "react";
import Datatable from "../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../pages/layouts/dashboard/school/DashboardLayout";
import { useNavigate } from "react-router-dom";
import Axios from "../../../middleware/Axios";
import StudentDatatable from "../../../components/common/dashboard/StudentDatatable";
import { BiLoaderAlt } from "react-icons/bi";
import CustomPagination from "../../../components/common/CustomPagination";

const Students = () => {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("/api/tenant/admin/students");
        setStudentData(res.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const headers = ["Name", "Email"];

  return (
    <div>
      <DashboardLayout>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <BiLoaderAlt className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <StudentDatatable datas={studentData} headers={headers} />
          </>
        )}
      </DashboardLayout>
    </div>
  );
};

export default Students;
