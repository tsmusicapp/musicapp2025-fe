import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import {  fireGetJobRequest, updateJobStatus } from "@/redux/features/job/jobSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface deleteProps {

  StatusModal: (openPopup: React.MouseEvent<HTMLButtonElement>) => void;
  openStatus: boolean;
  jobId: string;
}

export function JobStatus({ StatusModal, openStatus, jobId }: deleteProps) {
  const dispatch = useDispatch<AppDispatch>();
  const fireGetJob = useSelector((state:any) => state.job.fireGetJob);
  const router = useRouter()
  const handleUpdateJob = async (id:string, status:string) => {
    console.log(jobId, "job id here ");
    dispatch(updateJobStatus({ id, status }));
    dispatch(fireGetJobRequest(!fireGetJob))
    StatusModal({} as React.MouseEvent<HTMLButtonElement>);
}


  return (
    <>
      <Dialog
        dismiss={{ outsidePress: false }}
        size="md"
        open={openStatus}
        handler={StatusModal}
      >
        <DialogHeader className="font-bold text-md flex justify-between text-[30px] items-start p-2">
          <div className="text-center" >Update Job Status</div>
          <IconButton variant="text" onClick={StatusModal}>
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
        <DialogBody className="p-0 min-h-[80px] pt-[10px] text-center">
          <div>
            Update the job status , which job be avail for applicants to apply.Make it active or inactive.
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            variant="text"
            color="green"
            className="mr-1"
            onClick={() => {handleUpdateJob(jobId , 'active')}}
          >
            <span>Active</span>
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={() => {handleUpdateJob(jobId , 'inactive')}}
            className="mr-1"
          >
            <span>Inactive</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}