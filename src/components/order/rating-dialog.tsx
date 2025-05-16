import { ratingDialog } from "@/redux/features/offer/offerSlice";
import { addReviewAndRating, setFireGetMyOrder, updateOrderStatus } from "@/redux/features/order/orderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { StarIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Textarea,
  Typography
} from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function RatingDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const id = useSelector((state: RootState) => state.order.currentOrderId);

  const fireGetMyOrder = useSelector((state: any) => state.order.fireGetMyOrder)
  const isRatingDialog = useSelector(
    (state: RootState) => state.offer.ratingDialog
  );

  const [rating, setRating] = useState<number>(0);

  const [review, setReview] = useState<string>("");

  const [tip, setTip] = useState<number>(0);


  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  // Handle review text change
  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleTipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTip(Number(event.target.value));
  };

  // Handle form submission
  const onSubmit = async () => {
    try {
      // Validate rating (must be between 1 and 5)
      if (rating < 1 || rating > 5) {
        toast.error("Please select a rating between 1 and 5.")
       
        return;
      }


      // Dispatch the thunk to submit the review and rating
      await dispatch(addReviewAndRating({ id, rating, review, tip }));
      await dispatch(updateOrderStatus({ id, status: 'complete' }));

      // Close the dialog
      dispatch(ratingDialog());

      // dispatch(setFireGetMyOrder("complete"))
      dispatch(setFireGetMyOrder(!fireGetMyOrder))


      // Show success message
      toast.success("Review and rating submitted successfully!")
      
    } catch (error) {
      toast.error("Failed to submit review and rating. Please try again.")
      
    }
  };

  return (
    <>
      <Dialog
        open={isRatingDialog}
        handler={() => dispatch(ratingDialog())}
        size="sm"
      >
        <DialogHeader>Rate Your Experience</DialogHeader>
        <DialogBody divider className="flex flex-col gap-4 h-[30rem]">
          <div className="py-2 flex flex-col gap-2 justify-start">
            <Typography color="black" variant="small">
              Please Evaluate the work
            </Typography>
            <div className="flex flex-row gap-2 ml-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  width={30}
                  height={30}
                  color={star <= rating ? "yellow" : "black"}
                  className="cursor-pointer hover:scale-125"
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <Typography color="black" variant="small">
              Please briefly comment on the work
            </Typography>
            <Textarea
              className="!h-[8rem]"
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here..."
            />
          </div>
          <Button variant="gradient" onClick={onSubmit}>
            Submit
          </Button>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 justify-between items-center mx-20">
              <Typography color="black" variant="h6" className="font-bold">
                Leave a tip
              </Typography>
              <div className="flex flex-row justify-center items-center gap-2">
                <span className="text-black">US$</span>
                <input
                  type="text"
                  // onKeyPress={(event) => {
                  //   if (!/[0-9]/.test(event.key)) {
                  //     event.preventDefault();
                  //   }
                  // }}
                  onChange={handleTipChange}
                  className="border border-gray-400 w-[5rem] max-w-[5rem] text-black text-sm rounded-lg p-2.5"
                />
              </div>
            </div>
            <div className="flex flex-row justify-end mr-10">
              <Button
                variant="gradient"
                className="w-[10rem]"
                onClick={onSubmit}
              >
                Pay
              </Button>
            </div>
          </div>
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
// import { ratingDialog } from "@/redux/features/offer/offerSlice";
// import { StarIcon } from "@heroicons/react/24/outline";
// import { useForm } from "react-hook-form";

// export default function RatingDialog() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { register, handleSubmit } = useForm();
//   const isRatingDialog = useSelector(
//     (state: RootState) => state.offer.ratingDialog
//   );

//   return (
//     <>
//       <Dialog
//         open={isRatingDialog}
//         handler={() => dispatch(ratingDialog())}
//         size="sm"
//       >
//         <DialogBody divider className="flex flex-col gap-4 h-[30rem]">
//           <div className="py-2 flex flex-col gap-2 justify-start">
//             <Typography color="black" variant="small">
//               Please Evaluate the work
//             </Typography>
//             <div className="flex flex-row gap-2 ml-4">
//               <StarIcon
//                 width={30}
//                 height={30}
//                 color="black"
//                 className="cursor-pointer hover:scale-125"
//               />
//               <StarIcon
//                 width={30}
//                 height={30}
//                 color="black"
//                 className="cursor-pointer hover:scale-125"
//               />
//               <StarIcon
//                 width={30}
//                 height={30}
//                 color="black"
//                 className="cursor-pointer hover:scale-125"
//               />
//               <StarIcon
//                 width={30}
//                 height={30}
//                 color="black"
//                 className="cursor-pointer hover:scale-125"
//               />
//               <StarIcon
//                 width={30}
//                 height={30}
//                 color="black"
//                 className="cursor-pointer hover:scale-125"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 justify-start">
//             <Typography color="black" variant="small">
//               Please briefly comment on the work
//             </Typography>
//             <Textarea className="!h-[8rem]" />
//           </div>
//           <Button variant="gradient" onClick={() => dispatch(ratingDialog())}>
//             Submit
//           </Button>
//           <div className="flex flex-col gap-2">
//             <div className="flex flex-row gap-2 justify-between items-center mx-20">
//               <Typography color="black" variant="h6" className="font-bold">
//                 Leave a tip
//               </Typography>
//               <div className="flex flex-row justify-center items-center gap-2">
//                 <span className="text-black">US$</span>
//                 <input
//                   type="text"
//                   onKeyPress={(event) => {
//                     if (!/[0-9]/.test(event.key)) {
//                       event.preventDefault();
//                     }
//                   }}
//                   className="border border-gray-400 w-[5rem] max-w-[5rem] text-black text-sm rounded-lg p-2.5"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-row justify-end mr-10">
//               <Button
//                 variant="gradient"
//                 className="w-[10rem]"
//                 onClick={() => dispatch(ratingDialog())}
//               >
//                 Pay
//               </Button>
//             </div>
//           </div>
//         </DialogBody>
//       </Dialog>
//     </>
//   );
// }
