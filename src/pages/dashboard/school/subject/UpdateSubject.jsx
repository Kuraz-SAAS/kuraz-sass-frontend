import { useEffect, useState } from "react";
import Axios from "../../../../middleware/Axios";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateSubject = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [grade, setGrade] = useState(null);
  const [grades, setGrades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await Axios.patch("/api/schoolGrades");
        setGrades(res.data.school_grades);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("/api/schoolSubjects", {
        name,
        grade_id: grade,
      });
      toast.success("Subject updated successfully");
      navigate("/school/dashboard");
    } catch (error) {
      console.error("Error adding grade:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm pt-10 mx-auto grid gap-6">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Subject Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter grade name"
      />

      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Subject
      </label>
      <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)} // Store subject_id in state
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select Grade</option>
        {grades.map((grade) => (
          <option key={grade.grade_id} value={grade.grade_id}>
            {grade.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Update Subject
      </button>
    </form>
  );
};

export default UpdateSubject;
