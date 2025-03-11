import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import DashboardLayout from "../../layouts/dashboard/student/DashboardLayouts";
import Axios from "../../../middleware/Axios";
import { useSiteStore } from "../../../context/siteStore";

// Import Lucide Icons
import { Book, Play, Check, Bookmark, BookOpen, Archive } from "lucide-react";
import Slider from "@/components/common/dashboard/Slider";
import { Calendar, FileText, Clock } from 'lucide-react';

const Dashboard = () => {
  const student = useSiteStore((store) => store.studentDashboard);
  const getStudentDashboard = useSiteStore(
    (store) => store.getStudentDashboard
  );

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await Axios.get("/api/tenant/notices");
      setEvents(res.data.notices);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getStudentDashboard();
    fetchEvents();
  }, []);

  // Stats array with Lucide Icons
  const stats = [
    { label: "Total Courses", value: student?.total_course, icon: Book },
    { label: "Ongoing Courses", value: student?.ongoing_course_count, icon: Play },
    { label: "Completed Courses", value: student?.completed_course_count, icon: Check },
    { label: "Saved Courses", value: student?.saved_courses_count, icon: Bookmark },
    { label: "Books", value: 0, icon: BookOpen },
    { label: "School's Resources", value: 0, icon: Archive },
  ];

  const features = [
    { label: 'Exams', icon: Calendar },
    { label: 'Library', icon: Book },
    { label: 'Reports', icon: FileText },
    { label: 'Scheduler', icon: Clock },
  ];
  return (
    <DashboardLayout>
      <section className="w-full">
        {/* Stats Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white text-primary shadow-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-light">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <span className="text-md font-light">{stat.label}</span>
                <stat.icon className="ml-2 w-6 h-6 text-primary" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Events Slider */}
        <div className="mt-6">
          {events.length > 0 ? (
            <Slider>
              {events.map((event, index) => (
                <div key={index} className="p-4">
                  {event.title}
                </div>
              ))}
            </Slider>
          ) : (
            <Slider>
              <div className="p-4">No events</div>
            </Slider>
          )}
        </div>

        {/* Recent Activities Card */}
        <div className="mt-6">
          <Card className="bg-white shadow">
            <CardHeader>
              <CardTitle className="text-primary font-light">
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              No Activity Recorded Yet
            </CardContent>
          </Card>
        </div>
        <section className="mt-6">
          <h2 className="text-xl font-semibold text-primary">Coming Soon</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mt-4">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white text-primary shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center">
                    <feature.icon className="mr-2 w-6 h-6 text-primary" />
                    {feature.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  Stay tuned for upcoming updates on {feature.label}.
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;