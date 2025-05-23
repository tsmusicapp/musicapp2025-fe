"use client";

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
      return  null;
    }
  };

  const fields: [string, any][] = [
    ["Music Name", musicDetailInfo?.songName],
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
    <div className="w-full max-w-2xl border-2 border-black rounded-xl px-4 py-4 flex flex-col gap-4 h-auto">
      {fields
        .filter(([_, value]) => value) // only show fields with valid value
        .map(([label, value], index) => (
          <div key={index} className="flex flex-col sm:flex-row">
            <p className="text-xs font-notoSemibold min-w-[8rem]">{label}:</p>
            <p className="text-xs break-words">{getValue(value)}</p>
          </div>
        ))}

      {musicDetailInfo?.musicLyric?.trim() && (
        <div className="flex flex-col sm:flex-row">
          <p className="text-xs font-notoSemibold min-w-[8rem]">Lyric:</p>
          <div
            className="text-xs leading-relaxed break-words rounded-m w-full"
            dangerouslySetInnerHTML={{
              __html: getValue(musicDetailInfo.musicLyric),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ContentLeftSideV2;
