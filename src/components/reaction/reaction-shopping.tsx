import { customSize } from "@/default/reaction";
import { addToCart, getAssetById, setSelectedId } from "@/redux/features/offer/offerSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface mainProps {
  id: number;
  icon: string;
  height: number;
  width: number;
  counter?: number;
}

interface ReactionProps {
  main: mainProps;
  sub: mainProps[];
}

interface customSizeDetailProps {
  height: number;
  width: number;
}

interface customSizeProps {
  main: customSizeDetailProps;
  sub: customSizeDetailProps;
}

interface objectProps {
  data: ReactionProps;
  customSize?: customSizeProps;
}

function ReactionShopping({ data, customSize }: objectProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const { selectedId, musicAssetData, cart } = useSelector((state: RootState) => state.offer);

  useEffect(() => {
    dispatch(getAssetById(selectedId))
  }, [dispatch, selectedId]);

  const handleAddCart = (id: string) => {
    dispatch(addToCart(id))
    dispatch(setSelectedId(id))
  }


  return (
    <>
      <div className="group relative cursor-pointer">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row gap-0">
            <img
              src={data.main.icon}
              style={{
                height: customSize?.main.height
                  ? customSize.main.height
                  : data.main.height,
                width: customSize?.main.width
                  ? customSize.main.width
                  : data.main.width,
              }}
              onClick={() => setOpen(!open)}
              className="transition duration-200 hover:scale-125 cursor-pointer"
            />
            <p className="text-[0.4rem] text-center max-w-[3rem] !mt-3">
              {data.main?.counter}
            </p>
          </div>
        </div>
        <div className={`flex flex-row gap-1 ${open ? 'visible' : 'invisible'} z-50 absolute  bg-white divide-gray-100 rounded-lg shadow w-[8rem] h-[3rem] bottom-6 -right-4 dark:bg-gray-7001`}>
          {data?.sub
            ? data.sub.map((item) => (
              <div

                key={item.id}
                className="flex flex-col justify-center w-full h-full gap-1 items-center hover:rounded-lg hover:bg-gray-100"
              >
                <img
                  src={item.icon}
                  style={{
                    height: customSize?.sub.height
                      ? customSize.sub.height
                      : item.height,
                    width: customSize?.sub.width
                      ? customSize.sub.width
                      : item.width,
                  }}
                />
                <p className="text-[0.6rem] text-center">
                  {item.id > 2 ? (
                    ""
                  ) : (
                    <span onClick={() => handleAddCart(musicAssetData.id)} >
                      US${" "}
                      <span className="text-[0.8rem]">{musicAssetData.commercialUsePrice}</span>
                    </span>
                  )}
                </p>
              </div>
            ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default ReactionShopping;
