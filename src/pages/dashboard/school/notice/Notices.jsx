import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import NoticeDatatable from "../../../../components/common/dashboard/NoticeDatatable";
import Axios from "../../../../middleware/Axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AddNoticeModal from "./AddNoticeModal";

const Notices = () => {
  const [noticeData, setNoticeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await Axios.get("/api/schoolNotices");
      setNoticeData(res.data.school_notices);
    } catch (error) {
      toast.error("Failed to fetch notices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#bc8c4e] text-white p-2 rounded-md"
          >
            Add Notice
          </button>

          <AnimatePresence>
            {isModalOpen && (
              <AddNoticeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                  setIsModalOpen(false);
                  fetchData();
                }}
              />
            )}
          </AnimatePresence>

          {noticeData?.length > 0 && (
            <NoticeDatatable
              datas={noticeData}
              headers={headers}
              actions={actions}
            />
          )}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Notices;
