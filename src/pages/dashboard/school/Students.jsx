import React, { useEffect, useState } from "react";
import Datatable from "../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../pages/layouts/dashboard/school/DashboardLayout";
import { useNavigate } from "react-router-dom";
import Axios from "../../../middleware/Axios";
import StudentDatatable from "../../../components/common/dashboard/StudentDatatable";

const Students = () => {
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/api/tenant/admin/students").then((res) => {
        console.log(res);
        setStudentData(res.data.students);
      });
    };
    fetchData();
  }, []);

  const headers = ["Name", "Email"];

  return (
    <div>
      <DashboardLayout>
        <StudentDatatable datas={studentData} headers={headers} />
      </DashboardLayout>
    </div>
  );
};

export default Students;
