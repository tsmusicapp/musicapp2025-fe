"use client";

import React, { useEffect } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Avatar,
  Typography,
  Badge,
  Spinner,
} from "@material-tailwind/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getImageUrl } from "@/conf/music";
import { getCart } from "@/redux/features/offer/offerSlice";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.offer);
  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onclick: () => setOpenPopover(!openPopover),
  };

  const totalPrice = cart.length > 0 ? cart.reduce((total: number, item: any) => total + (!item.paid ? (item.quantity * Number(item.assetId.commercialUsePrice)) : 0), 0) : 0;

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])


  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <Badge content={cart.length} color="red" withBorder>
        <PopoverHandler {...triggers}>
          <img
            src={"/icons/cart-black.png"}
            style={{ height: 24, width: 27 }}
            className="cursor-pointer"
          />
        </PopoverHandler>
      </Badge>
      <PopoverContent {...triggers} className="z-50 w-[20rem]">
        <Typography
          variant="h6"
          color="black"
          className="mb-2 flex items-center gap-2 font-semibold"
        >
          Shopping Cart
        </Typography>
        <Typography
          variant="small"
          color="black"
          className="font-normal text-black"
        >
          you have <span className="text-blue-200">{cart ? cart.length : 0}</span> items in your
          shopping cart
        </Typography>
        <div className="mt-4 flex flex-col gap-2">
          {cart.length > 0 ? cart.map((item: any) => (
            item.paid == false && (
              <div key={item.id} className="flex flex-row items-center justify-between mx-3">
                <Avatar
                  variant="square"
                  alt="tania andrew"
                  size="sm"
                  className="cursor-pointer"
                  src={getImageUrl(item.assetId.musicImage)}
                />
                <p className="text-black font-medium">{item.assetId.songName}</p>
                <p className="text-blue-300 font-medium"> {item.quantity} X ${item.assetId.commercialUsePrice}</p>
              </div>
            )
          )) : <div>Go to assets and Add to cart</div>}
          <div className="flex flex-row items-center justify-end mx-3">
            <p className="text-black font-bold">Total: ${totalPrice}.00</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 py-4">
            <Link href={"/checkout"}>
              <Button
                variant="filled"
                color="red"
                size="sm"
                className="normal-case text-white font-semibold text-center w-full cursor-pointer rounded-none border-black border-2"
              >
                Proceed to checkout
              </Button>
            </Link>
            <Link href={"/checkout"}>
              <Button
                variant="text"
                size="sm"
                className="normal-case text-black text-center cursor-pointer"
              >
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
