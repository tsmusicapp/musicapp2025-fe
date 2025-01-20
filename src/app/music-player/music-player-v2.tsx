"use client";

import React, { useEffect, useState } from "react";
import TopMusicPlayerV2 from "@/components/music-player/top-music-player-v2";
import ContentMusicPlayerV2 from "@/components/music-player/content-music-player-v2";
import MediaPlayerV2 from "@/components/music-player/media-player-v2";
import ReportDialog from "@/components/report/report-dialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { reportDialog } from "@/redux/features/offer/offerSlice";
import { isAuthenticated } from "@/checkAuth";
import { LoginModal } from "@/components/modals/AuthModal";

interface MusicPlayerV2Props {
  source?: "assets" | "home";
  hasLyrics?: boolean;
}

function MusicPlayerV2({ source = "home", hasLyrics }: MusicPlayerV2Props) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isMusicPlayerDialog = useSelector(
    (state: RootState) => state.offer.musicPlayerDialog
  );

  const handleAuthenticatedAction = (action: () => void) => {
    if (isAuthenticated()) {
      action();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const performAction = () => {
    // This action requires authentication
    handleAuthenticatedAction(() => {
      console.log("Authenticated action performed!");
    });
  };

  const isMusicAssets = useSelector(
    (state: RootState) => state.offer.isMusicAssets
  );

  useEffect(() => {
    // Only fetch when dialog is open
    if (isMusicPlayerDialog) {
      if (source === "assets") {
        console.log(
          "MusicPlayerV2: On assets page, should fetch music-asset data"
        );
        // Add your music-asset fetch logic here
      } else if (source === "home") {
        console.log(
          "MusicPlayerV2: On home page, should fetch music-creation data"
        );
        // Add your music-creation fetch logic here
      }
    }
  }, [isMusicPlayerDialog, source]);

  return (
    <>
      <ReportDialog />
      <div className="flex flex-col h-[46rem] text-black">
        <div className="flex flex-row w-full h-full border-black/10 border-2">
          <div className="relative w-full h-fit space-y-2 items-center">
            <div className="flex flex-row">
              <div className="flex flex-col w-full">
                <TopMusicPlayerV2 />
                <ContentMusicPlayerV2 source={source} />
                <MediaPlayerV2 />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 p-2">
          <p
            className="text-xs normal-case hover:underline hover:text-blue-500 cursor-pointer"
            onClick={() => dispatch(reportDialog())}
          >
            Report
          </p>
        </div>
      </div>
      <button onClick={performAction}>Perform Action</button>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

export default MusicPlayerV2;
