import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import NoticeDatatable from "../../../../components/common/dashboard/NoticeDatatable";
import Axios from "../../../../middleware/Axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Notices = () => {
  const [noticeData, setNoticeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/api/schoolNotices").then((res) => {
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
      toast.success("Notice deleted successfully");
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
            Add Notice
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
