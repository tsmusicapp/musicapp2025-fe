"use client";

import { useCallback, useState } from "react";
import HiringMusician from "./hiring-musician";
import FindCreatives from "./find-creatives";
import Sidebar from "@/components/sidebar/sidebar";
import { debounce } from "lodash";

export function AssetsPage() {
  const [section, setSection] = useState("find-creatives");
  const [filterTags, setFilterTags] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [selectedInstrument, setSelectedInstruments] = useState<string[]>([]);
  const [selectedMusicUsage, setSelectedMusicUsage] = useState<string[]>([]);
  const [selectedMusicStyle, setSelectedMusicStyle] = useState<string[]>([]);
  const [selectedMusicMood, setSelectedMusicMood] = useState<string[]>([]);

  const debounceSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 500),
    []
  );

  const data = [
    {
      label: "Hiring Musician",
      value: "hiring-musician",
      desc: <HiringMusician />,
    },
    {
      label: "Find Music Assets",
      value: "find-creatives",
      desc: (
        <FindCreatives
          filterTags={filterTags}
          searchTerm={searchTerm}
          selectedInstrument={selectedInstrument}
          selectedMusicUsage={selectedMusicUsage}
          selectedMusicStyle={selectedMusicStyle}
          selectedMusicMood={selectedMusicMood}
        />
      ),
    },
  ];

  return (
    <section className="flex justify-center min-h-screen px-4 py-2 gap-4">
      <Sidebar
        setFilterTags={setFilterTags}
        debounceSearchTerm={debounceSearchTerm}
        setSelectedInstruments={setSelectedInstruments}
        setSelectedMusicUsage={setSelectedMusicUsage}
        setSelectedMusicStyle={setSelectedMusicStyle}
        setSelectedMusicMood={setSelectedMusicMood}
      />

      <div className="flex-1">
        {/* Tabs Header */}
        <div className="flex justify-start ml-28 mb-3">
          <div className="flex w-full max-w-2xl border border-white/25 rounded-md overflow-hidden bg-white/10 backdrop-blur-sm">
            {data.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setSection(value)}
                className={`w-full text-sm px-4 py-2 transition-all duration-300 ${
                  section === value
                    ? "bg-gray-900/10 font-semibold shadow-md text-gray-900"
                    : "hover:bg-gray-100/20 text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Border Line Below Tabs */}
        <div className="border-t border-black/10 w-full mb-2" />

        {/* Tabs Content */}
        <div className="w-full">
          {data.map(({ value, desc }) =>
            section === value ? (
              <div key={value} className="p-0">
                {desc}
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}

export default AssetsPage;
