"use client";
import { deleteCart, getCart } from "@/redux/features/offer/offerSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

interface CartItemProps {
  item: any;
}

export default function CartItem() {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.offer)
  console.log(cart, "cart items")

  const handleDelete = (assetId: string) => {
    dispatch(deleteCart(assetId))
    dispatch(getCart())
  };

  return (
    <div>
      {cart.length > 0 ?
        cart.map((item: any) => (
          item.paid == false &&
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
                <div className="flex flex-row gap-4 absoulte top-0">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold text-blue-200"
                  >
                    {item.quantity} x ${item.assetId.commercialUsePrice}
                  </Typography>
                  <Typography
                    onClick={() => { handleDelete(item.assetId.id || item.assetId._id) }}
                    variant="small"
                    color="blue-gray"
                    className="font-bold text-gray-400 cursor-pointer"
                  >
                    X
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
