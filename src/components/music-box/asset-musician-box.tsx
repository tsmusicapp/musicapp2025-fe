"use client";

import React from "react";
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

  return (
    <Card
      className="w-full max-w-2xl bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
      onClick={handleClick}
    >
      <div className="p-5 space-y-3">
        {/* Top Section: Song Image and Info */}
        <div className="flex items-center justify-between border-2 border-gray-100 py-3 px-2 rounded-lg">
          <div className="flex items-center gap-4">
            {/* Album Art */}
            <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-200 shadow-lg">
              <img
                src={imgSong || "/image/default-picture.jpg"}
                alt={musicName}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "/image/default-picture.jpg";
                }}
              />
            </div>

            {/* Song Details */}
            <div className="space-y-1 pb-2">
              <h3 className="font-bold text-lg leading-none text-gray-900">
                {musicName}
              </h3>
              <p className="text-sm font-medium text-gray-600">{musicStyle}</p>
              {!lyrics && (
                <span className="text-xs font-light text-gray-400">3:45</span>
              )}
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex items-start justify-between px-1 pt-2">
          <div className="text-sm font-medium text-gray-600">{musicStyle}</div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tags) &&
              tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 p-1 rounded-md text-xs font-medium border border-gray-200"
                >
                  {tag}
                </Badge>
              ))}
            {tags.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-gray-100 p-1 rounded-md text-xs font-medium text-gray-600 border border-gray-200"
              >
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Bottom Section: Artist Info */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-gray-200 shadow-sm transition-transform duration-300 hover:scale-105">
              <AvatarImage src="/image/default-picture.jpg" alt="Artist avatar" />
              <AvatarFallback className="bg-gray-100 text-gray-700">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-none text-gray-900">{userName}</p>
              <p className="text-xs text-gray-400">
                {myRole.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AssetMusicianBox;