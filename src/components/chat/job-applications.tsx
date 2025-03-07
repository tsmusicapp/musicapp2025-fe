import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Badge,
  Spinner,
} from "@material-tailwind/react";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateDrawer } from "@/redux/features/chat/chatSlice";
import { useEffect } from "react";
import { getMyJobs } from "@/redux/features/job/jobSlice";

export default function JobApplications() {
  const dispatch = useDispatch<AppDispatch>();
  const jobData = useSelector<RootState, any[]>((state) => state.job.myJobs)

  console.log(jobData, 'jobs Data in here')

  useEffect(() => {
    dispatch(getMyJobs())
  }, [dispatch])

  return (
    <>
      {jobData ? jobData.map((job: any) => (
      <List key={job.id}> {/* Add a unique key here */}
        <ListItem
        className="relative hover:bg-blue-gray-200/30 gap-3"
        onClick={() => dispatch(updateDrawer())}
        >
        <ListItemPrefix className="mr-0">
          <Badge
          placement="top-end"
          overlap="circular"
          color="blue"
          withBorder
          >
          <Avatar
            src="https://picsum.photos/200/300"
            alt="avatar"
          />
          </Badge>
        </ListItemPrefix>
        <div className="max-w-[14rem] w-[14rem]">
          <Typography variant="h6" color="blue">
          {job.projectTitle}
          </Typography>
          <Typography variant="small" color="blue" className="font-normal">
          {job.timeFrame} - 1 New Applications
          </Typography>
        </div>
        <div className="flex justify-end">
          <ChevronRightIcon
          strokeWidth={2.5}
          className="h-4 w-4"
          color="blue"
          />
        </div>
        </ListItem>
      </List>
      )) : <Spinner className="h-5 w-5" />}
    </>
  );
  

}
