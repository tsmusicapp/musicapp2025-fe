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
  Button,
} from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
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
}

interface PopupProps {
  openPopup: boolean;
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleOpenSmallbox: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedJob: JobData;
}

const LearnMore = ({
  openPopup,
  handleOpen,
  handleOpenSmallbox,
  selectedJob,
}: PopupProps) => {
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
      className="bg-white rounded-xl shadow-2xl max-w-3xl mx-auto"
    >
      <DialogHeader className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl">
        <div className="flex items-center space-x-4">
          <Avatar
            src={selectedJob.applicantAvatar || "https://picsum.photos/200/300"}
            alt="avatar"
            size="md"
            className="border-2 border-white shadow-md"
          />
          <div>
            <Typography variant="h5" color="white" className="font-semibold">
              {selectedJob.projectTitle ||
                "Intro Music for 'Wellness Vibes' Podcast"}
            </Typography>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-4 w-4 text-white" />
              <Typography
                variant="small"
                color="white"
                className="text-xs font-medium"
              >
                {selectedJob.preferredLocation || "United Kingdom"}
              </Typography>
            </div>
          </div>
        </div>
        <IconButton
          variant="text"
          onClick={handleOpen}
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
      <DialogBody className="p-6 max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Description
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium whitespace-normal break-words"
            >
              {selectedJob.description}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Category
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              {selectedJob.category && selectedJob.category.length > 0
                ? selectedJob.category.join(", ")
                : "Arrangement"}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Music Cultural Area
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              {selectedJob.cultureArea && selectedJob.cultureArea.length > 0
                ? selectedJob.cultureArea.join(", ")
                : "No culture"}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Lyrics Language
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              {selectedJob.lyricLanguage || "Lyrics Language"}
            </Typography>
          </div>
          <div>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Music Usage
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              {selectedJob.musicUse && selectedJob.musicUse.length > 0
                ? selectedJob.musicUse.join(", ")
                : "website/tech/interest"}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Budget
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              {"Not specified"}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Timeframe
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              {selectedJob.timeFrame || "2025-05-15 to 2025-06-06"}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Job Location
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              {selectedJob.preferredLocation || "Anywhere"}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Applicant Name
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              {selectedJob.applicantName || "Not specified"}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs font-medium uppercase"
            >
              Job Posted
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              {selectedJob.createdAt
                ? new Date(selectedJob.createdAt).toLocaleString()
                : "Not specified"}
            </Typography>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center space-x-4 p-4 bg-gray-50 rounded-b-xl">
        <Button
          variant="gradient"
          color="blue"
          size="sm"
          className="w-32 h-10 hover:scale-105 transition-transform"
          onClick={handleOpenSmallbox}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          color="red"
          size="sm"
          className="w-32 h-10"
          onClick={handleOpen}
        >
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default LearnMore;
