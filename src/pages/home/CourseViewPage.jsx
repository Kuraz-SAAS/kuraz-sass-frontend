import React from "react";
import CourseContent from "../../components/home/Courses/CourseContent";
import VideoPlayer from "../../components/home/Courses/VideoPlayer";

const CourseViewPage = () => {
  return (
    <div className="flex h-screen font-poppins p-20 bg-gray-100">
      {/* Main content */}
      <main className="flex-1 p-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Develop Restaurant Website Using Laravel
        </h2>
        <div className="mt-4 shadow-md rounded-xl">
          <VideoPlayer videoId="sj5hmpgbhSY" />
        </div>
      </main>

      <aside className="w-2/5 p-4">
        <CourseContent />
      </aside>
    </div>
  );
};

export default CourseViewPage;
