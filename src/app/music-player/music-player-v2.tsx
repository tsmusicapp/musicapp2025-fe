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
import { BASE_URL } from "@/conf/api";
import axios from "axios";

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
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const [musicDetailInfo, setMuicDetailInfo] = useState<any>(null);

  useEffect(() => {
    
      const fetchMusicAsset = async () => {
        try {
          const accessToken = localStorage.getItem('token');
    
          const response = await axios.get(
            `${BASE_URL}/v1/music-asset/${selectedId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
    
          if (response.status === 200) {
            console.log("Music Asset Data: hasan", response.data);
            setMuicDetailInfo(response.data); 
          } else {
            console.error("Failed to fetch music asset");
          }
        } catch (error) {
          console.error("Error fetching music asset:", error);
        }
      };
    
      if (selectedId) {
        fetchMusicAsset(); // ✅ Call the async function
      }
    }, [selectedId]);

  return (
    <>
      <ReportDialog />
      <div className="flex flex-col h-[20rem] text-black">
        <div className="flex flex-row w-full h-full border-black/10 border-2">
          <div className="relative w-full h-fit space-y-2 items-center">
            <div className="flex flex-row">
              <div className="flex flex-col w-full">
                <TopMusicPlayerV2 musicDetailInfo={musicDetailInfo}/>
                {/* <ContentMusicPlayerV2 source={source} /> */}
                <MediaPlayerV2 musicDetailInfo={musicDetailInfo}/>
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
