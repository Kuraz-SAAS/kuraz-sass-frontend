import React, { useEffect, useState } from "react";
import CourseContent from "../../components/home/Courses/CourseContent";
import VideoPlayer from "../../components/home/Courses/VideoPlayer";
import { Link, useParams } from "react-router-dom";
import { useSiteStore } from "../../context/siteStore";
import { BsBack } from "react-icons/bs";

const CourseViewPage = () => {
  const params = useParams();
  const courses = useSiteStore((store) => store.courses);
  const getCourses = useSiteStore((store) => store.getCourses);

  useEffect(() => {
    getCourses();
  }, []);

  const course = courses.find((c) => c.id === parseInt(params.id));
  const firstVideo = course?.course_section[0];

  const [currentVideos, setCurrentVideos] = useState(
    firstVideo?.videos[0].video_links[0]
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen font-poppins py-6 px-4 lg:py-10 lg:px-20 bg-gray-100">
      {/* Main content */}
      <main className="flex-1 grid gap-4 lg:gap-5 p-4 lg:p-6">
        <div className="flex items-center gap-2">
          <BsBack size={24} />
          <Link
            to={"/courses"}
            className="underline underline-offset-4 text-sm lg:text-base"
          >
            Back to Courses
          </Link>
        </div>
        <h2 className="text-base lg:text-lg font-semibold text-gray-700">
          {firstVideo?.videos[0].video_title}
        </h2>
        <div className="mt-4 shadow-md rounded-xl aspect-w-16 aspect-h-9">
          <VideoPlayer videoId={currentVideos} />
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-full lg:w-2/5 p-4 mt-6 lg:mt-0 lg:p-4 ">
        <CourseContent
          section={course?.course_section}
          setCurrentVideos={setCurrentVideos}
        />
      </aside>
    </div>
  );
};

export default CourseViewPage;
