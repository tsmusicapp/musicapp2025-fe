import { reactionAddShopping, shoppingMusicSize } from "@/default/reaction";
import {
  ArrowTopRightOnSquareIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { Progress } from "@material-tailwind/react";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

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
    <div className="w-full border-t-2 border-black/10 mt-5 px-4 py-2">
      <audio
        id="audio-player"
        src={audioSrc}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      <div className="flex flex-row items-center justify-between">
        {/* Left Section: Image */}
        <div className="flex items-center gap-3">
          <img
            src={
              musicDetailInfo?.musicImage ||
              "https://docs.material-tailwind.com/img/face-4.jpg"
            }
            alt="cover"
            width="44"
            height="44"
            className="rounded-lg bg-slate-100"
            loading="lazy"
          />
        </div>

        {/* Center Section: Controls */}
        <div className="flex flex-1 items-center justify-center gap-3 max-w-[36rem]">
          {musicDetailInfo?.isLyric !== true &&
            musicDetailInfo?.isLyric !== "true" && (
              <>
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

                <SpeakerWaveIcon
                  height={24}
                  width={24}
                  className="cursor-pointer"
                />

                <div className="w-[5rem] max-w-[5rem]">
                  <Progress
                    value={50}
                    variant="gradient"
                    size="sm"
                    className="border border-gray-900/10 bg-gray-900/5"
                  />
                </div>
              </>
            )}
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-2">
          <ThumbsUp className=" text-gray-600" />
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
  );
};

export default MediaPlayerV2;
