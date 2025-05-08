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
  const audioSrc = musicDetailInfo?.music;

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
    <div className="flex flex-row justify-between p-4 gap-16 w-full border-t-2 border-b-2 border-black/10">
      <audio
        id="audio-player"
        src={audioSrc}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      <div className="flex items-center gap-4">
        {isPlaying ? (
          <PauseIcon
            height={40}
            width={40}
            className="border-2 rounded-full p-2 border-black/30 cursor-pointer"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            height={40}
            width={40}
            className="border-2 rounded-full p-2 border-black/30 cursor-pointer"
            onClick={handlePlayPause}
          />
        )}

        <p className="text-xs">{formatTime(currentTime)}</p>
        <div className="w-[20rem]">
          <Progress value={(currentTime / duration) * 100 || 0} color="blue" />
        </div>
        <p className="text-xs">{formatTime(duration)}</p>
        <SpeakerWaveIcon height={24} width={24} />
      </div>
    </div>
  );
};

export default MediaPlayerV2;
