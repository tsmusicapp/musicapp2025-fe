
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import Image from "next/image";
import {
    Card,
    CardBody,
    
    Avatar,
    Typography,

    Chip,
} from "@material-tailwind/react";
import { MapPinIcon, StarIcon as StaredIcon } from "@heroicons/react/24/solid";
import { StarIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { useAuth } from '@/utils/useAuth';
import LearnMore from './learnMore';
import SmallBox from './smallBox';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteJob } from './deleteJob';
import { AppDispatch, RootState } from '@/redux/store';
import { fireGetJobRequest, getAppliedJobs, getJobs, saveJob } from '@/redux/features/job/jobSlice';
import { JobStatus } from './jobStatus';
import { formatDate } from '@/utils/utils';

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


const jobCard = ({
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

    // console.log("fireGetJob", appliedJobs);

    const [openDelete, setOpenDelete] = React.useState(false);
    const [savedJob, setSaveJob] = useState(false);
    const [applied, setApplied] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [openSmallbox, setopenSmallbox] = useState(false);
    const [selectedJob, setSelectedJob] = useState<CategoryCardProps | null>(null);
    const [openStatus, setOpenStatus] = useState<boolean>(false);

    const userString = localStorage.getItem('auth');
    const user: any = userString ? JSON.parse(userString) : null;

    const delModal = () => setOpenDelete(!openDelete);

    const handleOpen = () => setOpenPopup(!openPopup);

    const handleOpenSmallbox = () => setopenSmallbox(!openSmallbox);

    const StatusModal = () => setOpenStatus(!openStatus);

    // const formatDate = (dateString: Date) => {
    //     const date = new Date(dateString);
    //     return date.toLocaleDateString('en-US', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric'
    //     });
    // }


    const handleSaveJob = (id: string) => {
        dispatch(saveJob(id))
        dispatch(getJobs())
        dispatch(fireGetJobRequest(!fireGetJob))
        setSaveJob(!savedJob);
    }

    const learnMore = (id: any) => {
        const selectedJobs = data.jobs.filter((item: any) => item.id == id)
        setSelectedJob(selectedJobs[0]);
        handleOpen();
    }

    const StatusModalOpen = (id: string) => {
        const selectedJobs = data.jobs.filter((item: any) => item.id == id)
        setSelectedJob(selectedJobs[0]);
        StatusModal();
    }
    const delModalOpen = (id: string) => {
        const selectedJobs = data.jobs.filter((item: any) => item.id == id)
        setSelectedJob(selectedJobs[0]);
        delModal();
    }

    const appliedJobIds = appliedJobs ? appliedJobs.map((job: any) => job.id) : [];




    // console.log(appliedJobIds, "job ids");

    const { getUserRole } = useAuth();

    const userRole = getUserRole();

    // console.log(userRole, "current role");


    return (
        <>
            <Card className="relative grid min-h-[10rem] max-h-[17rem] w-[21rem] overflow-hidden hover:shadow-xl shadow-md border-2">
                <div className="absolute inset-0 h-full w-full bg-white" />
                <CardBody className="relative flex flex-col justify-between p-3">
                    <div className="flex flex-col">
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-row gap-4">
                                <Avatar src="https://picsum.photos/200/300" size="sm" alt="avatar" />
                                <div>
                                    <div className="flex items-center flex-row gap-1">
                                        <Typography
                                            variant="small"
                                            color="black"
                                            className="font-bold text-xs pt-1"
                                        >
                                            {applicantName}
                                        </Typography>
                                        <span className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-800">
                                            PRO
                                        </span>
                                        <div className="flex flex-row pl-[0.5rem]">
                                            <MapPinIcon height={12} color="black" />
                                            <Typography
                                                variant="small"
                                                color="black"
                                                className="text-[0.4rem] pt-[0.1rem] font-bold"
                                            >
                                                United States
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography
                                        variant="small"
                                        color="black"
                                        className="font-bold text-[0.6rem] pt-[0.1rem]"
                                    >
                                        Manager of Entertainment Company A
                                    </Typography>
                                </div>
                            </div>
                            {
                                userRole === 'user' ?

                                    <StarIcon
                                        width={26}
                                        height={26}
                                        color="black"
                                        onClick={() => handleSaveJob(id)}
                                        fill={`${savedBy.includes(user.user.id) ? "yellow" : "#ffffff"}`}
                                        className="cursor-pointer hover:scale-125"
                                    /> :
                                    <div className="group relative cursor-pointer py-2">
                                        <EllipsisHorizontalIcon className="menu-hover rounded-full h-[1.9rem] cursor-pointer bg-gray-200 hover:bg-gray-300 hover:rounded-full text-black" />
                                        <div className="invisible z-50 absolute group-hover:visible bg-white divide-gray-100 rounded-lg shadow w-[6rem] top-10 right-0 dark:bg-gray-700">
                                            <a className="block px-2 py-2 hover:bg-gray-100 text-xs font-semibold tracking-wider">
                                                Copy Link
                                            </a>
                                            <a onClick={() => StatusModalOpen(id)} className="block px-2 py-2 hover:bg-gray-100 text-xs font-semibold tracking-wider">
                                                Status
                                            </a>
                                            <a onClick={() => delModalOpen(id)} className="block px-2 py-2 hover:bg-gray-100 text-red-500 text-xs font-semibold tracking-wider">
                                                Delete
                                            </a>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="flex items-center justify-between gap-4 mt-[0.3rem]">
                            <Typography variant="small" className="font-bold" color="black">
                                {projectTitle}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal text-[0.7rem]"
                            >
                                Work Content: {category.join(', ')}
                            </Typography>
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal text-[0.7rem]"
                            >
                                Music Culture Region: {cultureArea.join(', ')}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography
                            variant="small"
                            color="black"
                            className="text-[0.6rem] mt-[0.6rem]"
                        >

                            {formatDate(createdOn)}
                        </Typography>
                        {
                            userRole === 'user' && (appliedJobs ? !appliedJobIds.includes(id) : true) ?
                                <Button
                                    size='md'
                                    className=" text-black mt-[10px] min-w-[100px] text-center bg-blue-400 normal-case"
                                    onClick={() => learnMore(id)}
                                >
                                    Apply
                                    {/* <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                        />
                                    </svg> */}
                                </Button> :
                                userRole === 'user' && (appliedJobs ? appliedJobIds.includes(id) : true) ?
                                    <>
                                        <Chip
                                            value="Applied 0 days ago"
                                            size="sm"
                                            className="text-[0.5rem] h-[1.4rem] text-black bg-blue-gray-100 normal-case mr-[1rem]"
                                        />
                                    </>
                                    :
                                    <Button
                                        className=" text-black mt-[10px] bg-blue-400 normal-case"
                                    >View Applications {`(15)`}</Button>
                        }
                    </div>
                    <div className="flex justify-between pt-[0.4rem]">

                    </div>
                </CardBody>
            </Card>

            {
                (selectedJob != null && openPopup) && <LearnMore selectedJob={selectedJob} handleOpenSmallbox={handleOpenSmallbox} openPopup={openPopup} handleOpen={handleOpen} />
            }
            {
                openSmallbox && <SmallBox handleOpen={handleOpen} openSmallbox={openSmallbox} handleOpenSmallbox={handleOpenSmallbox} />
            }
            {
                (selectedJob != null && openDelete) && <DeleteJob jobId={selectedJob?.id} delModal={delModal} openDelete={openDelete} />
            }

            {
                (selectedJob != null && openStatus) && <JobStatus jobId={selectedJob?.id} StatusModal={StatusModal} openStatus={openStatus} />
            }
        </>
    )
}

export default jobCard