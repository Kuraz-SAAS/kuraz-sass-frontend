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

  // Unique ID for the player div to prevent conflicts
  const playerId = "youtube-player";

  // Helper function to format time into minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Initialize the YouTube Player
  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) {
        playerRef.current = new window.YT.Player(playerId, {
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
                // Clear the interval when the video is not playing
                return () => clearInterval(intervalId);
              }
            },
          },
        });
      }
    };

    // Load the YouTube API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady(); // If API is already available, initialize immediately
    }

    // Cleanup on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs once

  // Update video when videoId changes
  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(videoId);
      setShowPlayButton(true); // Show play button overlay for new video
      setVideoTime(0);
    }
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
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(value, true);
      setVideoTime(value);
    }
  };

  const startVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo(); // Start the video when play button is clicked
      setShowPlayButton(false); // Hide the play button overlay
    }
  };

  const handleFullscreen = () => {
    const iframe = playerRef.current.getIframe();
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      /* Firefox */
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      /* IE/Edge */
      iframe.msRequestFullscreen();
    }
  };

  return (
    <div className="relative">
      {/* YouTube Video Player */}
      <div id={playerId} style={{ width: "100%", height: "500px" }} />

      {/* Play Button Overlay */}
      {showPlayButton && (
        <button
          onClick={startVideo}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
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
          {formatTime(videoTime)} / {formatTime(videoDuration)}
        </span>

        {/* Volume Control */}
        <button onClick={handleVolumeToggle} className="mr-4">
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>

        {/* Full-Screen Button */}
        <button onClick={handleFullscreen}>
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
          position: absolute;
          top: -4px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
