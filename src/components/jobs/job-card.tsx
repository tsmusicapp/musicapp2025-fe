"use client";
import {
  fireGetJobRequest,
  getJobs,
  saveJob,
} from "@/redux/features/job/jobSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useAuth } from "@/utils/useAuth";
import { formatDate } from "@/utils/utils";
import { EllipsisHorizontalIcon, StarIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteJob } from "./deleteJob";
import { JobStatus } from "./jobStatus";
import LearnMore from "./learnMore";
import SmallBox from "./smallBox";
import { LoginModal } from "../modals/AuthModal";

interface CategoryCardProps {
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
  savedBy: string[];
  createdOn: Date;
  isApplied: boolean | null;
}

const JobCard = ({
  applicantName,
  category,
  cultureArea,
  id,
  projectTitle,
  savedBy,
  createdOn,
}: CategoryCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: any) => state.job);
  const fireGetJob = useSelector((state: RootState) => state.job.fireGetJob);
  const appliedJobs = useSelector((state: RootState) => state.job.appliedJobs);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [savedJob, setSaveJob] = useState(false);
  const [applied, setApplied] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openSmallbox, setopenSmallbox] = useState(false);
  const [selectedJob, setSelectedJob] = useState<CategoryCardProps | null>(
    null
  );
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const [visibleDropdownId, setVisibleDropdownId] = useState<string | null>(
    null
  );

  const userString = localStorage.getItem("auth");
  const loggedInUser: any = userString ? JSON.parse(userString) : null;

  const delModal = () => setOpenDelete(!openDelete);

  const handleOpen = () => setOpenPopup(!openPopup);

  const handleOpenSmallbox = () => setopenSmallbox(!openSmallbox);

  const StatusModal = () => setOpenStatus(!openStatus);

  const handleSaveJob = (id: string) => {
    dispatch(saveJob(id));
    dispatch(getJobs());
    dispatch(fireGetJobRequest(!fireGetJob));
    setSaveJob(!savedJob);
  };

  const learnMore = (id: any) => {
    const selectedJobs = data.jobs.filter((item: any) => item.id == id);
    setSelectedJob(selectedJobs[0]);
    handleOpen();
  };

  const StatusModalOpen = (id: string) => {
    const selectedJobs = data.jobs.filter((item: any) => item.id == id);
    setSelectedJob(selectedJobs[0]);
    StatusModal();
  };
  const delModalOpen = (id: string) => {
    const selectedJobs = data.jobs.filter((item: any) => item.id == id);
    setSelectedJob(selectedJobs[0]);
    delModal();
  };
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target && !target.closest(".dropdown-wrapper")) {
      setVisibleDropdownId(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const appliedJobIds = appliedJobs
    ? appliedJobs.map((job: any) => job.id)
    : [];

  return (
    <>
      <Card className="relative group min-h-[12rem] w-[21rem] overflow-hidden hover:shadow-xl shadow-lg border-1 border-gray-100 rounded-xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-white to-gray-50" />
        <CardBody className="relative flex flex-col justify-between p-4 space-y-3">
          {/* Header Section */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Avatar
                  src="https://picsum.photos/200/300"
                  size="md"
                  className="border-2 border-white shadow-sm"
                  alt="avatar"
                />
                <div>
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 text-sm leading-tight"
                  >
                    {applicantName}
                  </Typography>
                  <Typography variant="small" className="text-gray-500 text-xs">
                    Posted {formatDate(createdOn)}
                  </Typography>
                </div>
              </div>

              {loggedInUser && (
                <div className="flex items-center gap-2">
                  <StarIcon
                    width={24}
                    height={24}
                    className={`cursor-pointer transition-colors duration-200 ${
                      savedBy.includes(loggedInUser.user.id)
                        ? "text-amber-400 fill-current"
                        : "text-gray-400 hover:text-amber-300"
                    }`}
                    onClick={() => handleSaveJob(id)}
                  />
                  <div className="relative group">
                    <EllipsisHorizontalIcon
                      className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                      onClick={() =>
                        setVisibleDropdownId((prev) =>
                          prev === id ? null : id
                        )
                      }
                    />
                    {/* Dropdown Menu */}
                    <div
                      className={`absolute right-0 top-6 bg-white rounded-lg shadow-lg p-2 w-32 border border-gray-100 transition-all duration-200 ${
                        visibleDropdownId === id ? "visible" : "invisible"
                      }`}
                    >
                      <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-50 rounded-md">
                        Copy Link
                      </button>
                      <button
                        onClick={() => StatusModalOpen(id)}
                        className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-50 rounded-md"
                      >
                        Status
                      </button>
                      <button
                        onClick={() => delModalOpen(id)}
                        className="w-full text-left px-2 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-1" />

            {/* Content Section */}
            <div className="space-y-2">
              <Typography
                variant="h5"
                className="font-bold text-gray-900 text-lg"
              >
                {projectTitle}
              </Typography>

              <div className="flex flex-wrap gap-2">
                <Chip
                  value={category.join(", ")}
                  color="blue"
                  className="rounded-full text-xs px-3 py-1 bg-blue-50 text-blue-700"
                />
                <Chip
                  value={cultureArea.join(", ")}
                  color="amber"
                  className="rounded-full text-xs px-3 py-1 bg-amber-50 text-amber-700"
                />
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-center pt-2">
            {loggedInUser ? (
              appliedJobs ? (
                !appliedJobIds.includes(id) ? (
                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md px-6 transition-all"
                    onClick={() => learnMore(id)}
                  >
                    Apply Now
                  </Button>
                ) : (
                  <Chip
                    value={`Applied days ago`}
                    size="sm"
                    className="rounded-full bg-emerald-100 text-emerald-700 text-xs px-4"
                  />
                )
              ) : (
                <Button
                  className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md px-6 transition-all"
                  onClick={() => learnMore(id)}
                >
                  Apply Now
                </Button>
              )
            ) : (
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md px-6 transition-all"
                onClick={() => setLoginModalOpen(true)}
              >
                Apply Now
              </Button>
            )}

            <div className="flex items-center text-sm text-gray-500">
              {/* <CalendarDaysIcon className="w-4 h-4 mr-1" />
        Due {formatDate(deadlineDate)} */}
            </div>
          </div>
        </CardBody>
      </Card>

      {selectedJob != null && openPopup && (
        <LearnMore
          selectedJob={selectedJob}
          handleOpenSmallbox={handleOpenSmallbox}
          openPopup={openPopup}
          handleOpen={handleOpen}
        />
      )}
      {openSmallbox && (
        <SmallBox
          handleOpen={handleOpen}
          openSmallbox={openSmallbox}
          setopenSmallbox={setopenSmallbox}
          handleOpenSmallbox={handleOpenSmallbox}
        />
      )}
      {selectedJob != null && openDelete && (
        <DeleteJob
          jobId={selectedJob?.id}
          delModal={delModal}
          openDelete={openDelete}
        />
      )}

      {selectedJob != null && openStatus && (
        <JobStatus
          jobId={selectedJob?.id}
          StatusModal={StatusModal}
          openStatus={openStatus}
        />
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default JobCard;
