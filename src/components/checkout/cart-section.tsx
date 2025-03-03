"use client";

import React, { useEffect } from "react";
import CartItem from "./cart-item";
import SummarySection from "./summary-section";
import { Button, Spinner } from "@material-tailwind/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCart, setCheckoutDialog } from "@/redux/features/offer/offerSlice";
import CheckoutDialog from "./checkoutDialog";

function CartSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.offer as { cart: unknown })

  // useEffect(() => {
  //   dispatch(getCart())
  // }, [dispatch])

  console.log(cart, "items in section")

  const showCheckout = () => {
    dispatch(setCheckoutDialog())
  }

  return (
    <>
      <CheckoutDialog />
      <div className="grid grid-cols-12 gap-4">
        <div className=" col-span-12 md:col-span-9 flex flex-col">
          <CartItem />
        </div>
        <div className=" col-span-12 md:col-span-3 flex flex-col">
          <SummarySection />
          <Button
            onClick={() => showCheckout()}
            variant="filled"
            size="lg"
            color="teal"
            className="normal-case text-white text-center cursor-pointer mt-4"
          >
            Continue to checkout
          </Button>
        </div>
      </div>
    </>
  );

}
export default CartSection;
