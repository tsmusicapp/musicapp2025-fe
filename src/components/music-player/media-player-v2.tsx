import React, { useState, useEffect } from "react";
import {
  PlayIcon,
  SpeakerWaveIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { Progress } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MusicallService } from "@/services/musicall.service";
import { LoginModal } from "../modals/AuthModal";
import { isAuthenticated } from "@/checkAuth";
import ReactionShopping from "../reaction/reaction-shopping";
import { reactionAddShopping, shoppingMusicSize } from "@/default/reaction";
import toast, { Toaster } from "react-hot-toast";

function MediaPlayerV2() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const musicDetail = useSelector(
    (state: RootState) => state.offer.musicDetail
  );
  const isMusicAssets = useSelector(
    (state: RootState) => state.offer.isMusicAssets
  );
  const searchParams = useSearchParams();
  let version = searchParams.get("ver");

  const { hasLyrics } = useSelector((state: RootState) => state.offer);

  useEffect(() => {
    if (musicDetail) {
      setIsLiked(musicDetail.isLiked || false);
      setLikesCount(musicDetail.likesCount || 0);
    }
  }, [musicDetail]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const result = await MusicallService.likeMusic(selectedId);
      if (result.success) {
        setIsLiked(!isLiked);
        setLikesCount((prev) => prev + (isLiked ? -1 : 1));
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000); // Hide after 2 seconds
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handlePlay = () => {
    console.log("playing music");
  };

  return (
    <div className="flex flex-row justify-between p-4 gap-16 w-full border-t-2 border-b-2 border-black/10">
      <Toaster />
      <div className="min-w-0 flex flex-row items-center font-semibold gap-3">
        <img
          src="https://img.freepik.com/free-psd/square-flyer-template-maximalist-business_23-2148524497.jpg?w=1800&t=st=1699458420~exp=1699459020~hmac=5b00d72d6983d04966cc08ccd0fc1f80ad0d7ba75ec20316660e11efd18133cd"
          alt="Album cover"
          width="77"
          height="77"
          className="rounded-lg bg-slate-100"
          loading="lazy"
        />
        {!hasLyrics ? (
          <div className="flex flex-row gap-4 items-center ml-4">
            {isAuthenticated() ? (
              <PlayIcon
                height={40}
                width={40}
                className="border-2 rounded-full p-2 border-black/30 cursor-pointer"
                onClick={() => {
                  handlePlay();
                }}
              />
            ) : (
              <PlayIcon
                height={40}
                width={40}
                className="border-2 rounded-full p-2 border-black/30 cursor-pointer"
                onClick={() => {
                  toast.success("Please Sign-in First");
                }}
              />
            )}
            <p className="text-xs">2.10</p>
            <div className="w-[20rem] max-w-[20rem]">
              <Progress
                value={50}
                variant="gradient"
                size="sm"
                className="border border-gray-900/10 bg-gray-900/5"
              />
            </div>
            <p className="text-xs">3.40</p>
            <SpeakerWaveIcon
              height={24}
              width={24}
              className="cursor-pointer"
            />
            <div className="w-[5rem] max-w-[5rem]">
              <Progress
                value={50}
                variant="gradient"
                size="sm"
                className="border border-gray-900/10 bg-gray-900/5"
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="min-w-0 flex flex-row items-center font-semibold gap-3">
        <div className="flex flex-row gap-2 ml-[2rem]">
          {isAuthenticated() ? (
            <div className="flex flex-row gap-[0.4rem] items-center">
              <img
                onClick={handleLike}
                className="cursor-pointer hover:scale-125"
                src={
                  isLiked ? "/icons/new-like-filled.png" : "/icons/new-like.png"
                }
                style={{ height: 18, width: 18 }}
                alt="Like"
              />
              <p className="text-[0.7rem] text-black font-semibold">
                {likesCount}
              </p>
            </div>
          ) : (
            <div className="flex flex-row gap-[0.4rem] items-center">
              <img
                onClick={() => {
                  toast.success("Please Sign-in First");
                }}
                className="cursor-pointer hover:scale-125"
                src={
                  isLiked ? "/icons/new-like-filled.png" : "/icons/new-like.png"
                }
                style={{ height: 18, width: 18 }}
                alt="Like"
              />
              <p className="text-[0.7rem] text-black font-semibold">
                {likesCount}
              </p>
            </div>
          )}
          {(version === "assets" || isMusicAssets) && (
            <ReactionShopping
              data={reactionAddShopping}
              customSize={shoppingMusicSize}
            />
          )}
          <img
            src="/icons/collect-icon.png"
            style={{ height: 24, width: 24 }}
            className="hover:scale-125 cursor-pointer"
            alt="Collect"
          />
          <div className="relative">
            {isAuthenticated() ? (
              <>
                <ArrowTopRightOnSquareIcon
                  height={24}
                  width={24}
                  className="hover:scale-125 text-black cursor-pointer"
                  onClick={handleShare}
                />
                {showCopiedMessage && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-90">
                    Link Copied
                  </span>
                )}
              </>
            ) : (
              <ArrowTopRightOnSquareIcon
                height={24}
                width={24}
                className="hover:scale-125 text-black cursor-pointer"
                onClick={() => {
                  toast.success("please Sign-in First");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaPlayerV2;
