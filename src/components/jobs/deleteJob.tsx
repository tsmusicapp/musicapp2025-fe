import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { deleteJob, fireGetJobRequest } from "@/redux/features/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";

interface DeleteProps {
  delModal: () => void;
  openDelete: boolean;
  jobId: string;
}

export function DeleteJob({ delModal, openDelete, jobId }: DeleteProps) {
  const dispatch = useDispatch<AppDispatch>();
  const fireGetJob = useSelector((state: any) => state.job.fireGetJob);

  const handleDeleteJob = async () => {
    try {
      await dispatch(deleteJob(jobId));
      dispatch(fireGetJobRequest(!fireGetJob));
      toast.success("Job Deleted Successfully");
      delModal();
    } catch (error) {
      toast.error("Failed to delete job.");
    }
  };

  return (
    <Dialog
      dismiss={{ outsidePress: false }}
      size="md"
      open={openDelete}
      handler={delModal}
    >
      <DialogHeader className="font-bold text-[24px] flex justify-between items-center p-4">
        <div>Delete Job</div>
        <IconButton variant="text" onClick={delModal}>
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
      <DialogBody className="text-center text-base py-6">
        Are you sure you want to delete this job?
      </DialogBody>
      <DialogFooter className="flex justify-center gap-4">
        <Button variant="text" color="green" onClick={delModal}>
          Cancel
        </Button>
        <Button variant="filled" color="red" onClick={handleDeleteJob}>
          Yes, Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
