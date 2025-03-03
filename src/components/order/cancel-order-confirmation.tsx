import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelDialog,
  arbitrationDialog,
} from "@/redux/features/offer/offerSlice";

export default function CancelOrderConfirmation() {
  const dispatch = useDispatch<AppDispatch>();
  const isCancelDialog = useSelector(
    (state: RootState) => state.offer.cancelDialog
  );
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleYesClick = () => {
    dispatch(arbitrationDialog())
    setCountdown(3); // Start countdown

    const interval = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000); // Update countdown every second

    setTimeout(() => {
      dispatch(cancelDialog());
      setCountdown(null); // Reset countdown
      clearInterval(interval); // Stop the interval
    }, 1000);
  };

  return (
    <>
      <Dialog open={isCancelDialog} handler={() => dispatch(cancelDialog())}>
        <DialogBody divider className="grid z-70 place-items-center h-[15rem]">
          <Typography color="black" variant="small">
            Do you agree to cancel the order?
          </Typography>
          <div className="flex flex-row justify-center gap-20">
            <Button
              variant="filled"
              className="bg-gray-400 text-black"
              onClick={() => dispatch(cancelDialog())}
            >
              No
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleYesClick}
            >
              Yes
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
