import React from "react";
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { getImageUrl } from "@/conf/music";

interface CategoryCardProps {
  id: number;
  musicImage: string;
  singerName: string;
  songName: string;
  userName?: string;
}

function PocketsizeBox({
  id,
  musicImage,
  singerName,
  songName,
  userName,
}: CategoryCardProps) {
  const imagePath = getImageUrl(musicImage);

  return (
    <Card
      className={`relative w-full max-h-[5rem] overflow-hidden rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow`}
    >
      <CardBody
        className={`relative flex items-center justify-between p-2 bg-cover bg-no-repeat bg-[url('https://thumbs.dreamstime.com/z/background-green-bokeh-color-light-color-kt-studio-background-blue-color-illustration-light-color-kt-studio-159654455.jpg')]`}
      >
        <div className="absolute inset-0 h-full w-full bg-black/40" />
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Avatar
              src={imagePath}
              size="sm"
              alt="avatar"
              variant="rounded"
              className="h-8 w-8 object-cover"
            />
            <div>
              <Typography
                variant="small"
                color="white"
                className="font-bold text-xs"
              >
                {singerName}
              </Typography>
              <Typography
                variant="small"
                color="white"
                className="text-[0.6rem]"
              >
                {songName}
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PlayIcon className="h-5 w-5 text-white cursor-pointer" />
            {userName ? (
              <div className="flex items-center gap-1">
                <Avatar
                  src={imagePath}
                  alt="composer avatar"
                  className="h-5 w-5 object-cover"
                />
                <Typography
                  variant="small"
                  color="white"
                  className="text-[0.7rem] font-medium"
                >
                  {userName}
                </Typography>
                <Typography
                  variant="small"
                  color="white"
                  className="text-[0.5rem] underline font-normal"
                >
                  Composer
                </Typography>
              </div>
            ) : (
              <Typography
                variant="small"
                color="white"
                className="text-[0.6rem] italic"
              >
                No composer
              </Typography>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PocketsizeBox;