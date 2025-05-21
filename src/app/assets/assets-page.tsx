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
    <section style={{ display: "flex", justifyContent: "center", minHeight: "100vh", padding: "16px", gap: "16px" }}>
      <Sidebar
        setFilterTags={setFilterTags}
        debounceSearchTerm={debounceSearchTerm}
        setSelectedInstruments={setSelectedInstruments}
        setSelectedMusicUsage={setSelectedMusicUsage}
        setSelectedMusicStyle={setSelectedMusicStyle}
        setSelectedMusicMood={setSelectedMusicMood}
      />

      <div style={{ flex: 1, maxWidth: "800px" }}>
        <div style={{ display: "flex", borderBottom: "1px solid #ccc", marginBottom: "16px" }}>
          {data.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSection(value)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                border: "none",
                borderBottom: section === value ? "3px solid #333" : "3px solid transparent",
                backgroundColor: "transparent",
                fontWeight: section === value ? "bold" : "normal",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {data.map(({ value, desc }) =>
            value === section ? (
              <div key={value} style={{ padding: "8px 0" }}>
                {desc}
              </div>
            ) : null
          )}
        </div>

        {/* Display current selected tab value */}
        <div style={{ marginTop: "20px", color: "#555" }}>
          Current selected tab: <strong>{section}</strong>
        </div>
      </div>
    </section>
  );
}

export default AssetsPage;
