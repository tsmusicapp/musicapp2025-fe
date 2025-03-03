"use client";

import { AppDispatch, RootState } from "@/redux/store";
import {
  Card,
  CardBody,

  Typography,

} from "@material-tailwind/react";
import { useSelector } from "react-redux";



export default function PaymentSection() {

  const { cart } = useSelector((state: RootState) => state.offer)

  

  return (
    <div>
      {cart.length > 0 ?
        cart.map((item: any) => (
          item.paid == true &&
          <Card className="mt-6 w-[60rem]" key={item.assetId._id}>
            <CardBody>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {item.assetId.songName}
                  </Typography>
                  <div className="flex flex-row gap-4 items-center">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      By {item.assetId.creatorName}
                    </Typography>
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      Format: Mp3
                    </Typography>
                    {/* <Typography variant="h6" color="blue-gray" className="mb-2">
                      Music ID: DRX6783286
                    </Typography> */}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end gap-4 absoulte top-0">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold text-blue-200"
                  >
                    {item.quantity} x ${item.assetId.commercialUsePrice}
                  </Typography>
                  <Typography
                    variant="small"
                    color="red"
                    className="font-bold text-gray-400"
                  >
                    Total : ${item.quantity * item.assetId.commercialUsePrice + 2.35}
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        ))
        : <div>Go to assets and Add to cart</div>
      }
    </div>
  );
}
