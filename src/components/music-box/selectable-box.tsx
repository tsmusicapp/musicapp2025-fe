import React from "react";
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";
import { PlayIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateMusicIds } from "@/redux/features/job/jobSlice";
import { selectedMusic } from "@/redux/features/music/musicSlice";
import { BASE_URL } from "@/conf/api";

interface CategoryCardProps {
  id: string;
  musicImage: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName?: string;
}

interface ClickProps {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

function SelectableBox({
  id,
  musicImage,
  singerName,
  songName,
  imgComposer,
  composerName,
}: CategoryCardProps) {
  const [selected, setSelected] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const values = useSelector((state: any) => state.job);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    dispatch(updateMusicIds(id));
    dispatch(selectedMusic(id));
    e.stopPropagation();
    setSelected(!selected);
  };

  const modifiedPath = musicImage.replace('public', '');

  return (
    <button
      className="w-full transition-transform hover:scale-105"
      onClick={(e) => handleClick(e, id)}
    >
      <Card
        className={`relative w-full min-h-[5rem] overflow-hidden rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow ${
          selected ? "border-blue-500" : "border-gray-200"
        }`}
      >
        <div
          className={`absolute inset-0 h-full w-full bg-white/80 ${
            selected ? "bg-blue-100" : ""
          }`}
        />
        <CardBody className="relative flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Avatar
              src={modifiedPath}
              alt="avatar"
              variant="rounded"
              className="h-12 w-12 object-cover"
            />
            <div className="flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold text-sm"
              >
                {singerName}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs"
              >
                {songName}
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {composerName ? (
              <div className="flex items-center gap-2">
                <Avatar
                  src={BASE_URL + imgComposer.replace('public', '')}
                  alt="composer avatar"
                  size="sm"
                  className="h-8 w-8 object-cover"
                />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium text-xs"
                >
                  {composerName}
                </Typography>
              </div>
            ) : (
              <Typography
                variant="small"
                color="gray"
                className="text-xs italic"
              >
                No composer
              </Typography>
            )}
            <div className="flex items-center">
              <PlayIcon className="h-6 w-6 text-blue-500 cursor-pointer" />
              {values?.applyJob.musicIds.includes(id) && (
                <CheckIcon className="w-6 h-6 text-green-500 ml-2" />
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </button>
  );
}

export default SelectableBox;