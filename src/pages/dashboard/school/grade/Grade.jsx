import React, { useEffect, useState } from "react";
import Axios from "../../../../middleware/Axios";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Datatable from "../../../../components/common/dashboard/Datatable";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Grade = () => {
  const [gradesData, setGradeData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    await Axios.get("/api/schoolGrades").then((res) => {
      setGradeData(res.data.school_grades);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const headers = ["Name", "Number Of subjects", "Actions"];

  const editGrade = (id) => {
    console.log(id);
    navigate("/school/grades/edit/" + id);
  };
  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolGrades/" + id).then((res) => {
      toast.success("Grade deleted successfully");
      navigate("/school/dashboard");
    });
  };
  const actions = [
    { label: "Edit", function: editGrade },
    { label: "Delete", function: deleteGrade },
  ];
  return (
    <div>
      <DashboardLayout>
        <div>
          <Link to={"add"} className="bg-[#bc8c4e] text-white p-2 rounded-md">
            Add Grade
          </Link>
          {gradesData.length > 0 && (
            <Datatable datas={gradesData} headers={headers} actions={actions} />
          )}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Grade;
