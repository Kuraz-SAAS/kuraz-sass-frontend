import { motion, AnimatePresence } from "framer-motion"; // Add this import
import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Axios from "../../../../middleware/Axios";
import ResourcesDatatable from "../../../../components/common/dashboard/ResourcesDatatable";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegSadCry, FaSpinner } from "react-icons/fa"; // Importing spinner and sad icon

const Resources = () => {
  const [resourceData, setResourcesGradeData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this state
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const res = await Axios.get("/api/schoolResources");
      console.log(res);
      setResourcesGradeData(res.data.school_resources);
    } catch (error) {
      toast.error("Failed to fetch resources.");
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await Axios.get("/api/schoolSubjects");
        setSubjects(res.data.school_subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("subject_id", subject);
    formData.append("file", file);

    try {
      await Axios.post("/api/schoolResources", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Resources added successfully!");
      setIsModalOpen(false);
      fetchData(); // Refresh the resources list
      // Reset form
      setName("");
      setSubject("");
      setFile(null);
    } catch (error) {
      toast.error("Error adding resource");
    } finally {
      setIsSubmitting(false);
    }
  };

  const headers = ["Name", "Subject", "Grade", "Actions"];

  const editGrade = (id) => {
    console.log(id);
    navigate("/school/resources/edit/" + id);
  };

  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolResources/" + id).then((res) => {
      toast.success("Resource deleted successfully");
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
            Add Resources
          </button>

          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 z-50 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Overlay */}
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsModalOpen(false)}
                />

                {/* Modal content */}
                <div className="flex min-h-screen z-30 relative items-center justify-center p-4">
                  <motion.div
                    className="bg-white p-8 rounded-lg w-[600px] shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{
                      type: "spring",
                      duration: 0.3,
                      delay: 0.15,
                      bounce: 0.25,
                    }}
                  >
                    <motion.h2
                      className="text-xl font-bold mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Add Learning Resources
                    </motion.h2>
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {/* Resource Name Input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900">
                          Resource Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                      </div>

                      {/* Subject Select */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900">
                          Subject
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        >
                          <option value="">Select Subject</option>
                          {subjects.map((subj) => (
                            <option
                              key={subj.subject_id}
                              value={subj.subject_id}
                            >
                              {subj.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* File Upload */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900">
                          Upload File
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => setFile(e.target.files[0])}
                              required
                            />
                          </label>
                        </div>
                        {file && (
                          <p className="mt-2 text-sm text-gray-500">
                            Selected file: {file.name}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5" /* ... spinner SVG ... */
                              />
                              Saving...
                            </>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    </motion.form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? ( // Conditional rendering for loading state
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-3xl" />{" "}
              {/* Spinner icon */}
            </div>
          ) : resourceData.length > 0 ? ( // Conditional rendering for resources data
            <ResourcesDatatable
              datas={resourceData}
              headers={headers}
              actions={actions}
            />
          ) : (
            // Display no resources message
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <FaRegSadCry className="text-6xl mb-2" /> {/* Sad icon */}
              <p>No resources available.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Resources;
