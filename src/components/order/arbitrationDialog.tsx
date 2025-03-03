import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { arbitrationDialog } from "@/redux/features/offer/offerSlice";
import { changeOrderStatus, setFireGetMyOrder } from "@/redux/features/order/orderSlice";

export default function ArbitrationDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentOrderId, fireGetMyOrder } = useSelector((state: RootState) => state.order);

  const isArbitrationDialog = useSelector(
    (state: RootState) => state.offer.arbitrationDialog
  );

  // State to capture input values
  const [problemSummary, setProblemSummary] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  // Handle problem summary input change
  const handleProblemSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblemSummary(event.target.value);
  };

  // Handle details input change
  const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Replace `orderId` with the actual order ID (you can pass it as a prop or fetch it from the state)
      // Replace with the actual order ID

      // Define the status and message
      const status = "cancel"; // Set the status to "arbitration" or any other relevant status
      const message = `Problem Summary: ${problemSummary}\nDetails: ${details}`; // Combine problem summary and details into a single message

      // Dispatch the thunk to change the order status

      await dispatch(changeOrderStatus({ id: currentOrderId, status, message }));
      // Close the dialog
      dispatch(arbitrationDialog());
      // dispatch(setFireGetMyOrder("cancel"));
      dispatch(setFireGetMyOrder(!fireGetMyOrder));



      // Optionally, show a success message
      console.log("Order status changed successfully");
    } catch (error) {
      console.error("Failed to change order status:", error);
    }
  };

  return (
    <>
      <Dialog
        open={isArbitrationDialog}
        handler={() => dispatch(arbitrationDialog())}
        size="sm"
      >
        <DialogBody divider className="grid h-[32rem]">
          <div className="py-2 flex flex-col gap-2 justify-start">
            <Typography color="black" variant="h6" className="underline">
              Problem Summary
            </Typography>
            <input
              type="text"
              value={problemSummary}
              onChange={handleProblemSummaryChange}
              className="border border-gray-400 text-black text-sm rounded-lg p-2.5"
            />
          </div>
          <div className="py-2 flex flex-col gap-2 justify-start">
            <Typography color="black" variant="h6" className="underline">
              Details
            </Typography>
            <Textarea
              value={details}
              onChange={handleDetailsChange}
              className="!h-[18rem]"
            />
          </div>
          <Button
            variant="gradient"
            className="underline"
            color="blue"
            onClick={handleSubmit} // Call handleSubmit on button click
          >
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
// import { arbitrationDialog } from "@/redux/features/offer/offerSlice";

// export default function ArbitrationDialog() {
//   const dispatch = useDispatch<AppDispatch>();
//   const isArbitrationDialog = useSelector(
//     (state: RootState) => state.offer.arbitrationDialog
//   );



//   return (
//     <>
//       <Dialog
//         open={isArbitrationDialog}
//         handler={() => dispatch(arbitrationDialog())}
//         size="sm"
//       >
//         <DialogBody divider className="grid h-[32rem]">
//           <div className="py-2 flex flex-col gap-2 justify-start">
//             <Typography color="black" variant="h6" className="underline">
//               Problem Summary
//             </Typography>
//             <input
//               type="text"
//               className="border border-gray-400 text-black text-sm rounded-lg p-2.5"
//             />
//           </div>
//           <div className="py-2 flex flex-col gap-2 justify-start">
//             <Typography color="black" variant="h6" className="underline">
//               Details
//             </Typography>
//             <Textarea className="!h-[18rem]" />
//           </div>
//           <Button
//             variant="gradient"
//             className="underline"
//             color="blue"
//             onClick={() => dispatch(arbitrationDialog())}
//           >
//             Submit
//           </Button>
//         </DialogBody>
//       </Dialog>
//     </>
//   );
// }
