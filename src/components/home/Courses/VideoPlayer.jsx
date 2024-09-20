import React, { useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
} from "react-icons/fa";

const VideoPlayer = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-64 bg-gray-800">
      {/* Video iframe */}
      <iframe
        id="youtube-player"
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0`}
        title="YouTube Video Player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>

      {/* Custom Controls */}
      <div className="absolute bottom-0 w-full p-2 bg-black bg-opacity-50 flex justify-between items-center">
        <button onClick={togglePlay} className="text-white">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="flex items-center space-x-2">
          <button onClick={toggleMute} className="text-white">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <button className="text-white">
            <FaExpand />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
