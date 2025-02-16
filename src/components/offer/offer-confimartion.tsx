import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ClockIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { Order } from "@/types/Order";
import Link from "next/link";
interface props {
  order: Order
}
function OfferConfirmation({ order }: props) {
  return (
    <>
      <div className="">
        <Card
          className={`relative grid min-h-[5rem] w-[20rem] overflow-hidden shadow-sm border-2 rounded-md`}
        >
          <CardBody className={`relative flex flex-col px-0 py-0`}>
            <div className="border-b-2 border-black/20 py-2 px-6">
              <p className="text-[0.7rem] font-bold text-black">
                {order.title}
              </p>
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
                  className="normal-case bg-gray-400 text-black text-center text-[0.6rem] w-[8rem] cursor-pointer"
                  disabled
                >
                  Accepted
                </Button>
                <Link href={"/order"} >
                  <Button
                    variant="filled"
                    size="sm"
                    className="normal-case bg-gray-400 text-black text-center text-[0.6rem] w-[8rem]"
                  >
                    Go To order page
                  </Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default OfferConfirmation;
