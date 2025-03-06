import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Axios from "../../../../middleware/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.patch("/api/schoolNotices/" + params?.id, {
      title,
      description,
    }).then((res) => {
      toast.success("Notice updated successfully");
      navigate("/school/dashboard");
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm pt-10 mx-auto grid gap-6"
      >
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input
          type="text"
          id="base-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <textarea
          type="text"
          id="base-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Grade
        </button>
      </form>
    </div>
  );
};

export default EditNotice;
