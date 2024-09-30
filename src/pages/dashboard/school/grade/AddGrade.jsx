import React, { useState } from "react";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Axios from "../../../../middleware/Axios";
import { useNavigate } from "react-router-dom"; // For navigation
import { toast } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // Import the styles

const AddGrade = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Hook for navigating

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/api/schoolGrades", { name });
      toast.success("Grade added successfully!"); // Show success notification
      console.log(res);
      navigate(-1); // Navigate back to the previous route
    } catch (err) {
      toast.error("Failed to add grade. Please try again."); // Show error notification
      console.error(err);
    }
  };

  return (
    <div>
      <DashboardLayout>
        <form
          onSubmit={handleSubmit}
          className="max-w-sm pt-10 mx-auto grid gap-6"
        >
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Grade Name
          </label>
          <input
            type="text"
            id="base-input"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Grade
          </button>
        </form>
      </DashboardLayout>
    </div>
  );
};

export default AddGrade;
