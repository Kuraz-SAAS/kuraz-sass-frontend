import React, { useEffect, useState } from "react";
import Axios from "../../../../middleware/Axios";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Datatable from "../../../../components/common/dashboard/Datatable";
import { useNavigate } from "react-router-dom";

const Grade = () => {
  const [gradesData, setGradeData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/api/schoolGrades").then((res) => {
        console.log(res);
        setGradeData(res.data.school_grades);
      });
    };
    fetchData();
  }, []);

  const headers = ["Name", "Number Of subjects", "Actions"];

  const editGrade = (id) => {
    console.log(id);
    navigate("/school/grades/edit/" + id);
  };
  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolGrades/" + id).then((res) => {
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
        {gradesData.length > 0 && (
          <Datatable datas={gradesData} headers={headers} actions={actions} />
        )}
      </DashboardLayout>
    </div>
  );
};

export default Grade;
