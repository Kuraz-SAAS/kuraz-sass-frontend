import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Axios from "../../../../middleware/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateResource = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const params = useParams();
  const navigate = useNavigate(); // Hook for navigating

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await Axios.patch("/api/schoolSubjects/" + params?.id);
        setSubjects(res.data.school_subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to hold form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("subject_id", subject); // Send the subject_id to the backend
    formData.append("file", file); // Only append if file is selected

    // You can now send the formData via your API request, e.g., using Axios:
    try {
      const response = await Axios.post("/api/schoolResources", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Resources updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error adding grade:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm pt-10 mx-auto grid gap-6">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Grade Name
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
        value={subject}
        onChange={(e) => setSubject(e.target.value)} // Store subject_id in state
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select Subject</option>
        {subjects.map((subj) => (
          <option key={subj.subject_id} value={subj.subject_id}>
            {subj.name}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        File
      </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Grade
      </button>
    </form>
  );
};

export default UpdateResource;
