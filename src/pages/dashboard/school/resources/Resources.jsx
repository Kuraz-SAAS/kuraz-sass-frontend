import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Axios from "../../../../middleware/Axios";
import ResourcesDatatable from "../../../../components/common/dashboard/ResourcesDatatable";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Resources = () => {
  const [resourceData, setResourcesGradeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/api/schoolResources").then((res) => {
        console.log(res);
        setResourcesGradeData(res.data.school_resources);
      });
    };
    fetchData();
  }, []);

  const headers = ["Name", "Subject", "Grade", "Actions"];
  const editGrade = (id) => {
    console.log(id);
    navigate("/school/resources/edit/" + id);
  };
  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolResources/" + id).then((res) => {
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
            Add Resources
          </Link>
          {resourceData.length > 0 && (
            <ResourcesDatatable
              datas={resourceData}
              headers={headers}
              actions={actions}
            />
          )}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Resources;
