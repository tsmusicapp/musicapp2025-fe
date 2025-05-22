import React, { useState, useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Progress } from "@material-tailwind/react";

import {
  reactionCompositionMediaPlayer,
  reactionArrangementMediaPlayer,
  reactionAddShopping,
  shoppingMusicSize,
} from "@/default/reaction";
import Reaction from "../reaction/reaction";
import ReactionIcons from "../reaction/reaction-icons";
import ReactionShopping from "../reaction/reaction-shopping";

const MediaPlayerV2 = ({ musicDetailInfo }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioSrc = musicDetailInfo?.music || musicDetailInfo?.musicAudio;

  const handlePlayPause = () => {
    const audio = document.getElementById("audio-player") as HTMLAudioElement;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-row justify-center items-center px-4 py-1 border-t-2 border-black/10 mt-5">
      <audio
        id="audio-player"
        src={audioSrc}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      <div className="flex flex-row justify-between">
        {/* Left section: controls */}
        <div className="min-w-0 flex flex-row items-center font-semibold gap-3">
          <img
            src={musicDetailInfo?.musicImage || "https://docs.material-tailwind.com/img/face-4.jpg"}
            alt="cover"
            width="44"
            height="44"
            className="rounded-lg bg-slate-100"
            loading="lazy"
          />

          {isPlaying ? (
            <PauseIcon
              height={30}
              width={30}
              className="border-2 rounded-full p-2 border-black/30 cursor-pointer"
              onClick={handlePlayPause}
            />
          ) : (
            <PlayIcon
              height={30}
              width={30}
              className="border-2 rounded-full p-2 border-black/30 cursor-pointer"
              onClick={handlePlayPause}
            />
          )}

          <p className="text-xs">{formatTime(currentTime)}</p>

          <div className="w-[20rem] max-w-[20rem]">
            <Progress
              value={(currentTime / duration) * 100 || 0}
              variant="gradient"
              size="sm"
              className="border border-gray-900/10 bg-gray-900/5"
            />
          </div>

          <p className="text-xs">{formatTime(duration)}</p>

          <SpeakerWaveIcon height={24} width={24} className="cursor-pointer" />

          <div className="w-[5rem] max-w-[5rem]">
            <Progress
              value={50}
              variant="gradient"
              size="sm"
              className="border border-gray-900/10 bg-gray-900/5"
            />
          </div>
        </div>

        <div className="min-w-0 flex flex-row items-center font-semibold gap-3">
          <div className="flex flex-row gap-2">
            <ReactionShopping
              data={reactionAddShopping}
              customSize={shoppingMusicSize}
            />
            <img
              src="/icons/collect-icon.png"
              style={{ height: 24, width: 24 }}
              className="hover:scale-125 cursor-pointer"
              alt="collect"
            />
            <ArrowTopRightOnSquareIcon
              height={24}
              width={24}
              className="hover:scale-125 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayerV2;
