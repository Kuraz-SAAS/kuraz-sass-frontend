import React, { useEffect, useState } from "react";
import Slider from "../../../components/common/dashboard/Slider"; // Adjust the path if needed
import { AiOutlineFileText } from "react-icons/ai"; // Replace with your desired icons
import DashboardLayout from "../../layouts/dashboard/student/DashboardLayouts";
import Axios from "../../../middleware/Axios";
import { useSiteStore } from "../../../context/siteStore";

const Dashboard = () => {
  const student = useSiteStore((store) => store.studentDashboard);
  const getStudentDashboard = useSiteStore(
    (store) => store.getStudentDashboard
  );

  const [events, setEvents] = useState("");

  const fetchEvents = async () => {
    await Axios.get("/api/tenant/notices").then((res) => {
      console.log(res);
      setEvents(res.data.notices);
    });
  };

  useEffect(() => {
    getStudentDashboard();
    fetchEvents();
  }, []);
  console.log(student);
  return (
    <DashboardLayout>
      <section className="w-full">
        <div className="font-poppins grid">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Course Card */}
            <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
              <div className="text-3xl font-light">{student?.total_course}</div>
              <div className="mt-2 flex items-center">
                <span className="text-md font-light">Total Courses</span>
                <AiOutlineFileText className="ml-2 text-primary w-6 h-6" />
              </div>
            </div>

            {/* OnGoing Course Card */}
            <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
              <div className="text-3xl font-light">
                {student?.ongoing_course_count}
              </div>
              <div className="mt-2 flex items-center">
                <span className="text-md font-light">OnGoing Courses</span>
                <AiOutlineFileText className="ml-2 text-primary w-6 h-6" />
              </div>
            </div>

            {/* Completed Course Card */}
            <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
              <div className="text-3xl font-light">
                {student?.completed_course_count}
              </div>
              <div className="mt-2 flex items-center">
                <span className="text-md font-light">Completed Courses</span>
                <AiOutlineFileText className="ml-2 w-6 h-6" />
              </div>
            </div>

            {/* Saved Courses Card */}
            <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
              <div className="text-3xl font-light">
                {student?.saved_courses_count}
              </div>
              <div className="mt-2 flex items-center">
                <span className="text-md font-light">Saved Courses</span>
                <AiOutlineFileText className="ml-2 text-primary w-6 h-6" />
              </div>
            </div>

            {/* Books Card */}
            <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
              <div className="text-3xl font-light">0</div>
              <div className="mt-2 flex items-center">
                <span className="text-md font-light">Books</span>
                <AiOutlineFileText className="ml-2 text-primary w-6 h-6" />
              </div>
            </div>

            {/* School's Resources Card */}
            <div className="bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
              <div className="text-3xl font-light">0</div>
              <div className="mt-2 flex items-center">
                <span className="text-md font-light">School's Resources</span>
                <AiOutlineFileText className="ml-2 w-6 h-6" />
              </div>
            </div>

            {/* Custom Slider Component */}
            <div className="col-span-2">
              {events.length > 0 ? (
                <Slider events={events} />
              ) : (
                <Slider events={[{ title: "no event" }]} />
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Recent Activities Section */}
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6">
              <h2 className="text-primary font-light mb-3">
                RECENT ACTIVITIES
              </h2>
              <div className="border-t pt-2 text-gray-600">
                No Activity Recorded Yet
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
