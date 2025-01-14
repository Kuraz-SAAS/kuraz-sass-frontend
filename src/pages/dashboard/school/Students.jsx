import React, { useEffect, useState } from "react";
import Datatable from "../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../pages/layouts/dashboard/school/DashboardLayout";
import { useNavigate } from "react-router-dom";
import Axios from "../../../middleware/Axios";
import StudentDatatable from "../../../components/common/dashboard/StudentDatatable";
import { BiLoaderAlt } from "react-icons/bi";
import CustomPagination from "../../../components/common/CustomPagination";
import { useSiteStore } from "../../../context/siteStore";

const Students = () => {
  const studentData = useSiteStore((store) => store.schoolStudents);

  const headers = [
    { name: "Name", selector: "name" },
    { name: "Email", selector: "email" },
  ];

  return (
    <div>
      <DashboardLayout>
        <>
          <StudentDatatable
            datas={studentData}
            headers={headers}
            actions={[]}
          />
        </>
      </DashboardLayout>
    </div>
  );
};

export default Students;
