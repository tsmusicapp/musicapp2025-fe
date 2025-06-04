"use client";

import * as React from "react";
import {
  Play,
  Pause,
  ThumbsUp,
  Feather,
  LucideFeather,
  FeatherIcon,
  BaggageClaim,
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
import { useLocalStorage } from "@/context/LocalStorageContext"; // Import the useLocalStorage hook
import { toast } from "react-hot-toast"; // Import react-hot-toast

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
  myRole: string[];
  isMusicAsset?: boolean;
  commercialUsePrice: string;
  userName: string;
  profilePicture: string;
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
  myRole,
  isMusicAsset,
  commercialUsePrice,
  userName,
  profilePicture,
}: HomeMusicianBoxProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const { getItem, setItem } = useLocalStorage(); // Use the local storage hook

  const likesLength = likes?.toString().length;

  const FeatherPencil = () => {
    return (
      <div
        className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
        onClick={() => {
          dispatch(
            setMusicCreationId({
              id: id,
              hasLyrics: true,
            })
          );
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
          <path
            d="M8730 55270c5818,-17453 21044,-46540 46540,-46540 -11953,9590 -17452,31996 -26178,31996 -8727,0 -8727,0 -8727,0l-8726 14543 -2909 1z"
            fill="#4B5563"
          />
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
          hasLyrics: false,
        })
      );
      dispatch(musicPlayerDialog());
    }
  };

  // Handle adding item to cart
  const handleAddToCart = () => {
    const cartItems = getItem("cart", [] as HomeMusicianBoxProps[]);
    const newItem = {
      id,
      musicImage,
      songName,
      singerName,
      composerName,
      musicStyle,
      tags,
      duration,
      likes,
      audioSrc,
      lyrics,
      myRole,
      isMusicAsset,
      commercialUsePrice,
      userName,
      profilePicture,
    };

    // Check if item already exists in cart
    if (!cartItems.some((item: HomeMusicianBoxProps) => item.id === id)) {
      const updatedCart = [...cartItems, newItem];
      setItem("cart", updatedCart);
      toast.success(`${songName} has been added to your cart!`, {
        position: "bottom-right",
        duration: 1000,
      });
    } else {
      toast.error(`${songName} is already in your cart!`, {
        position: "bottom-right",
        duration: 1000,
      });
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
    <Card className="h-[215px] max-w-2xl bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardContent className="p-1 space-y-1">
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
              <h3
                className="font-bold text-lg leading-none text-gray-900 cursor-pointer truncate w-[7rem]"
                onClick={togglePlay}
              >
                {songName}
              </h3>

              <p className="text-sm font-medium text-gray-600">
                {singerName}
                <span className="text-sm font-light text-gray-400">
                  {" "}
                  • Singer
                </span>
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
              <span className="text-xs font-light text-gray-400">
                {duration}
              </span>
            </div>
          ) : (
            <FeatherPencil />
          )}
        </div>

        {/* Tags Section */}
        <div className="flex items-start justify-between px-1 pt-2">
          <div className="text-sm font-medium text-gray-600">{musicStyle}</div>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(tags) &&
              tags
                .flatMap((tagStr) => tagStr.split(",").map((tag) => tag.trim()))
                .filter((tag) => tag) // remove empty strings
                .slice(0, 3)
                .map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-1 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
          </div>
        </div>

        {/* Bottom Section: Composer Info and Likes */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-gray-200 shadow-sm transition-transform duration-300 hover:scale-105">
              <AvatarImage
                src={
                  profilePicture ? profilePicture : "/image/default-picture.jpg"
                }
                alt="Composer avatar"
              />
              <AvatarFallback className="bg-gray-100 text-gray-600">
                CC
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-none text-gray-900">
                {userName}
              </p>
              <p className="text-xs text-gray-400">
                {myRole && Array.isArray(myRole)
                  ? myRole
                      .flatMap((role) => {
                        try {
                          const parsed = JSON.parse(role);
                          return Array.isArray(parsed) ? parsed : [role];
                        } catch {
                          return [role];
                        }
                      })
                      .map(
                        (role) => role.charAt(0).toUpperCase() + role.slice(1)
                      )
                      .join(", ")
                  : "No roles"}
              </p>
            </div>
          </div>
          {isMusicAsset ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {commercialUsePrice || 0}$
              </span>
              <button
                onClick={handleAddToCart}
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                aria-label="Add to cart"
              >
                <img
                  src="/icons/add-shopping.png"
                  className="w-6 text-gray-600"
                  alt="Add to cart"
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">{likes || 0}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default HomeMusicianBox;