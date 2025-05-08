import React, { useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { Progress } from "@material-tailwind/react";

const MediaPlayerV2 = ({ musicDetailInfo }: any) => {
  console.log(musicDetailInfo, "musicDetailInfo");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioSrc = musicDetailInfo?.music ?musicDetailInfo?.music : musicDetailInfo?.musicAudio;

  const handlePlayPause = () => {
    const audio = document.getElementById("audio-player") as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-[28rem] mx-auto mt-[5rem] border border-gray-300 rounded-xl shadow-md bg-white p-6">
      <audio
        id="audio-player"
        src={audioSrc}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
  
      <div className="flex items-center justify-center gap-4">
        {isPlaying ? (
          <PauseIcon
            height={36}
            width={36}
            className="border rounded-full p-2 border-gray-400 cursor-pointer"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            height={36}
            width={36}
            className="border rounded-full p-2 border-gray-400 cursor-pointer"
            onClick={handlePlayPause}
          />
        )}
  
        <p className="text-sm text-gray-700">{formatTime(currentTime)}</p>
  
        <div className="w-[12rem]">
          <Progress value={(currentTime / duration) * 100 || 0} color="blue" />
        </div>
  
        <p className="text-sm text-gray-700">{formatTime(duration)}</p>
  
        <SpeakerWaveIcon height={24} width={24} className="text-gray-600" />
      </div>
    </div>
  );
  
};

export default MediaPlayerV2;
