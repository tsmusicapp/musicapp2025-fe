import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { revisionDialog } from "@/redux/features/offer/offerSlice";
import { changeOrderStatus, setFireGetMyOrder } from "@/redux/features/order/orderSlice";

export default function RevisionDialogOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const isRevisionDialog = useSelector(
    (state: RootState) => state.offer.revisionDialog
  );
  const { currentOrderId, fireGetMyOrder } = useSelector((state: RootState) => state.order);

  const [revisionMessage, setRevisionMessage] = useState<any>("");

  const handleSubmit = () => {
    const newStatus = "revision"; // Set the new status you want

    dispatch(changeOrderStatus({ id: currentOrderId, status: newStatus, message: revisionMessage }))
      .then(() => dispatch(revisionDialog())); // Close the dialog after success
    // dispatch(setFireGetMyOrder("revision"));
    dispatch(setFireGetMyOrder(!fireGetMyOrder));

  };

  return (
    <>
      <Dialog
        open={isRevisionDialog}
        handler={() => dispatch(revisionDialog())}
        size="xs"
      >
        <DialogBody divider className="grid h-[25rem]">
          <div className="py-2 flex justify-start">
            <Typography color="black" variant="small">
              Revision Information
            </Typography>
          </div>
          <Textarea
            className="!h-[18rem]"
            value={revisionMessage}
            onChange={(e) => setRevisionMessage(e.target.value)}
          />
          <Button variant="gradient" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}













// import React from "react";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Typography,
//   Textarea,
// } from "@material-tailwind/react";
// import { RootState, AppDispatch } from "@/redux/store";
// import { useSelector, useDispatch } from "react-redux";
// import { revisionDialog } from "@/redux/features/offer/offerSlice";

// export default function RevisionDialogOrder() {
//   const dispatch = useDispatch<AppDispatch>();
//   const isRevisionDialog = useSelector(
//     (state: RootState) => state.offer.revisionDialog
//   );

//   return (
//     <>
//       <Dialog
//         open={isRevisionDialog}
//         handler={() => dispatch(revisionDialog())}
//         size="xs"
//       >
//         <DialogBody divider className="grid h-[25rem]">
//           <div className="py-2 flex justify-start">
//             <Typography color="black" variant="small">
//               Revision Information
//             </Typography>
//           </div>
//           <Textarea className="!h-[18rem]" />
//           <Button variant="gradient" onClick={() => dispatch(revisionDialog())}>
//             Submit
//           </Button>
//         </DialogBody>
//       </Dialog>
//     </>
//   );
// }
