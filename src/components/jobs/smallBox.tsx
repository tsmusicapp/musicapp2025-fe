import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";

import {
  Avatar,
  Typography,
  IconButton,
  Textarea
} from "@material-tailwind/react";
import { MapPinIcon, StarIcon as StaredIcon } from "@heroicons/react/24/solid";
import { StarIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Badge, Button } from "@material-tailwind/react";
import { use, useEffect, useState } from "react";
import { CATEGORIES, SELECTED } from "@/conf/jobsprops";
import SelectableBox from "../music-box/selectable-box";
import PocketsizeBox from "../music-box/pocketsize-box";
import { getMyMusic } from "@/redux/features/music/musicSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { MusicallService } from "@/services/musicall.service";
import { BASE_URL } from "@/conf/api";
import { applyJob, fireGetJobRequest, updateMessage } from "@/redux/features/job/jobSlice";

// id,
// imgSong,
// singerName,
// songName,
// imgComposer,
// composerName,
// }


let Sdata = [
  {
    id: 1,
    imgSong: "https://picsum.photos/200/300",
    singerName: "Singer Name",
    songName: "Song Name",
    imgComposer: "https://picsum.photos/200/300",
    composerName: "Composer Name",
  },
  {
    id: 2,
    imgSong: "https://picsum.photos/200/300",
    singerName: "Singer Name",
    songName: "Song Name",
    imgComposer: "https://picsum.photos/200/300",
    composerName: "Composer Name",
  },
  {
    id: 3,
    imgSong: "https://picsum.photos/200/300",
    singerName: "Singer Name",
    songName: "Song Name",
    imgComposer: "https://picsum.photos/200/300",
    composerName: "Composer Name",
  },
  {
    id: 4,
    imgSong: "https://picsum.photos/200/300",
    singerName: "Singer Name",
    songName: "Song Name",
    imgComposer: "https://picsum.photos/200/300",
    composerName: "Composer Name",
  },
]


interface smallboxprops {
  openSmallbox: boolean;
  handleOpenSmallbox: (openPopup: React.MouseEvent<HTMLButtonElement>) => void;
  handleOpen: (openPopup: React.MouseEvent<HTMLButtonElement>) => void;
}

const smallBox = ({ openSmallbox, handleOpenSmallbox }: smallboxprops) => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const currentUser = auth.user;
  // console.log(currentUser)
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: any) => state.Music)
  const fireGetJob = useSelector((state: any) => state.job.fireGetJob);
  const Musics = useSelector((state: any) => state.Music)
  const jobData = useSelector((state: any) => state.job)

  console.log(jobData, "applyjobres")

  const [openPopup, setOpenPopup] = useState(false);
  //   const [openSmallbox, setopenSmallbox] = useState(false);
  const [openReview, setopenReview] = useState(false);
  //   const handleOpenSmallbox = () => setopenSmallbox(!openSmallbox);
  const handleOpenReview = () => setopenReview(!openReview);
  const [message, setMessage] = useState("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    dispatch(updateMessage(message));
  };

  const handleApply = () => {
    handleOpenReview();
    dispatch(fireGetJobRequest(!fireGetJob));
    dispatch(applyJob(jobData.applyJob))
    setOpenPopup(false);
    handleOpenSmallbox
  };

  useEffect(() => {
    dispatch(getMyMusic())
  }, [])

  return (
    <>
      <Dialog
        dismiss={{ outsidePress: false }}
        size="md"
        open={openSmallbox}
        handler={handleOpenSmallbox}
      >
        <DialogHeader className="font-light text-md flex justify-between py-2 shadow-md">
          <div></div>
          <Typography
            variant="small"
            className="font-bold text-xs"
            color="black"
          >
            please select 2 pieces of music that are similar to the customers
            for reference
          </Typography>
          <IconButton variant="text" onClick={handleOpenSmallbox}>
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
        </DialogHeader>
        <DialogBody className="p-0 h-[30rem] overflow-y-scroll">
          <div className="flex items-center justify-center py-2">
            <div className="grid grid-cols-2 gap-4">
              {data ? data.map((props, key) => (
                <SelectableBox key={key} {...props} />
              )) : <Spinner className="w-12 h-12" />
              }
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end py-2 px-6">
          <Button
            onClick={handleOpenReview}
            variant="gradient"
            color="blue"
            size="sm"
            className="hover:scale-100"
          >
            Confirm Application
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        dismiss={{ outsidePress: false }}
        size="lg"
        open={openReview}
        handler={handleOpenReview}
      >
        <DialogHeader className="flex flex-row justify-between font-light text-md gap-4 py-2 shadow-md">
          <div className=""></div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Avatar
              //   src={fotoprofile}
              src={currentUser && BASE_URL + currentUser?.profilePicture.replace('public', '')}
              alt="avatar"
              size="sm"
              className=""
            />
            <Typography variant="small" className="font-bold" color="black">
              {currentUser && currentUser?.name}
            </Typography>
          </div>
          <IconButton variant="text" onClick={handleOpenReview}>
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
        </DialogHeader>
        <DialogBody className="p-2">
          <Typography
            variant="h4"
            className="flex justify-center font-bold mb-2"
            color="black"
          >
            Apply with your Profile
          </Typography>
          <Typography
            variant="small"
            className="flex justify-center mb-2"
            color="blue-gray"
          >
            Your Application will be submitted along with a preview of your
            Profile and projects.
          </Typography>
          <div className="flex flex-row justify-center gap-4">
            <div className="flex flex-col relative border-2 p-0 border-black/20 rounded-md min-h-[20rem] min-w-[25.5rem] max-w-[25.5rem] mb-2">
              <div className="">
                <img
                  className="h-fit max-h-[8rem] w-full rounded-md object-cover object-center shadow-md shadow-blue-gray-900/50"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
                <Avatar
                  variant="circular"
                  alt="user 1"
                  size="xl"
                  className="absolute object-cover object-center top-[6.5rem]  border-2 border-black hover:z-10 focus:z-10"
                  src={currentUser && BASE_URL + currentUser?.profilePicture.replace('public', '')}
                />
              </div>
              <div className="pl-[6.5rem]">
                <Typography variant="h5" className="p-2" color="blue-gray">
                  {currentUser && currentUser?.name}
                </Typography>
              </div>
              <div className="mt-1 my-2 min-h-[10rem] p-2">
                <div className="grid grid-cols-1 gap-2">
                  <div className="grid grid-cols-2 gap-3">
                    {/* <PocketsizeBox /> */}
                    {Musics ? Musics.selectedMusic.map((props, key) => (
                      <PocketsizeBox key={key} {...props} />
                    )) :
                      <Spinner className="w-12 h-12" />
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-2">
              <Textarea
                value={message}
                // value="Hello there"
                onChange={handleMessageChange}
                label="Message"
                className="h-92 !w-96" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center py-4 px-6">
          <Button
            onClick={handleApply}
            variant="gradient"
            color="blue"
            size="sm"
            className="hover:scale-100"
          >
            Submit Application
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default smallBox