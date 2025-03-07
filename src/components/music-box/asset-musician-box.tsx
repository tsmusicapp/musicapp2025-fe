"use client";
import React, { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  musicPlayerDialog,
  setMusicAssetId,
  setSelectedId,
} from "@/redux/features/offer/offerSlice";
import { getImageUrl } from "@/conf/music";
import { CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { ThumbsUp } from "lucide-react";
import { USERS } from '../../conf/music';
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
  lyrics :boolean
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

  const getuserAuth = localStorage.getItem('auth')
  console.log(getuserAuth, "getuserAuthValue")

  const userAuth = JSON.parse(getuserAuth || '{}');
  const userName = userAuth.user?.name;

  console.log(USERS, "checkUsers")
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (!id) return;
    console.log("Clicked on asset music box, ID:", id);
    dispatch(setMusicAssetId(id));
    dispatch(setSelectedId(id));
    dispatch(musicPlayerDialog());
  };

  return (
    <Card
      className={`relative grid min-h-[5rem] cursor-pointer w-[19.4rem] overflow-hidden hover:shadow-xl shadow-md border-2 rounded-md`}
      onClick={handleClick}
    >
      {/* <CardBody className={`relative flex flex-col justify-center p-3`}>
        <div className="flex justify-center items-center flex-row gap-2">
          <Avatar
            src={getImageUrl(imgSong) || "/image/default-picture.jpg"}
            size="md"
            alt={musicName || "Music"}
            variant="rounded"
            onError={(e: any) => {
              e.target.src = "/image/default-picture.jpg";
            }}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{musicName}</p>
            <p className="text-xs">{musicStyle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardBody> */}
      <CardContent className="p-4 space-y-4">
        {/* Top Section: Song Info */}
        <div className="flex items-center justify-between border-2 py-4 px-2">
          <div className="flex items-center gap-4">
            {/* Album Art */}
            <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted">
              <img
                src={getImageUrl(imgSong) || "/image/default-picture.jpg"}
                alt={imgSong}
                className="object-cover w-full h-full"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "/image/default-picture.jpg";
                }}
              />
            </div>

            {/* Song Details */}
            <div className="space-y-1 pb-4">
              <h3 className="font-semibold text-md leading-none">{musicName}</h3>
              {/* <p className="text-xs font-thin text-muted-foreground">
                {singerName}
                <span className="text-xs font-thin text-muted-foreground">
                  {" "}
                  • Singer
                </span>
              </p> */}
            </div>
          </div>

          {/* Play Button and Duration */}
          {!lyrics ? (
            <div className="flex flex-col items-center">
              <button
                // onClick={togglePlay}
                className="rounded-full p-2 hover:bg-muted transition-colors"
                // aria-label={isPlaying ? "Pause" : "Play"}
              >
               
                  <PlayIcon className="w-10 h-10" />
                
              </button>
              <span className="text-sm text-muted-foreground">3:45</span>
            </div>
          ) : (
            null
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
              <p className="text-sm font-bold leading-none ">{userName}</p>

              <div className="flex flex-row">
                {myRole.map((role, index) => (
                  <React.Fragment key={index}>
                    <p className="text-xs text-muted-foreground">{role}</p>
                    {index < myRole.length - 1 && <span className="text-xs text-muted-foreground">, </span>}
                  </React.Fragment>
                ))}
              </div>



            </div>
          </div>
          {/* <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{likes}</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}

export default AssetMusicianBox;
