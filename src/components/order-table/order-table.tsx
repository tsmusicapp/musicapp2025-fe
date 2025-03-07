import React, { useEffect } from "react";
import OrderHeader from "./order-header";
import OrderData from "./order-data";
import OrderFooter from "./order-footer";
import OrderDoneCard from "../order/order-done-card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Spinner } from "@material-tailwind/react";
import { getMyOrders } from "@/redux/features/order/orderSlice";

function OrderTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { myOrder, fireGetMyOrder } = useSelector((state: RootState) => state.order);
  useEffect(() => {
    dispatch(getMyOrders() as any);
  }, [dispatch, fireGetMyOrder]);

  return (
    <>
      <div className="flex justify-items-start items-start sm:justify-start">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {
              myOrder ?
                myOrder.map((order, ind: number) => {
                  if (order.status === "complete") {
                    return (
                      <OrderDoneCard key={ind} order={order} />
                    )
                  } else {
                    return <></>
                  }
                })
                : <Spinner className="h-10 w-10" />
            }
            {/* <OrderDoneCard />
            <OrderDoneCard /> */}
          </div>
        </div>
      </div>
      {/* <OrderHeader />
      <OrderData /> */}
      {/* <OrderFooter /> */}
    </>
  );
}

export default OrderTable;
