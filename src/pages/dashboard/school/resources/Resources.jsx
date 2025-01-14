import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/common/dashboard/Datatable";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Axios from "../../../../middleware/Axios";
import ResourcesDatatable from "../../../../components/common/dashboard/ResourcesDatatable";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegSadCry, FaSpinner } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import ReactDataTable from "../../../../components/common/dashboard/Datatable";
import { useSiteStore } from "../../../../context/siteStore";

const Resources = () => {
  const resourceData = useSiteStore((store) => store.schoolResources);
  const [loading, setLoading] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true); // Loading state for subjects
  const subjects = useSiteStore((store) => store.schoolSubject);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const setSchoolResources = useSiteStore((store) => store.setSchoolResources);

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
      setSchoolResources();
      setName("");
      setSubject("");
      setFile(null);
    } catch (error) {
      toast.error("Error adding resource");
    } finally {
      setIsSubmitting(false);
    }
  };

  const headers = [
    { name: "Name", selector: "name" },
    { name: "Subject", selector: "subject" },
    { name: "Grade", selector: "grade" },
  ];

  const editGrade = (id) => {
    navigate("/school/resources/edit/" + id);
  };

  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolResources/" + id).then((res) => {
      toast.success("Resource deleted successfully");
      setSchoolResources();
    });
  };

  const actions = [
    { label: "Edit", function: editGrade },
    { label: "Delete", function: deleteGrade },
  ];

  const handleAddSubject = () => {
    navigate("/school/subjects"); // Redirect to add subject page
  };

  return (
    <div>
      <DashboardLayout>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary flex items-center gap-2 text-sm font-light text-white p-2 rounded-md"
          >
            <MdAdd />
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
                        {subjects.length === 0 ? (
                          <div className="text-red-600">
                            <p>
                              No subjects available. Please add a subject first.
                            </p>
                            <button
                              onClick={handleAddSubject}
                              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Add Subject
                            </button>
                          </div>
                        ) : (
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
                                {subj.grade_name} - - {subj.name}
                              </option>
                            ))}
                          </select>
                        )}
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
                          disabled={isSubmitting || subjects.length === 0}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin h-5 w-5" />
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
          {resourceData.length > 0 ? (
            <ReactDataTable
              datas={resourceData.map((resource) => ({
                ...resource,
                subject: resource.subjects.name,
                grade: resource.subjects.grade_name,
              }))}
              headers={headers}
              actions={actions}
              used_id={"resource_id"}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <FaRegSadCry className="text-6xl mb-2" />
              <p>No resources available.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Resources;
