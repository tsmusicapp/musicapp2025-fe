"use client";

interface ContentLeftSideV2Props {
  musicData: any;
}

function ContentLeftSideV2({ musicData }: ContentLeftSideV2Props) {
  const getValue = (value: any) => value || "N/A";

  return (
    <div className="w-[29rem] border-2 border-black rounded-xl px-6 py-4 flex flex-col gap-4">
      {/* Music Name */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Music Name:</p>
        <p className="text-xs font-notoSemibold">{getValue(musicData?.songName)}</p>
      </div>

      {/* Album Name */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Album Name:</p>
        <p className="text-xs">{getValue(musicData?.albumname)}</p>
      </div>

      {/* Publisher */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Publisher:</p>
        <p className="text-xs">{getValue(musicData?.singerName)}</p>
      </div>

      {/* Music Usage */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Music Usage:</p>
        <p className="text-xs">{getValue(musicData?.musicUsage)}</p>
      </div>

      {/* Music Style */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Music Style:</p>
        <p className="text-xs">{getValue(musicData?.musicStyle)}</p>
      </div>

      {/* Mood */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Mood:</p>
        <p className="text-xs">{getValue(musicData?.musicMood)}</p>
      </div>

      {/* Musical Instrument */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Musical Instrument:</p>
        <p className="text-xs">{getValue(musicData?.musicInstrument)}</p>
      </div>

      {/* Software Tools */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Software Tools:</p>
        <p className="text-xs">{getValue(musicData?.softwareTool)}</p>
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Tags:</p>
        <p className="text-xs">
          {musicData?.tags
            ? Array.isArray(musicData.tags)
              ? musicData.tags.join(", ")
              : musicData.tags
            : "N/A"}
        </p>
      </div>

      {/* Lyric (Placeholder) */}
      <div className="flex gap-2">
        <p className="text-xs font-notoSemibold">Lyric:</p>
        {/* You can uncomment and implement the below section if needed */}
        {/* 
        <div className="flex gap-[0.4rem] items-center">
          <img
            onClick={handleLyricLike}
            className="cursor-pointer hover:scale-125"
            src={isLiked ? "/icons/new-like-filled.png" : "/icons/new-like.png"}
            alt="like"
            style={{ height: 18, width: 18 }}
          />
          <p className="text-[0.7rem] text-black font-semibold">{likeCount}</p>
        </div>
        */}
      </div>
    </div>
  );
}

export default ContentLeftSideV2;
