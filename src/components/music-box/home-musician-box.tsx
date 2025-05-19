"use client";

import * as React from "react";
import {
  Play,
  Pause,
  ThumbsUp,
  Feather,
  LucideFeather,
  FeatherIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  musicPlayerDialog,
  setMusicCreationId,
} from "@/redux/features/offer/offerSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { getImageUrl } from "@/conf/music";

interface HomeMusicianBoxProps {
  id: string;
  musicImage: string;
  songName: string;
  singerName: string;
  composerName: string;
  musicStyle: string;
  tags: string[];
  duration?: string;
  likes?: number;
  audioSrc?: string;
  lyrics?: boolean;
}

export function HomeMusicianBox({
  id,
  musicImage,
  songName,
  singerName,
  composerName,
  musicStyle,
  lyrics,
  tags,
  duration = "03:45",
  likes,
  audioSrc,
}: HomeMusicianBoxProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const likesLength = likes?.toString().length;

  console.log(likesLength, "likesLengthValues");

  const FeatherPencil = () => {
    return (
      <div
        className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
        onClick={() => {
          dispatch(setMusicCreationId({
            id: id,
            hasLyrics: true
          }));
          dispatch(musicPlayerDialog());
        }}
        aria-label="View lyrics"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill-rule="evenodd"
          clip-rule="evenodd"
          image-rendering="optimizeQuality"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          viewBox="0 0 64000 64000"
          id="feather"
        >
          <path d="M8730 55270c5818,-17453 21044,-46540 46540,-46540 -11953,9590 -17452,31996 -26178,31996 -8727,0 -8727,0 -8727,0l-8726 14543 -2909 1z" fill="#4B5563"/>
        </svg>
      </div>
    );
  };

  const togglePlay = () => {
    if (audioSrc) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log("Clicked on home music box, ID:", id);
      dispatch(
        setMusicCreationId({
          id: id,
          hasLyrics: lyrics,
        })
      );
      dispatch(musicPlayerDialog());
    }
  };

  React.useEffect(() => {
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () =>
          setIsPlaying(false)
        );
      }
    };
  }, [audioSrc]);

  return (
    <Card className="w-full max-w-2xl bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardContent className="p-5 space-y-3">
        {/* Top Section: Song Info */}
        <div className="flex items-center justify-between border-2 border-gray-100 py-3 px-2 rounded-lg">
          <div className="flex items-center gap-4">
            {/* Album Art */}
            <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-200 shadow-lg">
              <img
                src={musicImage}
                alt={songName}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "/image/default-picture.jpg";
                }}
              />
            </div>

            {/* Song Details */}
            <div className="space-y-1 pb-2">
              <h3 className="font-bold text-lg leading-none text-gray-900">{songName}</h3>
              <p className="text-sm font-medium text-gray-600">
                {singerName}
                <span className="text-sm font-light text-gray-400"> • Singer</span>
              </p>
            </div>
          </div>

          {/* Play Button and Duration */}
          {!lyrics ? (
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={togglePlay}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-300"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <PauseIcon className="w-8 h-8 text-gray-700" />
                ) : (
                  <PlayIcon className="w-8 h-8 text-gray-700" />
                )}
              </button>
              <span className="text-xs font-light text-gray-400">{duration}</span>
            </div>
          ) : (
            <FeatherPencil />
          )}
        </div>

        {/* Tags Section */}
        <div className="flex items-start justify-between px-1 pt-2">
          <div className="text-sm font-medium text-gray-600">{musicStyle}</div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tags) &&
              tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 p-1 rounded-md text-xs font-medium border border-gray-200"
                >
                  {tag}
                </Badge>
              ))}
          </div>
        </div>

        {/* Bottom Section: Composer Info and Likes */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-gray-200 shadow-sm transition-transform duration-300 hover:scale-105">
              <AvatarImage src="/image/default-picture.jpg" alt="Composer avatar" />
              <AvatarFallback className="bg-gray-100 text-gray-700">CC</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-none text-gray-900">{composerName}</p>
              <p className="text-xs text-gray-400">
                Composer, Lyricist, Arranger
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{likes || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HomeMusicianBox;