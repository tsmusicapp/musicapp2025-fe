import OrderWorking from "@/components/order-table/order-working";
import OrderInfo from "@/components/order/order-info";
import OrderInfoCard from "@/components/order/order-info-card";
import OrderOngoingCard from "@/components/order/order-ongoing-card";
import OrderUploadedWorks from "@/components/order/order-uploaded-works";
import OrderUploadedWorksCard from "@/components/order/order-uploaded-works-card";
import React, { useEffect } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@material-tailwind/react";
import { Order } from "@/types/Order";
import OrderOngoingFreelancer from "@/components/order/order-ongoing-freelancer";
import { getMyOrders } from "@/redux/features/order/orderSlice";
import OfferConfirmation from "@/components/offer/offer-confimartion";
import { useAuth } from "@/utils/useAuth";

function WorkingOrder() {
  const { getCurrentUser } = useAuth()
  const user = getCurrentUser()
  const isCustomer = useSelector((state: RootState) => state.offer.isCustomer);
  const dispatch = useDispatch();
  const { myOrder, fireGetMyOrder } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getMyOrders() as any);
  }, [dispatch, fireGetMyOrder]);

  if (!myOrder || myOrder == undefined || myOrder == null) {
    return <Spinner className="h-10 w-10" />
  }

  return (
    <>
      <div className="flex justify-items-start items-start sm:justify-start">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {!isCustomer ? (
              <>
                {myOrder ? (
                  myOrder.map((order: Order) => {
                    if (order.status === "accepted") {
                      return <OfferConfirmation key={order.id.toString()} order={order} />;
                    } else if (order.status === "delivring" || order.status === "revision") {
                      return <OrderUploadedWorks key={order.id.toString()} order={order} />;
                    } else {
                      return null; // Avoid returning empty JSX elements like `<></>`
                    }
                  })
                ) : (
                  <Spinner className="h-10 w-10" />
                )}

                {/* <OrderInfoCard />
                <OrderUploadedWorksCard /> */}
              </>
            ) : (
              <>
                {
                  myOrder ?
                    myOrder.map((order: Order) => {
                      return (
                        (order.status === "delivring" || order.status === "accepted" || order.status === "revision") ?
                          <OrderOngoingFreelancer order={order} /> : <></>
                      )
                    })
                    :
                    <Spinner className="h-10 w-10" />
                }
              </>
            )}
          </div>
        </div>
      </div>
      {/* <OrderWorking /> */}
      {/* <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
        <div className="flex max-sm:flex-col-reverse items-center">
          <p className="font-normal text-xl py-10 leading-8 text-gray-500 sm:pl-8">
            Total Income
          </p>
        </div>
        <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
          $200.00
        </p>
      </div> */}
    </>
  );
}

export default WorkingOrder;
