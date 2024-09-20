import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Axios from "../../../../middleware/Axios";

const UpdateGrade = () => {
  const [name, setName] = useState("");
  const handleSummit = async (e) => {
    e.preventDefault();

    await Axios.patch(`/api/schoolGrades/${id}`, { name }).then((reponse) => {
      console.log(reponse);
    });
  };

  return (
    <div>
      <DashboardLayout>
        <form
          onSubmit={handleSummit}
          className="max-w-sm pt-10 mx-auto grid gap-6"
        >
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Grade Name
          </label>
          <input
            type="text"
            id="base-input"
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

export default UpdateGrade;
