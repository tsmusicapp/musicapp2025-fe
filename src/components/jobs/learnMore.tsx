import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  Avatar,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { MapPinIcon, StarIcon as StaredIcon } from "@heroicons/react/24/solid";
import { StarIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Badge, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateJobId } from "@/redux/features/job/jobSlice";
interface JobData {
  applicantName: string;
  applicantAvatar: string | null;
  applicantBackgroundImage: string | null;
  applicantSelectedSongs: string[] | null;
  budget: string[];
  category: string[];
  createdAt: string;
  createdBy: string;
  cultureArea: string[];
  description: string;
  isHaveLyric: boolean;
  id: string;
  lyricLanguage: string;
  musicUse: string[];
  preferredLocation: string;
  projectTitle: string;
  timeFrame: string;
  // applicantName: string;
  // applicantSelectedSongs: string[]; // Assuming these are IDs or strings
  // budget: string;
  // category: string[];
  // createdBy: string;
  // cultureArea: string[];
  // description: string;
  // id: string;
  // isHaveLyric: boolean;
  // lyricLanguage: string;
  // musicUse: string[];
  // projectTitle: string;
  // timeFrame: string;
}

interface popoupProps {
  openPopup: boolean;
  handleOpen: (openPopup: React.MouseEvent<HTMLButtonElement>) => void;
  handleOpenSmallbox: (openPopup: React.MouseEvent<HTMLButtonElement>) => void;
  selectedJob: JobData;

}

const LearnMore = ({ openPopup, handleOpen, handleOpenSmallbox, selectedJob }: popoupProps) => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateJobId(selectedJob.id));
  }, [selectedJob]);

  return (
    <Dialog
      dismiss={{ outsidePress: false }}
      size="lg"
      open={openPopup}
      handler={handleOpen}
    >
      <DialogHeader className="font-light text-md flex justify-between items-start p-2">
        <div></div>
        <div className="flex flex-col z-10 justify-center items-center text-center gap-[0.1rem]">
          <Avatar
            src='https://picsum.photos/200/300'
            alt="avatar"
            size="lg"
            className=""
          />
          <Typography variant="h5" color="black" className="">
            {selectedJob.projectTitle}

          </Typography>
          <Typography
            variant="small"
            color="black"
            className="w-full md:max-w-full lg:max-w-2xl"
          >
            {selectedJob.applicantName}
          </Typography>
          <div className="flex items-center gap-2">
            <Button
              variant="gradient"
              color="blue"
              size="sm"
              className="hover:scale-110 w-[8rem] h-[1.8rem] p-1"
              onClick={handleOpenSmallbox}
            >
              APPLY
            </Button>
            <StarIcon
              color="black"
              width={25}
              height={25}
              className="cursor-pointer hover:scale-125"
            />
          </div>
        </div>
        <div className="flex flex-row absolute mt-[3.5rem] right-[20rem] top-[2.7rem]">
          <MapPinIcon height={12} color="black" />
          <Typography
            variant="small"
            color="black"
            className="text-[0.6rem] font-bold"
          >
            United Kingdom
          </Typography>
        </div>
        <div className="">
          <IconButton variant="text" onClick={handleOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
          <div></div>
          <div></div>
        </div>
      </DialogHeader>
      <DialogBody className="p-0 h-[27rem] overflow-y-scroll">
        <div className="flex flex-row justify-between px-4 py-1 gap-6">
          <div className="flex flex-col p-0 rounded-md min-h-[20rem] min-w-[25.5rem] max-w-[35.5rem] mb-2">
            <div className="max-w-screen-lg text-justify">
              {/* <Typography className="my-[0.1rem] font-normal !text-gray-500 text-xs tracking-wider leading-relaxed">
                  {selectedJob.description}
                </Typography> */}

              <Typography variant="paragraph" color="blue-gray">
                Tasks and Responsibilites
              </Typography>

              <Typography className="my-[0.1rem] font-normal !text-gray-500 text-xs tracking-wider leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industrys
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining
                essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>

              <Typography variant="paragraph" color="blue-gray">
                So what does the new record for the lowest level of winter ice
                actually mean
              </Typography>

              <Typography className="my-[0.1rem] font-normal !text-gray-500 text-xs tracking-wider leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industrys
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining
                essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </Typography>
              <div className="container mx-auto px-4 py-8">
                <div className="w-full mb-10 md:flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="gradient"
                      color="blue"
                      size="sm"
                      className="hover:scale-110 w-[8rem] h-[1.8rem] p-1"
                      onClick={handleOpenSmallbox}
                    >
                      APPLY
                    </Button>
                    <StarIcon
                      color="black"
                      width={25}
                      height={25}
                      className="cursor-pointer hover:scale-125"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-wrap mb-2 p-2 w-[20rem] h-auto">
            <div className="flex flex-wrap w-full h-fit border-2 border-gray-500 rounded-md">
              <div className="p-2">
                <Typography variant="small" color="gray" className="text-xs">
                  Description
                </Typography>
                <Typography variant="small"
                  color="black"
                  className="mb-2 font-bold">
                  {selectedJob.description}
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-2 font-bold"
                >
                  {selectedJob.category && selectedJob.category.length > 0 ? selectedJob.category.join(', ') : 'No categories'}
                  {/* No Categories */}
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Music Cultural Area
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-2 font-bold"
                >
                  {selectedJob.cultureArea && selectedJob.cultureArea.length > 0 ? selectedJob.cultureArea.join(', ') : 'No culture'}
                  No culture
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Lyrics Language
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-2 font-bold"
                >
                  Language
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Music Usage
                </Typography>
                <Typography

                  variant="small"
                  color="black"
                  className="mb-2 font-bold"
                >
                  {selectedJob.musicUse && selectedJob.musicUse.length > 0 ? selectedJob.musicUse.join(', ') : 'No music use'}
                  No music
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Budget
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-2 font-bold"
                >
                  {/* {budget} */}
                  {selectedJob.budget}
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Timeframe
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-2 font-bold"
                >
                  {/* {timeFrame} */}
                  {selectedJob.timeFrame}
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Job Location
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-2 font-bold"
                >
                  Anywhere
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Aplicant Name
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-2 font-bold"
                >
                  {/* {applicantName} */}
                  {selectedJob.applicantName}
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Job Posted
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-2 font-bold"
                >
                  {/* {new Date(createdAt).toLocaleString()} */}
                  Created At
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default LearnMore