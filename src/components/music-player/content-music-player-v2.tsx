"use client";
import React, { Suspense } from "react";
import ContentLeftSideV2 from "./content-left-side-v2";
import ContentRightSideAssets from "./content-right-side-assets";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MusicAssetService } from "@/services/music-asset.service";
import { MusicCreationService } from "@/services/music-creation.service";

// Only load home component dynamically since it's not always needed
const ContentRightSideHome = dynamic(
  () => import("./content-right-side-home"),
  {
    ssr: false,
  }
);

interface ContentMusicPlayerV2Props {
  source?: "assets" | "home";
}

function ContentMusicPlayerV2({ source = "home" }: ContentMusicPlayerV2Props) {

  console.log("source", source);
  

  
  const RightSideComponent =
    source === "assets" ? ContentRightSideAssets : ContentRightSideHome;

  return (
    <div className="flex flex-row gap-6 justify-between p-2 my-2 mx-4 h-[22rem] min-w-screen max-w-screen">
      <ContentLeftSideV2 musicData={source} />
      <Suspense fallback={<div>Loading...</div>}>
        <RightSideComponent musicData={source} key={source} />
      </Suspense>
    </div>
  );
}

export default ContentMusicPlayerV2;
