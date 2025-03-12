import React, { useEffect, useState } from "react";
import CourseContent from "../../components/home/Courses/CourseContent";
import VideoPlayer from "../../components/home/Courses/VideoPlayer";
import { Link, useParams } from "react-router-dom";
import { useSiteStore } from "../../context/siteStore";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

const CourseViewPage = () => {
  const params = useParams();
  const courses = useSiteStore((store) => store.courses);

  const course = courses.find((c) => c.id === parseInt(params.id));
  const firstVideo = course?.course_section[0];

  const [currentVideo, setCurrentVideo] = useState(
    firstVideo?.videos[0]?.video_links[0]
  );

  return (
    <div className="flex flex-col items-center lg:flex-row min-h-screen font-poppins bg-muted p-6 lg:p-10 gap-6">
      {/* Main Content */}
      <main className="flex-1 space-y-5">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/courses">
              <ArrowLeft className="w-5 h-5" /> Back to Courses
            </Link>
          </Button>
        </div>
        <h2 className="text-lg lg:text-xl font-semibold text-gray-700">
          {firstVideo?.videos[0]?.video_title || "Course Video"}
        </h2>
        <Card className="shadow-lg rounded-xl overflow-hidden">
          <VideoPlayer videoId={currentVideo} />
        </Card>
      </main>

      {/* Sidebar */}
      <aside className="w-full lg:w-2/5">
        <CourseContent section={course?.course_section} setCurrentVideos={setCurrentVideo} />
      </aside>
    </div>
  );
};

export default CourseViewPage;