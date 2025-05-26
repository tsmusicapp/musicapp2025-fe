"use client";

import { ThumbsUp } from "lucide-react";

interface ContentLeftSideV2Props {
  musicDetailInfo: any;
}

function ContentLeftSideV2({ musicDetailInfo }: ContentLeftSideV2Props) {
  const getValue = (value: any) => value || "N/A";

  const parseMusicUsage = (usage: any) => {
    try {
      const parsed = JSON.parse(usage || "[]");
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.join(", ");
      }
      return null;
    } catch {
      return null;
    }
  };

  const fields: [string, any][] = [
    [
      `${musicDetailInfo?.isLyric !== true ? "Music Name" : "Lyric Name"}`,
      musicDetailInfo?.songName,
    ],
    ["Album Name", musicDetailInfo?.albumname],
    ["Publisher", musicDetailInfo?.singerName],
    ["Music Usage", parseMusicUsage(musicDetailInfo?.musicUsage)],
    ["Music Style", musicDetailInfo?.musicStyle],
    ["Mood", musicDetailInfo?.musicMood],
    ["Musical Instrument", musicDetailInfo?.musicInstrument],
    ["Software Tools", musicDetailInfo?.softwareTool],
    [
      "Tags",
      Array.isArray(musicDetailInfo?.tags)
        ? musicDetailInfo.tags.join(", ")
        : musicDetailInfo?.tags,
    ],
  ];

  return (
    <div className="w-full max-w-2xl border border-black/10 rounded-xl px-4 py-4 flex flex-col gap-4 h-auto">
      {fields
        .filter(([_, value]) => value) // only show fields with valid value
        .map(([label, value], index) => (
          <div key={index} className="flex flex-col sm:flex-row">
            <p className="text-xs font-notoSemibold min-w-[8rem]">{label}:</p>
            <p className="text-xs break-words">{getValue(value)}</p>
          </div>
        ))}
      <>
        {musicDetailInfo &&
          typeof musicDetailInfo === "object" &&
          "isLyric" in musicDetailInfo &&
          (musicDetailInfo.isLyric !== false &&
          musicDetailInfo.isLyric !== "false" ? (
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-sm font-notoSemibold">Describe</p>
              <p className="max-h-[12rem] text-xs text-justify tracking-wide break-words overflow-y-auto pr-2">
                {musicDetailInfo?.description || "No description available."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <p className="text-xs font-notoSemibold min-w-[8rem]">Lyric:</p>
              <div className="flex items-center text-xs gap-1">
                <ThumbsUp className="w-4 h-4 text-gray-600" />

                <span>0</span>
              </div>
            </div>
          ))}
      </>
    </div>
  );
}

export default ContentLeftSideV2;
