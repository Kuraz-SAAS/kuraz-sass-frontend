import React, { useEffect, useState } from "react";
import Datatable from "../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../pages/layouts/dashboard/school/DashboardLayout";
import Axios from "../../../middleware/Axios";
import SubjectDatatable from "../../../components/common/dashboard/SubjectDatatable";

const Subject = () => {
  const [subjectData, setSubjectGradeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/api/schoolSubjects").then((res) => {
        console.log(res);
        setSubjectGradeData(res.data.school_subjects);
      });
    };
    fetchData();
  }, []);

  const headers = ["Name", "Grade"];

  return (
    <div>
      <DashboardLayout>
        {subjectData.length > 0 && (
          <SubjectDatatable datas={subjectData} headers={headers} />
        )}
      </DashboardLayout>
    </div>
  );
};

export default Subject;
