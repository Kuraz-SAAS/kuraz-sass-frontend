import React, { useEffect, useState } from "react";
import Axios from "../../../../middleware/Axios";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Datatable from "../../../../components/common/dashboard/Datatable";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegSadCry, FaSpinner, FaCheck } from "react-icons/fa"; // Importing spinner icon from React Icons
import { motion, AnimatePresence } from "framer-motion"; // Add this import
import { MdAdd } from "react-icons/md";
import ReactDataTable from "../../../../components/common/dashboard/Datatable";
import { useSiteStore } from "../../../../context/siteStore";
import { Button } from "@/components/ui/button";

const Grade = () => {
  const gradesData = useSiteStore((store) => store.schoolGrades);
  const setSchoolGrades = useSiteStore((store) => store.setSchoolGrades);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add this state
  const [gradeToDelete, setGradeToDelete] = useState(null); // Add this state
  const [selectedGrades, setSelectedGrades] = useState([]); // Add this state
  const [isSavingGrades, setIsSavingGrades] = useState(false);

  const staticGrades = Array.from({ length: 12 }, (_, i) => ({
    grade_id: i + 1,
    name: `Grade ${i + 1}`,
  }));

  const headers = [
    { name: "Name", selector: "name" },
    { name: "Number Of subjects", selector: "subjects_count" },
  ];

  const editGrade = (id) => {
    const grade = gradesData.find((g) => g.grade_id === id);
    setSelectedGrade(grade);
    setUpdateName(grade?.name);
    setIsUpdateModalOpen(true);
  };

  const deleteGrade = async (id) => {
    setGradeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await Axios.delete("/api/schoolGrades/" + gradeToDelete);
      toast.success("Grade deleted successfully");
      setSchoolGrades();
    } catch (error) {
      toast.error("Failed to delete grade");
    } finally {
      setIsDeleteModalOpen(false);
      setGradeToDelete(null);
    }
  };

  const actions = [
    { label: "Edit", function: editGrade },
    { label: "Delete", function: deleteGrade },
  ];

  // Add handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await Axios.post("/api/schoolGrades", { name });
      toast.success("Grade added successfully!");
      setIsModalOpen(false);
      setSchoolGrades();
      setName("");
    } catch (err) {
      toast.error("Failed to add grade. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await Axios.patch(`/api/schoolGrades/${selectedGrade.grade_id}`, {
        name: updateName,
      });
      toast.success("Grade updated successfully!");
      setIsUpdateModalOpen(false);
      setSchoolGrades();
    } catch (err) {
      toast.error("Failed to update grade. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this function to handle grade selection
  const toggleGradeSelection = (gradeId) => {
    setSelectedGrades((prev) => {
      if (prev.includes(gradeId)) {
        return prev.filter((id) => id !== gradeId);
      } else {
        return [...prev, gradeId];
      }
    });
  };

  // Add this function to handle sending selections to backend
  const handleSaveSelections = async () => {
    setIsSavingGrades(true);
    try {
      const selectedGradeNames = selectedGrades.map(
        (gradeId) =>
          staticGrades.find((grade) => grade.grade_id === gradeId)?.name
      );
      await Axios.post("/api/grades/import", {
        grades: selectedGradeNames,
      });
      setSchoolGrades(); // Wait for the data to be fetched
      toast.success("Grade suggestions saved successfully!");
      setSelectedGrades([]); // Reset selections after saving
    } catch (error) {
      toast.error("Failed to save grade suggestions.");
    } finally {
      setIsSavingGrades(false);
    }
  };

  return (
    <div>
      <div>
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
                    className="text-xl font-light mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Add Grade
                  </motion.h2>
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">
                        Grade Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setIsModalOpen(false)}
                        className=""
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="outline"
                        disabled={isSubmitting}
                        className=""
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin h-5 w-5" />
                            Saving...
                          </>
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </div>
                  </motion.form>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Update Grade Modal */}
        <AnimatePresence>
          {isUpdateModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsUpdateModalOpen(false)}
              />

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
                    className="text-xl font-light mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Update Grade
                  </motion.h2>
                  <motion.form
                    onSubmit={handleUpdate}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">
                        Grade Name
                      </label>
                      <input
                        type="text"
                        value={updateName}
                        onChange={(e) => setUpdateName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setIsUpdateModalOpen(false)}
                        className=""
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="outline"
                        disabled={isSubmitting}
                        className=""
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin h-5 w-5" />
                            Updating...
                          </>
                        ) : (
                          "Update"
                        )}
                      </Button>
                    </div>
                  </motion.form>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Add this Delete Confirmation Modal */}
        <AnimatePresence>
          {isDeleteModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsDeleteModalOpen(false)}
              />

              <div className="flex min-h-screen z-30 relative items-center justify-center p-4">
                <motion.div
                  className="bg-white p-8 rounded-lg w-[400px] shadow-xl"
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
                  <h2 className="text-xl font-light mb-4">Confirm Delete</h2>
                  <p className="mb-6">
                    Are you sure you want to delete this grade?
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setIsDeleteModalOpen(false)}
                      className=""
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      onClick={confirmDelete}
                      className=" bg-red-500  hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Add this section before the data table */}
        <div className="mt-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">Suggested Grades</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {staticGrades
              .filter(
                (grade) =>
                  !gradesData.some(
                    (g) => g.name.toLowerCase() === grade.name.toLowerCase()
                  )
              )
              .map((grade) => (
                <div
                  key={grade.grade_id}
                  onClick={() => toggleGradeSelection(grade.grade_id)}
                  className={`border border-primary border-dashed p-4 rounded-lg cursor-pointer transition-all ${
                    selectedGrades.includes(grade.grade_id)
                      ? "bg-[#bc8c4e] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{grade.name}</span>
                    {selectedGrades.includes(grade.grade_id) && (
                      <FaCheck className="text-white" />
                    )}
                  </div>
                </div>
              ))}
          </div>
          {selectedGrades.length > 0 && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSaveSelections}
                disabled={isSavingGrades}
                className="bg-[#bc8c4e] text-white px-4 py-2 rounded-md hover:bg-[#a67b43] disabled:opacity-50 flex items-center gap-2"
              >
                {isSavingGrades ? (
                  <>
                    <FaSpinner className="animate-spin h-5 w-5" />
                    Saving...
                  </>
                ) : (
                  "Save Grades"
                )}
              </button>
            </div>
          )}
        </div>
        {gradesData.length > 0 ? ( // Conditional rendering for grades data
          <ReactDataTable
            datas={gradesData.map((grade) => ({
              ...grade,
              subjects_count: grade.subjects ? grade.subjects.length : 0,
            }))}
            headers={headers}
            actions={actions}
            used_id={"grade_id"}
          />
        ) : (
          // Display no grades message
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <FaRegSadCry className="text-6xl mb-2" /> {/* Sad icon */}
            <p>No grades available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grade;
