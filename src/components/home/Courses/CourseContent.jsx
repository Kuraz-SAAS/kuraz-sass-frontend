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
      // Optimistically update the video status locally before the API call
      const updatedSections = [...sections];
      updatedSections[sectionIndex].videos[videoIndex].status =
        video.status === 1 ? 0 : 1;
      setSections(updatedSections);

      // Send the API request to change the status on the backend
      await Axios.post("/api/video/change-status/" + video.id, {
        status: video.status === 1 ? 0 : 1,
      });
    } catch (error) {
      console.error("Error changing video status:", error);
      // Optionally: Roll back changes if the API call fails
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Content</h2>
      <p className="text-[12px] text-gray-500">
        * Check the eye icon after finishing each video to mark the video as
        finished.
      </p>
      {/* Loop through the sections */}
      {sections?.map((sec, sectionIndex) => (
        <section key={sec.id}>
          <div
            className="flex justify-between items-center bg-gray-200 p-3 rounded cursor-pointer"
            onClick={() => toggleSection(sec?.id)}
          >
            <div className="flex items-center space-x-2">
              <FaPlayCircle size={20} />
              <h3 className="font-semibold">{sec?.section_title}</h3>
              <span className="text-sm text-gray-600">
                ({sec?.videos?.length} Lectures)
              </span>
            </div>
            {isOpen[sec?.id] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isOpen[sec?.id] && (
            <ul className="ml-6 mt-2 space-y-2">
              {sec?.videos.map((video, videoIndex) => (
                <button
                  onClick={() => {
                    setCurrentVideos(video?.video_links[0]);
                  }}
                  key={video.id}
                  className="flex w-full px-2 justify-between items-center space-x-2"
                >
                  {video?.status ? (
                    <button
                      onClick={() =>
                        handleVideoStatusChange(video, sectionIndex, videoIndex)
                      }
                      className="flex items-center space-x-2"
                    >
                      <GiCheckedShield size={18} />
                      <span>{video?.video_title}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleVideoStatusChange(video, sectionIndex, videoIndex)
                      }
                      className="flex items-center space-x-2"
                    >
                      <FaEye size={18} />
                      <span>{video?.video_title}</span>
                    </button>
                  )}

                  <span className="text-gray-500">
                    {video?.video_duration} (min)
                  </span>
                </button>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
};

export default CourseContent;
