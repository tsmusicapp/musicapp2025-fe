"use client";

import SalesCard from "@/components/sales/sales-card";
import { getSales } from "@/redux/features/offer/offerSlice";
import { getCompletedOrders } from "@/redux/features/order/orderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Spinner } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function SalesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { sales } = useSelector((state: RootState) => state.offer);

  useEffect(() => {
    dispatch(getSales() as any);
  }, [dispatch]);

  console.log(sales?.sales, 'sales')

  if (!sales || sales == null) {
    return <Spinner className="h-10 w-10" />
  }

  return (
    <>
      <div className="flex flex-col gap-6 min-h-screen items-center overflow-y-auto pt-8 bg-gray-100">
        <h1 className="font-bold text-2xl">My Sales</h1>
        {
          sales ?
            sales?.sales.map((sale: any) => {
              return (
                <SalesCard saleData={sale} />)
            }
            ) :
            <Spinner className="h-10 w-10" />
        }
        {/* <SalesCard saleData={sales} />
        <SalesCard />
        <SalesCard />
        <SalesCard /> */}
      </div>
    </>
  );
}

export default SalesPage;
