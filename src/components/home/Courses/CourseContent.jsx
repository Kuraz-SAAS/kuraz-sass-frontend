import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaPlayCircle,
} from "react-icons/fa";
import Axios from "../../../middleware/Axios";
import { GiCheckedShield } from "react-icons/gi";

const CourseContent = ({ section, setCurrentVideos }) => {
  const [isOpen, setIsOpen] = useState([true, false, false]);
  const [sections, setSections] = useState(section); // Store the section data locally

  const toggleSection = (index) => {
    const newOpen = [...isOpen];
    newOpen[index] = !newOpen[index];
    setIsOpen(newOpen);
  };

  // Function to handle the video status change
  const handleVideoStatusChange = async (video, sectionIndex, videoIndex) => {
    try {
      const updatedSections = [...sections];
      const newStatus = video.status === 1 ? 0 : 1;
      updatedSections[sectionIndex].videos[videoIndex].status = newStatus;
      setSections(updatedSections);

      // Send the API request
      await Axios.post("/api/video/change-status/" + video.id, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Error changing video status:", error);
    }
  };

  return (
    <div className="space-y-4 max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold">Content</h2>
      <p className="text-[12px] text-gray-500">
        * Check the eye icon after finishing each video to mark the video as
        finished.
      </p>
      {/* Loop through the sections */}
      {sections?.map((sec, sectionIndex) => (
        <section key={sec.id}>
          <div className="flex justify-between items-center bg-gray-200 p-3 rounded cursor-pointer">
            <div className="flex items-center space-x-2">
              <FaPlayCircle size={20} />
              <h3 className="font-semibold">{sec?.section_title}</h3>
              <span className="text-sm text-gray-600">
                ({sec?.videos?.length} Lectures)
              </span>
            </div>
            {isOpen[sectionIndex] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isOpen[sectionIndex] && (
            <ul className="ml-6 mt-2 space-y-2">
              {sec?.videos.map((video, videoIndex) => (
                <div
                  key={video.id}
                  className="flex justify-between items-center space-x-2 px-2 cursor-pointer"
                  onClick={() => setCurrentVideos(video?.video_links[0])}
                >
                  <div className="flex items-center space-x-2">
                    {/* Status Change Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the parent onClick
                        handleVideoStatusChange(
                          video,
                          sectionIndex,
                          videoIndex
                        );
                      }}
                    >
                      {video?.status ? (
                        <GiCheckedShield size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                    <span>{video?.video_title}</span>
                  </div>
                  <span className="text-gray-500">
                    {video?.video_duration} (min)
                  </span>
                </div>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
};

export default CourseContent;
