"use client";

import React, { useState } from "react";
import { Card } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  musicPlayerDialog,
  setMusicAssetId,
  setSelectedId,
} from "@/redux/features/offer/offerSlice";
import { Badge } from "../ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";

interface AssetMusicianBoxProps {
  id: string;
  imgSong: string;
  musicName: string;
  musicStyle: string;
  musicMood: string;
  musicInstrument: string;
  softwareTool: string;
  description: string;
  personalUsePrice: string;
  commercialUsePrice: string;
  createdBy: string;
  tags: string[];
  myRole: string[];
  lyrics: boolean;
}

function AssetMusicianBox({
  id,
  imgSong,
  musicName,
  musicStyle,
  myRole,
  tags,
  lyrics,
}: AssetMusicianBoxProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getUserAuth = localStorage.getItem("auth");
  const userAuth = JSON.parse(getUserAuth || "{}");
  const userName = userAuth.user?.name || "Unknown Artist";

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (!id) return;
    dispatch(setMusicAssetId(id));
    dispatch(setSelectedId(id));
    dispatch(musicPlayerDialog());
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <Card
      className="relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-xl bg-gradient-to-br from-white transition-all duration-300"
      onClick={handleClick}
    >
      <div className="p-5 space-y-4">
        {/* Top Section: Song Image and Info */}
        <div className="relative flex items-center gap-4">
          {/* Album Art */}
          <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={imgSong || "/image/default-picture.jpg"}
              alt={musicName}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = "/image/default-picture.jpg";
              }}
            />
            {!lyrics && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 hover:opacity-100"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-3 transition-transform duration-300 hover:scale-110">
                  {isPlaying ? (
                    <PauseIcon className="h-6 w-6 text-white" />
                  ) : (
                    <PlayIcon className="h-6 w-6 text-white" />
                  )}
                </div>
              </button>
            )}
          </div>

          {/* Song Details */}
          <div className="flex-1 space-y-1">
            <h3 className="truncate text-lg font-bold text-gray-900">{musicName}</h3>
            <p className="text-sm text-gray-600">{musicStyle}</p>
            {!lyrics && (
              <span className="text-xs text-gray-500">3:45</span>
            )}
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2">
          {Array.isArray(tags) &&
            tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 transition-colors duration-200 hover:bg-blue-200"
              >
                {tag}
              </Badge>
            ))}
          {tags.length > 3 && (
            <Badge
              variant="secondary"
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Bottom Section: Artist Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-blue-200 transition-transform duration-300 hover:scale-110">
            <AvatarImage src="/image/default-picture.jpg" />
            <AvatarFallback className="bg-blue-100 text-blue-800">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <p className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {myRole.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AssetMusicianBox;