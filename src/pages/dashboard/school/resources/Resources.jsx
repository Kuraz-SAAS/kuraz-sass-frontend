import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Axios from "../../../../middleware/Axios";
import ResourcesDatatable from "../../../../components/common/dashboard/ResourcesDatatable";
import { useNavigate } from "react-router-dom";

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

  const headers = ["Name", "Subject", "Actions"];
  const editGrade = (id) => {
    console.log(id);
    navigate("/school/resources/edit/" + id);
  };
  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolResources/" + id).then((res) => {
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
        {resourceData.length > 0 && (
          <ResourcesDatatable
            datas={resourceData}
            headers={headers}
            actions={actions}
          />
        )}
      </DashboardLayout>
    </div>
  );
};

export default Resources;
