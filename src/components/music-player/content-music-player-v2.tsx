"use client";
import { Suspense } from "react";
import ContentLeftSideV2 from "./content-left-side-v2";
import ContentRightSideV2 from "./content-right-side-v2";


interface ContentMusicPlayerV2Props {
  musicDetailInfo: any;
}

function ContentMusicPlayerV2({ musicDetailInfo }: ContentMusicPlayerV2Props) {

  return (
    <div className="flex flex-row gap-6 justify-between p-2 my-2 mx-4 min-w-screen max-w-screen">
      <ContentLeftSideV2 musicDetailInfo={musicDetailInfo} />
      <Suspense fallback={<div>Loading...</div>}>
        <ContentRightSideV2 musicDetailInfo={musicDetailInfo} />
      </Suspense>
    </div>
  );
}

export default ContentMusicPlayerV2;
