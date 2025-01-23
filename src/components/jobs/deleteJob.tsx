import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { deleteJob } from "@/redux/features/job/jobSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface deleteProps {
    
    delModal: (openPopup: React.MouseEvent<HTMLButtonElement>) => void;
    openDelete: boolean;
    jobId : string;
}
 
export function DeleteJob({ delModal , openDelete ,jobId}:deleteProps ) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const handleDeleteJob= async(jobId:string)=>{
        console.log(jobId , "job id here ");
        dispatch(deleteJob(jobId));
        delModal;
        router.push('/jobs');
    }
  return (
    <>
      <Dialog
        dismiss={{ outsidePress: false }}
        size="md"
        open={openDelete}
        handler={ delModal}
      >
        <DialogHeader className="font-bold text-md flex justify-center text-[30px] items-start p-2">
          <div className="text-center" >Delete Job</div>
          <IconButton variant="text" onClick={ delModal}>
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
            Are You Sure You Want To Delete This Job?
          </div>
        </DialogBody>  
          <DialogFooter className="flex justify-center">  
          <Button
            variant="text"
            color="green"
            onClick={ delModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>  
          <Button
            variant="text"
            color="red"
            onClick={ ()=>handleDeleteJob(jobId) }
            className="mr-1"
          >
            <span>Yes, Delete</span>
          </Button>  
          </DialogFooter>
       </Dialog>
    </>
  );
}