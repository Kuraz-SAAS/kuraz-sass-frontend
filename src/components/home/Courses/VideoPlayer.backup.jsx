import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Slider } from "../../ui/slider";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";

const VideoPlayer = ({ videoId }) => {
  const playerRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const intervalRef = useRef(null);
  const playerId = "youtube-player";

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const startInterval = () => {
    if (playerRef.current && playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
      intervalRef.current = setInterval(() => {
        setVideoTime(playerRef.current?.getCurrentTime() || 0);
      }, 1000);
    }
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetPlayerState = () => {
    setVideoTime(0);
    setVideoDuration(0);
    setIsPlaying(false);
    setShowOverlay(true);
    stopInterval();
  };

  const loadNewVideo = (newVideoId) => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(videoId);
      resetPlayerState();
    }
  };

  const onYouTubeIframeAPIReady = () => {
    if (!window.YT || !window.YT.Player) return;

    playerRef.current = new window.YT.Player(playerId, {
      videoId,
      playerVars: {
        controls: 0,
        rel: 0,
        modestbranding: 1,
        fs: 0,
        iv_load_policy: 3,
        disablekb: 1,
        showinfo: 0,
      },
      events: {
        onReady: (event) => {
          playerRef.current = event.target;
          setVideoDuration(event.target.getDuration());
          event.target.mute();
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setShowOverlay(false);
            startInterval();
          } else {
            setIsPlaying(false);
            stopInterval();
            if (event.data === window.YT.PlayerState.ENDED) {
              setShowOverlay(true);
            }
          }
        },
      },
    });
  };

  useEffect(() => {
    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
      } else {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      }
    };

    initializePlayer();

    return () => {
      stopInterval();
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(videoId);
    }
  }, [videoId]);

  const handlePlayPause = () => {
    if (playerRef.current) {
      isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
    }
  };

  const handleVolumeToggle = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleSliderChange = (value) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(value, true);
    setVideoTime(value);
  };

  return (
    <Card className="relative w-full mx-auto rounded-xl overflow-hidden">
      <div id={playerId} className="w-full h-[60vh] bg-black" />
      {showOverlay && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black text-white z-50 cursor-pointer"
          onClick={handlePlayPause}
        >
          <Play className="w-16 h-16" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t text-white from-black bg-opacity-0 p-4 flex items-center gap-4">
        <Button onClick={handlePlayPause} size="icon" variant="ghost">
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
        <Slider
          min={0}
          max={videoDuration}
          value={[videoTime]}
          onValueChange={(val) => handleSliderChange(val[0])}
          className="flex-grow"
        />
        <span className="text-sm w-[100px] flex">
          {formatTime(videoTime)} / {formatTime(videoDuration)}
        </span>
        <Button onClick={handleVolumeToggle} size="icon" variant="ghost">
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </Button>
        <Button
          onClick={() => playerRef.current?.getIframe()?.requestFullscreen()}
          size="icon"
          variant="ghost"
        >
          <Maximize className="w-6 h-6" />
        </Button>
      </div>
    </Card>
  );
};

export default VideoPlayer;
