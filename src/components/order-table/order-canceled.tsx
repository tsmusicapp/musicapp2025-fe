import React, { useEffect } from "react";
import OrderCancelCard from "../order/order-cancel-card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getMyOrders } from "@/redux/features/order/orderSlice";
import { Spinner } from "@material-tailwind/react";

function OrderCanceled() {
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
                  if (order.status === "cancel") {
                    return (
                      <OrderCancelCard key={ind} order={order} />
                    )
                  } else {
                    return <></>
                  }
                })
                : <Spinner className="h-10 w-10" />
            }
            {/* <OrderCancelCard />
            <OrderCancelCard /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCanceled;
