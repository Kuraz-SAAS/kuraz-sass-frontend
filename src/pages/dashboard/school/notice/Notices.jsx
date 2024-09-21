import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import NoticeDatatable from "../../../../components/common/dashboard/NoticeDatatable";
import Axios from "../../../../middleware/Axios";
import { Link, useNavigate } from "react-router-dom";

const Notices = () => {
  const [noticeData, setNoticeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/api/schoolNotices").then((res) => {
        console.log(res);
        setNoticeData(res.data.notices);
      });
    };
    fetchData();
  }, []);

  const headers = ["Title", "Description", "Actions"];
  const editGrade = (id) => {
    console.log(id);
    navigate("/school/notices/edit/" + id);
  };
  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolNotices/" + id).then((res) => {
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
        <div>
          <Link to={"add"} className="bg-[#bc8c4e] text-white p-2 rounded-md">
            Add Grade
          </Link>
        </div>
        {noticeData.length > 0 && (
          <NoticeDatatable
            datas={noticeData}
            headers={headers}
            actions={actions}
          />
        )}
      </DashboardLayout>
    </div>
  );
};

export default Notices;
