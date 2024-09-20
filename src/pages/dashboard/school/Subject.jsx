import React, { useEffect, useState } from "react";
import Datatable from "../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../pages/layouts/dashboard/school/DashboardLayout";
import Axios from "../../../middleware/Axios";

const Subject = () => {
  const [resourceData, setResourcesGradeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/api/schoolSubjects").then((res) => {
        console.log(res);
        setResourcesGradeData(res.data.schoolSubjects);
      });
    };
    fetchData();
  }, []);

  const headers = ["Name", "Number Of subjects"];

  return (
    <div>
      <DashboardLayout>
        <Datatable datas={resourceData} headers={headers} />
      </DashboardLayout>
    </div>
  );
};

export default Subject;
