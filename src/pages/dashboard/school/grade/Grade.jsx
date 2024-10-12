import React, { useEffect, useState } from "react";
import Axios from "../../../../middleware/Axios";
import DashboardLayout from "../../../layouts/dashboard/school/DashboardLayout";
import Datatable from "../../../../components/common/dashboard/Datatable";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegSadCry, FaSpinner } from "react-icons/fa"; // Importing spinner icon from React Icons

const Grade = () => {
  const [gradesData, setGradeData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await Axios.get("/api/schoolGrades");
      setGradeData(res.data.school_grades);
    } catch (error) {
      toast.error("Failed to fetch grades.");
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const headers = ["Name", "Number Of subjects", "Actions"];

  const editGrade = (id) => {
    console.log(id);
    navigate("/school/grades/edit/" + id);
  };

  const deleteGrade = async (id) => {
    await Axios.delete("/api/schoolGrades/" + id).then((res) => {
      toast.success("Grade deleted successfully");
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
          <Link to={"add"} className="bg-[#bc8c4e] text-white p-2 rounded-md">
            Add Grade
          </Link>
          {loading ? ( // Conditional rendering for loading state
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-3xl" />{" "}
              {/* Spinner icon */}
            </div>
          ) : gradesData.length > 0 ? ( // Conditional rendering for grades data
            <Datatable datas={gradesData} headers={headers} actions={actions} />
          ) : (
            // Display no grades message
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <FaRegSadCry className="text-6xl mb-2" /> {/* Sad icon */}
              <p>No grades available.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Grade;
