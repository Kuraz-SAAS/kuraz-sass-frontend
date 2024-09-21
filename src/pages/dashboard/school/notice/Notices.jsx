import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import NoticeDatatable from "../../../../components/common/dashboard/NoticeDatatable";
import Axios from "../../../../middleware/Axios";
import { useNavigate } from "react-router-dom";

const Notices = () => {
  const [noticeData, setNoticeGradeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/api/schoolNotices").then((res) => {
        console.log(res);
        setNoticeGradeData(res.data.notices);
      });
    };
    fetchData();
  }, []);

  const headers = ["Title", "Description", "Actions"];
  const editGrade = (id) => {
    console.log(id);
    navigate("/school/notice/edit/" + id);
  };
  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolNotice/" + id).then((res) => {
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
        <NoticeDatatable
          datas={noticeData}
          headers={headers}
          actions={actions}
        />
      </DashboardLayout>
    </div>
  );
};

export default Notices;
