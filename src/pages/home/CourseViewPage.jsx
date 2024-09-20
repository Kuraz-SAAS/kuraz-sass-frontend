import React from "react";
import CourseContent from "../../components/home/Courses/CourseContent";
import VideoPlayer from "../../components/home/Courses/VideoPlayer";

const CourseViewPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main content */}
      <main className="flex-1 p-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Develop Restaurant Website Using Laravel
        </h2>
        <div className="mt-4">
          <VideoPlayer videoId="MLlSSJ0z7xM?si=xqGYXOW3yGFfIW4Q" />
        </div>
        <div className="mt-6">
          <h3 className="text-md font-semibold">Course Notes</h3>
          <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-md"
            placeholder="Type your course notes here..."
          ></textarea>
        </div>
      </main>

      <aside className="w-1/4 bg-green-100 p-4">
        <CourseContent />
      </aside>
    </div>
  );
};

export default CourseViewPage;
