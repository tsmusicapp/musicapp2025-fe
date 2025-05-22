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

  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const [musicDetailInfo, setMuicDetailInfo] = useState<any>(null);
  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        let response;
        if (source === "assets") {
          console.log("Fetching from music-asset endpoint");
          response = await axios.get(
            `${BASE_URL}/v1/music-asset/${selectedId}`,
            { headers }
          );
        } else if (source === "home") {
          console.log("Fetching from get-music endpoint");
          response = await axios.get(
            `${BASE_URL}/v1/music/get-music/${selectedId}`,
            { headers }
          );
        }

        if (response && response.status === 200) {
          console.log("Music Data:", response.data);
          setMuicDetailInfo(response.data);
        } else {
          console.error("Failed to fetch music data");
        }
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    if (isMusicPlayerDialog && selectedId) {
      fetchMusicData();
    }
  }, [isMusicPlayerDialog, source, selectedId]);

  return (
    <>
      <ReportDialog />
      <div className="flex flex-col h-[580px] overflow-auto text-black">
        <div className="flex flex-row w-full h-auto border-black/10 border-2 pb-5">
          <div className="relative w-full h-fit space-y-2 items-center">
            <div className="flex flex-row">
              <div className="flex flex-col w-full">
                <TopMusicPlayerV2 musicDetailInfo={musicDetailInfo} />
                <ContentMusicPlayerV2 musicDetailInfo={musicDetailInfo} />
                <MediaPlayerV2 musicDetailInfo={musicDetailInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

export default MusicPlayerV2;
