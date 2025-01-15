import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import SubjectDatatable from "../../../../components/common/dashboard/SubjectDatatable";
import Axios from "../../../../middleware/Axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegSadCry, FaSpinner } from "react-icons/fa"; // Importing spinner and sad icon
import { motion, AnimatePresence } from "framer-motion"; // Add this import
import AddSubjectModal from "./AddSubject"; // Add this import
import { MdAdd } from "react-icons/md";
import ReactDataTable from "../../../../components/common/dashboard/Datatable";
import { useSiteStore } from "../../../../context/siteStore";

const Subject = () => {
  const subjectData = useSiteStore((store) => store.schoolSubject);
  const setSchoolSubjects = useSiteStore((store) => store.setSchoolSubjects);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state

  const headers = [
    { name: "Name", selector: "name" },
    { name: "Grade", selector: "grade_name" },
  ];

  const editGrade = (id) => {
    console.log(id);
    navigate("/school/subjects/edit/" + id);
  };

  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolSubjects/" + id).then((res) => {
      toast.success("Subject deleted successfully");
      setSchoolSubjects();
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
            className="bg-primary flex items-center gap-2 font-light text-sm text-white p-2 rounded-md"
          >
            <MdAdd />
            Add Subject
          </button>

          <AnimatePresence>
            {isModalOpen && (
              <AddSubjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                  setIsModalOpen(false);
                  setSchoolSubjects();
                }}
              />
            )}
          </AnimatePresence>

          {subjectData.length > 0 ? ( // Conditional rendering for subjects data
            <ReactDataTable
              datas={subjectData}
              headers={headers}
              actions={actions}
              used_id={"subject_id"}
            />
          ) : (
            // Display no subjects message
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <FaRegSadCry className="text-6xl mb-2" /> {/* Sad icon */}
              <p>No subjects available.</p>
            </div>
          )}
        </div>

    </div>
  );
};

export default Subject;
