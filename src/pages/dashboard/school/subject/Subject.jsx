import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import SubjectDatatable from "../../../../components/common/dashboard/SubjectDatatable";
import Axios from "../../../../middleware/Axios";
import { useNavigate } from "react-router-dom";

const Subject = () => {
  const [subjectData, setSubjectGradeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/api/schoolSubjects").then((res) => {
        console.log(res);
        setSubjectGradeData(res.data.school_subjects);
      });
    };
    fetchData();
  }, []);

  const headers = ["Name", "Grade", "Action"];
  const editGrade = (id) => {
    console.log(id);
    navigate("/school/subjects/edit/" + id);
  };
  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolSubjects/" + id).then((res) => {
      console.log(res);
    });
  };
  const actions = [
    { label: "Edit", function: editGrade },
    { label: "Delete", function: deleteGrade },
  ];

  return (
    <div>
      <DashboardLayout>
        {subjectData.length > 0 && (
          <SubjectDatatable
            datas={subjectData}
            headers={headers}
            actions={actions}
          />
        )}
      </DashboardLayout>
    </div>
  );
};

export default Subject;
