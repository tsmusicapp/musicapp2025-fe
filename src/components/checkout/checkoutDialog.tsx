import { deleteCart, getCart, payCart, setCheckoutDialog } from '@/redux/features/offer/offerSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { useAuth } from '@/utils/useAuth'
import { Button, Dialog, DialogBody, Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CheckoutDialog = () => {  // ✅ Capitalized function name
    const { getCurrentUser } = useAuth()
    const currentUser = getCurrentUser()

    const dispatch = useDispatch<AppDispatch>()
    const [item, setItem] = React.useState<any>({})
    const { checkoutDialog, cart, sales } = useSelector((state: RootState) => state.offer)

    let data: any;
    const handleYesClick = () => {
        if (cart.length > 0) {
            cart.forEach(async (Item: any) => {  // ✅ Changed `map` to `forEach` since `map` is not returning anything
                console.log(Item, "item")
                data = {
                    assetId: Item.assetId._id,
                    quantity: Item.quantity,
                    OwnerId: Item.assetId.ownerId,
                    assetPrice: Item.assetId.commercialUsePrice,
                    assetTitle: Item.assetId.songName,
                    buyer: currentUser?.name,
                    creatorName: Item.assetId.creatorName,
                }
                if (data) {
                    dispatch(payCart(data))
                }
            })
        }
    }

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])  // ✅ Removed `cart` from dependency array to avoid infinite re-renders

    return (
        <Dialog open={checkoutDialog} handler={() => dispatch(setCheckoutDialog())}>
            <DialogBody divider className="grid z-70 place-items-center h-[15rem]">
                <Typography color="black" variant="small">
                    Are you sure you want to checkout? Items in your cart!
                </Typography>
                <div className="flex flex-row justify-center gap-20">
                    <Button
                        variant="filled"
                        className="bg-gray-400 text-black"
                        onClick={() => dispatch(setCheckoutDialog())}
                    >
                        No
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleYesClick}
                    >
                        Yes
                    </Button>
                </div>
            </DialogBody>
        </Dialog>
    )
}

export default CheckoutDialog  // ✅ Exporting with uppercase name
