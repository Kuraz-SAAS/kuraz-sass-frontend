import React, { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
} from "react-icons/fa"; // Icons
import Slider from "react-slider"; // Slider for video time tracking

const VideoPlayer = ({ videoId }) => {
  const playerRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100); // Default full volume
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true); // State to manage the play button overlay

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId,
        playerVars: {
          controls: 0, // Hide default YouTube controls
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            setVideoDuration(event.target.getDuration());
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setShowPlayButton(false); // Hide play button when video starts playing
            } else {
              setIsPlaying(false);
            }

            // Update time every second
            if (event.data === window.YT.PlayerState.PLAYING) {
              const intervalId = setInterval(() => {
                setVideoTime(playerRef.current.getCurrentTime());
              }, 1000);
              return () => clearInterval(intervalId);
            }
          },
        },
      });
    };

    // Load the IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      playerRef.current.unMute();
      setVolume(100);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSliderChange = (value) => {
    playerRef.current.seekTo(value);
    setVideoTime(value);
  };

  const startVideo = () => {
    playerRef.current.playVideo(); // Start the video when play button is clicked
    setShowPlayButton(false); // Hide the play button overlay
  };

  return (
    <div className="relative">
      {/* YouTube Video Player */}
      <div id="youtube-player" style={{ width: "100%", height: "500px" }} />

      {/* Overlay to prevent copying/clicking */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10  select-none"></div>

      {/* Play Button Overlay (covers the YouTube logo) */}
      {showPlayButton && (
        <button
          onClick={startVideo}
          className="absolute inset-0  flex items-center justify-center bg-black  z-30"
        >
          <FaPlay size={80} color="white" />
        </button>
      )}

      {/* Custom controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 flex items-center px-4 py-2 text-white z-20">
        {/* Play/Pause Button */}
        <button onClick={handlePlayPause} className="mr-4">
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>

        {/* Video Progress Slider */}
        <div className="flex-grow mx-4">
          <Slider
            className="custom-slider bg-white cursor-pointer"
            min={0}
            max={videoDuration}
            value={videoTime}
            onChange={handleSliderChange}
            trackClassName="slider-track"
            thumbClassName="slider-thumb"
          />
        </div>

        {/* Time Display */}
        <span className="mr-4">
          {Math.floor(videoTime)} / {Math.floor(videoDuration)}s
        </span>

        {/* Volume Control */}
        <button onClick={handleVolumeToggle} className="mr-4">
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>

        {/* Full-Screen Button */}
        <button onClick={() => playerRef.current.isFullscreen()}>
          <FaExpand size={20} />
        </button>
      </div>

      {/* Custom styles for the slider */}
      <style jsx>{`
        .custom-slider {
          width: 100%;
          height: 4px;
        }
        .slider-track {
          background-color: #fff;
          position: relative;
        }
        .slider-thumb {
          background-color: #f5a623;
          width: 12px;
          height: 12px;
          postion: absolute;
          top: -4px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
