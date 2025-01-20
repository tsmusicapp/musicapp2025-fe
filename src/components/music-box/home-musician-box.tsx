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

interface HomeMusicianBoxProps {
  id: string;
  imgSong: string;
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
  imgSong,
  songName,
  singerName,
  composerName,
  musicStyle,
  lyrics,
  tags,
  duration = "03:45",
  likes = 55,
  audioSrc,
}: HomeMusicianBoxProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const FeatherPencil = () => {
    return (
      <div
        className="cursor-pointer pb-4"
        onClick={() => {
          dispatch(setMusicCreationId({ 
            id: id,
            hasLyrics: true
          }));
          dispatch(musicPlayerDialog());
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill-rule="evenodd"
          clip-rule="evenodd"
          image-rendering="optimizeQuality"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          viewBox="0 0 64000 64000"
          id="feather"
        >
          <path d="M8730 55270c5818,-17453 21044,-46540 46540,-46540 -11953,9590 -17452,31996 -26178,31996 -8727,0 -8727,0 -8727,0l-8726 14543 -2909 1z"></path>
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
          hasLyrics: lyrics, // Pass the lyrics prop here
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
    <Card className="w-full max-w-2xl border-0 hover:shadow-lg transition-shadow shadow-none duration-200">
      <CardContent className="p-4 space-y-4">
        {/* Top Section: Song Info */}
        <div className="flex items-center justify-between border-2 py-4 px-2">
          <div className="flex items-center gap-4">
            {/* Album Art */}
            <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted">
              <img
                src={imgSong || "/image/default-picture.jpg"}
                alt={songName}
                className="object-cover w-full h-full"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "/image/default-picture.jpg";
                }}
              />
            </div>

            {/* Song Details */}
            <div className="space-y-1 pb-4">
              <h3 className="font-semibold text-md leading-none">{songName}</h3>
              <p className="text-xs font-thin text-muted-foreground">
                {singerName}
                <span className="text-xs font-thin text-muted-foreground">
                  {" "}
                  • Singer
                </span>
              </p>
            </div>
          </div>

          {/* Play Button and Duration */}
          {!lyrics ? (
            <div className="flex flex-col items-center">
              <button
                onClick={togglePlay}
                className="rounded-full p-2 hover:bg-muted transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <PauseIcon className="w-10 h-10" />
                ) : (
                  <PlayIcon className="w-10 h-10" />
                )}
              </button>
              <span className="text-sm text-muted-foreground">{duration}</span>
            </div>
          ) : (
            <FeatherPencil />
          )}
        </div>

        {/* Tags Section */}
        <div
          className="flex items-start justify-between px-1 inset-0 pt-2"
          style={{ marginTop: 0, margin: 0 }}
        >
          <div>{musicStyle}</div>
          <div className="flex flex-wrap gap-2 items-start justify-start inset-0 mt-0">
            {Array.isArray(tags) &&
              tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 p-1 rounded-md"
                >
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
        {/* Bottom Section: Composer Info and Likes */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/image/default-picture.jpg" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{composerName}</p>
              <p className="text-xs text-muted-foreground">
                Composer, Lyricist, Arranger
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{likes}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HomeMusicianBox;
