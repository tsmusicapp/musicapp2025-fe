import React, { useRef } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  ClockIcon,
  ArrowPathIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { cancelDialog } from "@/redux/features/offer/offerSlice";
import { Order } from "@/types/Order";
import { setFireGetMyOrder, setOrderId, updateOrderStatus } from "@/redux/features/order/orderSlice";

interface Props {
  order: Order;
}

function OrderOngoingFreelancer({ order }: Props) {
  const fireGetMyOrder = useSelector((state: any) => state.order.fireGetMyOrder);
  const dispatch = useDispatch<AppDispatch>();

  // Ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle status change
  const handleStatus = (id: String, status: string) => {
    dispatch(updateOrderStatus({ id, status }));
    dispatch(setFireGetMyOrder(!fireGetMyOrder));
    // dispatch(setFireGetMyOrder("delivring"));
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      // You can upload the file here or perform other actions
      handleStatus(order.id, 'delivring'); // Update status to "delivring"
    }
  };

  // Trigger file input when the green button is clicked
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOpenCancel = (id: String) => {
    dispatch(cancelDialog());
    dispatch(setOrderId(id))
  };

  return (
    <>
      <div className="">
        <Card
          className={`relative grid min-h-[5rem] w-[20rem] overflow-hidden shadow-sm border-2 rounded-md`}
        >
          <CardBody className={`relative flex flex-col px-0 py-0`}>
            <div className={`${order.status == "revision" ? 'flex justify-between' : " "} border-b-2 border-black/20 py-2 px-6`}>
              <p className="text-[0.7rem] font-bold text-black">
                {order.title}
              </p>
              {
                order.status == "revision" ?
                  <p className="text-[0.7rem] text-blue-600" >
                    Revision
                  </p> : <div></div>
              }
            </div>
            <div className="border-b-2 border-black/20 flex flex-col justify-start py-2 mx-6 gap-1">
              <div className="flex flex-row justify-between">
                <p className="text-[0.9rem] font-bold text-black">US${order.price}</p>
                <p className="text-[0.8rem] font-bold text-black">
                  Start Time
                  <span className="text-[0.7rem] ml-3">{order.startTime.split("T")[0]}</span>
                </p>
              </div>
            </div>
            <div className="border-b-2 border-black/20 flex flex-col justify-start py-2 mx-6 gap-1">
              <div className="flex flex-row justify-between">
                <p className="text-[0.6rem] font-bold text-black text-justify">{order.description}</p>
              </div>
            </div>
            <div className="border-b-2 border-black/20 flex flex-col justify-start py-2 mx-6 gap-1">
              <div className="flex flex-col">
                <p className="text-[0.6rem] font-bold text-black">
                  This offer includes
                </p>
                <div className="flex flex-row justify-start gap-4">
                  <div className="flex flex-row justify-center gap-1">
                    <ArrowPathIcon color="black" className="h-4 w-4" />
                    <p className="text-[0.6rem] font-bold text-black">
                      unlimited revisions
                    </p>
                  </div>
                  <div className="flex flex-row justify-center gap-1">
                    <ClockIcon color="black" className="h-4 w-4" />
                    <p className="text-[0.6rem] font-bold text-black">
                      {order.delivery_time} days delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-end mx-6 items-center gap-1 py-4">
              <div className="flex flex-row gap-2">
                <Button
                  variant="filled"
                  size="sm"
                  className="normal-case bg-gray-400 text-black text-center text-[0.6rem] w-[4rem] cursor-pointer"
                  onClick={() => handleOpenCancel(order.id)}
                >
                  Cancel
                </Button>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  onClick={handleUploadClick} // Trigger file input
                  variant="filled"
                  color="teal"
                  size="sm"
                  className="normal-case text-center flex flex-row gap-1 text-[0.6rem] w-[8rem] cursor-pointer"
                >
                  <PaperClipIcon color="white" className="h-4 w-4" />
                  Upload Works
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default OrderOngoingFreelancer;