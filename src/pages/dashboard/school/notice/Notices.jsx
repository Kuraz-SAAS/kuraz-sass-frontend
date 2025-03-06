import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import NoticeDatatable from "../../../../components/common/dashboard/NoticeDatatable";
import Axios from "../../../../middleware/Axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AddNoticeModal from "./AddNoticeModal";
import { MdAdd } from "react-icons/md";
import { useSiteStore } from "../../../../context/siteStore";

const Notices = () => {
  const noticeData = useSiteStore((store) => store.schoolNotice);
  const setSchoolNotice = useSiteStore((store) => store.setSchoolNotice);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const headers = ["Title", "Description", "Actions"];
  const editGrade = (id) => {
    console.log(id);
    navigate("/school/notices/edit/" + id);
  };
  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolNotices/" + id).then((res) => {
      toast.success("Notice deleted successfully");
      setSchoolNotice();
      navigate("/school/dashboard");
    });
  };
  const actions = [
    { label: "Edit", function: editGrade },
    { label: "Delete", function: deleteGrade },
  ];

  return (
    <div>
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary font-light text-sm flex items-center gap-2 text-white p-2 rounded-md"
        >
          <MdAdd />
          Add Notice
        </button>

        <AnimatePresence>
          {isModalOpen && (
            <AddNoticeModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                setSchoolNotice();
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
    </div>
  );
};

export default Notices;
