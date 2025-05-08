"use client";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, IconButton } from "@material-tailwind/react";
import React from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { musicPlayerDialog as musicDialogState } from "@/redux/features/offer/offerSlice";
import { useRouter } from "next/navigation";
import { updateChatUsers } from "@/redux/features/chat/chatSlice";
import { isAuthenticated } from "@/checkAuth";
import { Toaster, toast } from "react-hot-toast";

function TopMusicPlayerV2({ musicDetailInfo }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleGetTouch = () => {
    const newChatUser = {
      id: musicDetailInfo?.createdBy || "unknown-user",
      chatId: Date.now().toString(),
      userName: musicDetailInfo?.composerName || "Unknown Composer",
      avatar: musicDetailInfo?.composerAvatar || "https://docs.material-tailwind.com/img/face-4.jpg",
      latestMessage: "",
      unreadCount: 0,
    };

    dispatch(updateChatUsers([newChatUser]));
    window.location.href = "/chat";
  };

  return (
    <>
      <div className="right-0 top-0 absolute focus:outline-none">
        <Toaster />
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={() => dispatch(musicDialogState())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <div className="flex flex-row items-center justify-between gap-1 p-4 px-10 border-b-2 border-black/10">
        <div className="flex flex-row items-center gap-8">
          <div className="flex flex-row items-center gap-2">
            <Avatar
              src={musicDetailInfo?.musicImage || "https://docs.material-tailwind.com/img/face-4.jpg"}
              alt="avatar"
              size="md"
            />
            <div className="flex flex-col items-start justify-center gap-0">
              <p className="text-md font-notoCondensed">
                {musicDetailInfo?.songName || "Unknown Title"}{" "}
                <span className="text-xs ml-4 font-notoRegular">
                  {musicDetailInfo?.commercialUse ? "Available for Commercial Use" : "Personal Use Only"}
                </span>
              </p>
              <p className="text-md font-notoCondensed">
                {musicDetailInfo?.myRole?.[0] || "Artist"}{" "}
                <span className="text-[0.7rem] ml-1 font-notoRegular">
                  for the song
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-1 items-center justify-center">
          <Button
            variant="outlined"
            size="md"
            className="normal-case text-center text-[0.8rem] bg-teal-300 py-1.5 px-2 mt-2 w-[7rem] border-none"
          >
            Fund Musician
          </Button>

          {isAuthenticated() ? (
            <Button
              variant="filled"
              size="md"
              className="normal-case text-center text-[0.8rem] py-1.5 px-2 mt-2 w-[5rem] border-none"
              onClick={handleGetTouch}
            >
              Get Touch
            </Button>
          ) : (
            <Button
              variant="filled"
              size="md"
              className="normal-case text-center text-[0.8rem] py-1.5 px-2 mt-2 w-[5rem] border-none"
              onClick={() => toast.success("Please Sign-in First")}
            >
              Get Touch
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default TopMusicPlayerV2;
