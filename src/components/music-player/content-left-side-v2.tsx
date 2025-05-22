"use client";

interface ContentLeftSideV2Props {
  musicDetailInfo: any;
}

function ContentLeftSideV2({ musicDetailInfo }: ContentLeftSideV2Props) {
  const getValue = (value: any) => value || "N/A";

  return (
    <div className="w-full max-w-2xl border-2 border-black rounded-xl px-4 py-4 flex flex-col gap-4 h-auto">
      {[
        ["Music Name", musicDetailInfo?.songName],
        ["Album Name", musicDetailInfo?.albumname],
        ["Publisher", musicDetailInfo?.singerName],
        ["Music Usage", musicDetailInfo?.musicUsage],
        ["Music Style", musicDetailInfo?.musicStyle],
        ["Mood", musicDetailInfo?.musicMood],
        ["Musical Instrument", musicDetailInfo?.musicInstrument],
        ["Software Tools", musicDetailInfo?.softwareTool],
        [
          "Tags",
          Array.isArray(musicDetailInfo?.tags)
            ? musicDetailInfo.tags.join(", ")
            : musicDetailInfo?.tags || "N/A",
        ],
      ].map(([label, value], index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-2">
          <p className="text-xs font-notoSemibold min-w-[8rem]">{label}:</p>
          <p className="text-xs break-words">{getValue(value)}</p>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-2">
        <p className="text-xs font-notoSemibold min-w-[8rem]">Lyric:</p>
        <div
          className="text-xs leading-relaxed break-words max-h-48 overflow-auto px-3 py-2 rounded-m w-full"
          dangerouslySetInnerHTML={{
            __html: getValue(musicDetailInfo?.musicLyric),
          }}
        />
      </div>
    </div>
  );
}

export default ContentLeftSideV2;
