import { useEffect, useState } from "react";
import Axios from "../../../../middleware/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { useSiteStore } from "../../../../context/siteStore";
import { Button } from "@/components/ui/button";

const AddSubjectModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const grades = useSiteStore((store) => store.schoolGrades);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await Axios.post("/api/schoolSubjects", {
        name,
        grade_id: grade,
      });

      toast.success("Subject added successfully");
      onSuccess();
      // Reset form
      setName("");
      setGrade("");
    } catch (error) {
      toast.error("Error adding subject");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddGrade = () => {
    navigate("/school/grades"); // Redirect to the page for adding grades
  };

  return (
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
        onClick={onClose}
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
            Add Subject
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Subject Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Subject Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            {/* Grade Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Grade
              </label>
              {grades.length === 0 ? (
                <div className="text-red-600">
                  <p>No grades available. Please add a grade first.</p>
                  <button
                    onClick={handleAddGrade}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Grade
                  </button>
                </div>
              ) : (
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select Grade</option>
                  {grades.map((grade) => (
                    <option key={grade.grade_id} value={grade.grade_id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className=""
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                disabled={isSubmitting || grades.length === 0}
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
  );
};

export default AddSubjectModal;
