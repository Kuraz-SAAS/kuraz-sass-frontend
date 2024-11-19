import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import SubjectDatatable from "../../../../components/common/dashboard/SubjectDatatable";
import Axios from "../../../../middleware/Axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegSadCry, FaSpinner } from "react-icons/fa"; // Importing spinner and sad icon
import { motion, AnimatePresence } from "framer-motion"; // Add this import
import AddSubjectModal from "./AddSubject"; // Add this import

const Subject = () => {
  const [subjectData, setSubjectGradeData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("/api/schoolSubjects");
        console.log(res);
        setSubjectGradeData(res.data.school_subjects);
      } catch (error) {
        toast.error("Failed to fetch subjects.");
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };
    fetchData();
  }, []);

  const headers = ["Name", "Grade", "Actions"];

  const editGrade = (id) => {
    console.log(id);
    navigate("/school/subjects/edit/" + id);
  };

  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolSubjects/" + id).then((res) => {
      toast.success("Subject deleted successfully");
      fetchData(); // Refresh data after deletion
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
            Add Subject
          </button>

          <AnimatePresence>
            {isModalOpen && (
              <AddSubjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                  setIsModalOpen(false);
                  fetchData();
                }}
              />
            )}
          </AnimatePresence>

          {loading ? ( // Conditional rendering for loading state
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-3xl" />{" "}
              {/* Spinner icon */}
            </div>
          ) : subjectData.length > 0 ? ( // Conditional rendering for subjects data
            <SubjectDatatable
              datas={subjectData}
              headers={headers}
              actions={actions}
            />
          ) : (
            // Display no subjects message
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <FaRegSadCry className="text-6xl mb-2" /> {/* Sad icon */}
              <p>No subjects available.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Subject;
