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
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import SelectableBox from "../music-box/selectable-box";
import PocketsizeBox from "../music-box/pocketsize-box";
import { getMyMusic } from "@/redux/features/music/musicSlice";
import { applyJob, fireGetJobRequest, updateMessage } from "@/redux/features/job/jobSlice";
import { Button } from "@material-tailwind/react";
import { BASE_URL } from "@/conf/api";

interface SmallBoxProps {
  openSmallbox: boolean;
  setopenSmallbox: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenSmallbox: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SmallBox = ({ openSmallbox, handleOpenSmallbox, setopenSmallbox }: SmallBoxProps) => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const currentUser = auth.user;
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: any) => state.Music);
  const fireGetJob = useSelector((state: any) => state.job.fireGetJob);
  const Musics = useSelector((state: any) => state.Music);
  const jobData = useSelector((state: any) => state.job);

  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = () => setOpenReview(!openReview);
  const [message, setMessage] = useState("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = event.target.value;
    setMessage(newMessage);
    dispatch(updateMessage(newMessage));
  };

  const handleApply = () => {
    handleOpenReview();
    dispatch(fireGetJobRequest(!fireGetJob));
    dispatch(applyJob(jobData.applyJob));
    setopenSmallbox(false);
  };

  useEffect(() => {
    dispatch(getMyMusic());
  }, []);

  return (
    <>
      <Dialog
        dismiss={{ outsidePress: false }}
        size="md"
        open={openSmallbox}
        handler={handleOpenSmallbox}
        className="bg-white rounded-xl shadow-2xl max-w-2xl mx-auto"
      >
        <DialogHeader className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl">
          <div></div>
          <Typography variant="small" color="white" className="font-semibold text-sm text-center">
          Please select 2 pieces of music that are similar to the customer&rsquo;s for reference
          </Typography>
          <IconButton
            variant="text"
            onClick={handleOpenSmallbox}
            className="text-white hover:bg-white/20 rounded-full"
          >
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
        <DialogBody className="p-6 max-h-[30rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {data ? data.map((props: any, key: any) => (
                <SelectableBox key={key} {...props} />
              )) : <Spinner className="w-12 h-12 mx-auto" />}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end p-4 bg-gray-50 rounded-b-xl">
          <Button
            onClick={handleOpenReview}
            variant="gradient"
            color="blue"
            size="sm"
            className="w-40 h-10 hover:scale-105 transition-transform"
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
        className="bg-white rounded-xl shadow-2xl max-w-4xl mx-auto"
      >
        <DialogHeader className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl">
          <div></div>
          <div className="flex items-center gap-3">
            <Avatar
              src={currentUser && currentUser?.profilePicture.replace('public', '')}
              alt="avatar"
              size="sm"
              className="border-2 border-white shadow-md"
            />
            <Typography variant="small" color="white" className="font-semibold">
              {currentUser && currentUser?.name}
            </Typography>
          </div>
          <IconButton
            variant="text"
            onClick={handleOpenReview}
            className="text-white hover:bg-white/20 rounded-full"
          >
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
        <DialogBody className="p-6">
          <Typography
            variant="h4"
            className="text-center font-bold mb-2"
            color="blue-gray"
          >
            Apply with your Profile
          </Typography>
          <Typography
            variant="small"
            className="text-center mb-4"
            color="blue-gray"
          >
            Your Application will be submitted along with a preview of your Profile and projects.
          </Typography>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="relative border-2 border-gray-300 rounded-lg shadow-md min-h-[20rem] w-full max-w-md">
              <div>
                <img
                  className="h-32 w-full rounded-t-lg object-cover object-center shadow-sm"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
                <Avatar
                  variant="circular"
                  alt="user"
                  size="xl"
                  className="absolute top-24 left-4 border-2 border-white shadow-lg"
                  src={currentUser && currentUser?.profilePicture.replace('public', '')}
                />
              </div>
              <div className="pl-32 pr-4 pt-2 pb-4">
                <Typography variant="h5" color="blue-gray" className="font-semibold">
                  {currentUser && currentUser?.name}
                </Typography>
              </div>
              <div className="px-4 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Musics ? Musics.selectedMusic.map((props: any, key: any) => (
                    <PocketsizeBox key={key} {...props} />
                  )) : <Spinner className="w-12 h-12 mx-auto" />}
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full max-w-md">
              <Textarea
                value={message}
                onChange={handleMessageChange}
                label="Message"
                className="h-64 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center p-4 bg-gray-50 rounded-b-xl">
          <Button
            onClick={handleApply}
            variant="gradient"
            color="blue"
            size="sm"
            className="w-40 h-10 hover:scale-105 transition-transform"
          >
            Submit Application
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default SmallBox;