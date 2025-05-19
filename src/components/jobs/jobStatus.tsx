import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { fireGetJobRequest, updateJobStatus } from "@/redux/features/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";

interface JobStatusProps {
  StatusModal: () => void;
  openStatus: boolean;
  jobId: string;
}

export function JobStatus({ StatusModal, openStatus, jobId }: JobStatusProps) {
  const dispatch = useDispatch<AppDispatch>();
  const fireGetJob = useSelector((state: any) => state.job.fireGetJob);

  const handleUpdateJob = async (id: string, status: string) => {
    try {
      await dispatch(updateJobStatus({ id, status }));
      dispatch(fireGetJobRequest(!fireGetJob));
      toast.success(`Job marked as ${status}`);
      StatusModal();
    } catch (error) {
      StatusModal();
    }
  };

  return (
    <Dialog
      dismiss={{ outsidePress: false }}
      size="md"
      open={openStatus}
      handler={StatusModal}
    >
      <DialogHeader className="font-bold text-[24px] flex justify-between items-center p-4">
        <div>Update Job Status</div>
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
      <DialogBody className="text-center text-base py-6 px-4">
        Make the job available or unavailable for applicants. Choose whether to mark it as <strong>Active</strong> or <strong>Inactive</strong>.
      </DialogBody>
      <DialogFooter className="flex justify-center gap-4">
        <Button
          variant="filled"
          color="green"
          onClick={() => handleUpdateJob(jobId, "active")}
        >
          Active
        </Button>
        <Button
          variant="filled"
          color="red"
          onClick={() => handleUpdateJob(jobId, "inactive")}
        >
          Inactive
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
