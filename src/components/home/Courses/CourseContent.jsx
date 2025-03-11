import React, { useState } from "react";
import { ChevronDown, ChevronUp, Eye, PlayCircle, ShieldCheck } from "lucide-react";
import Axios from "../../../middleware/Axios";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";

const CourseContent = ({ section, setCurrentVideos }) => {
  const [isOpen, setIsOpen] = useState([true, false, false]);
  const [sections, setSections] = useState(section);

  const toggleSection = (index) => {
    const newOpen = [...isOpen];
    newOpen[index] = !newOpen[index];
    setIsOpen(newOpen);
  };

  const handleVideoStatusChange = async (video, sectionIndex, videoIndex) => {
    try {
      const updatedSections = [...sections];
      const newStatus = video.status === 1 ? 0 : 1;
      updatedSections[sectionIndex].videos[videoIndex].status = newStatus;
      setSections(updatedSections);

      await Axios.post(`/api/video/change-status/${video.id}`, { status: newStatus });
    } catch (error) {
      console.error("Error changing video status:", error);
    }
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto p-4">
      <h2 className="text-2xl font-bold">Course Content</h2>
      <p className="text-sm text-gray-500">* Click the eye icon after finishing each video to mark it as completed.</p>

      {sections?.map((sec, sectionIndex) => (
        <Card key={sec.id} className="bg-white dark:bg-gray-900 shadow-md rounded-lg">
          <CardContent className="p-4 cursor-pointer" onClick={() => toggleSection(sectionIndex)}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <PlayCircle className="text-blue-500" size={24} />
                <h3 className="font-semibold text-lg">{sec?.section_title}</h3>
                <span className="text-sm text-gray-500">({sec?.videos?.length} Lectures)</span>
              </div>
              {isOpen[sectionIndex] ? <ChevronUp /> : <ChevronDown />}
            </div>
          </CardContent>

          {isOpen[sectionIndex] && (
            <div className="p-4 space-y-2">
              {sec?.videos.map((video, videoIndex) => (
                <div
                  key={video.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                  onClick={() => setCurrentVideos(video?.video_links[0])}
                >
                  <div className="flex items-center space-x-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVideoStatusChange(video, sectionIndex, videoIndex);
                      }}
                    >
                      {video?.status ? <ShieldCheck className="text-green-500" /> : <Eye />}
                    </Button>
                    <span className="text-gray-800 dark:text-gray-300">{video?.video_title}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{video?.video_duration} min</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default CourseContent;
