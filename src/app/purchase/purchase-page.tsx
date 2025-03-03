"use client";

import PurchaseCard from "@/components/purchase/purchase-card";
import { getSales } from "@/redux/features/offer/offerSlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function PurchasePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { sales } = useSelector((state: any) => state.offer);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  console.log(sales?.sales, "purchase");
  return (
    <div className="flex flex-col gap-6 min-h-screen items-center overflow-y-auto pt-8 bg-gray-100">
      <h1 className="font-bold text-2xl">My Purchase</h1>
      {
        sales != null ?
          sales?.sales.map((item: any) => (
            <PurchaseCard saleItem={item} />

          )) :
          <div>Go to assets and purchase some assets</div>
      }
      {/* <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard /> */}
    </div>
  );
}

export default PurchasePage;
