"use client";
import { RootState } from "@/redux/store";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

export default function SummarySection() {
  const { cart } = useSelector((state: RootState) => state.offer)

  const totalPrice = cart.length > 0 ? cart.reduce((total: number, item: any) => total + (!item.paid ? (item.quantity * Number(item.assetId.commercialUsePrice)) : 0), 0) : 0;

  return (
    <Card className="mt-6 w-full h-fit">
      <CardBody>
        <div className="flex flex-col gap-2">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Order Summary
          </Typography>
          <hr className="my-2 border-blue-gray-50" />
          <div className="flex flex-row justify-between w-full">
            <p className="text-black font-bold text-sm">Subtotal:</p>
            <p className="text-black font-bold text-sm">${totalPrice}</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-black font-bold text-sm">Value added tax:</p>
            <p className="text-black font-bold text-sm">{totalPrice ? `+ $2.35` : 0}</p>
          </div>
          <hr className="my-2 border-blue-gray-50" />
          <div className="flex flex-row justify-between w-full">
            <p className="text-black font-bold text-sm">Final Price:</p>
            <p className="text-black font-bold text-sm">{totalPrice ? totalPrice + 2.35 : 0}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
