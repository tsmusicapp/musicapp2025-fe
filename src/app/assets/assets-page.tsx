"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import HiringMusician from "./hiring-musician";
import FindCreatives from "./find-creatives";
import Sidebar from "@/components/sidebar/sidebar";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

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
      label: "Find Creatives",
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
      <Tabs id="custom-animation" value={section} className="w-full mb-16">
        <div className="flex ml-[7rem] items-center mb-2">
          <TabsHeader
            className="flex justify-end bg-transparent h-12 md:w-[50rem] my-1 border border-white/25 bg-opacity-90"
            indicatorProps={{
              className: "bg-gray-900/10 shadow-md !text-gray-900",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab key={value} value={value} className="text-sm">
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </div>
        <div className="border-t-2 border-black/10 w-full"></div>
        <TabsBody className="flex flex-row gap-4">
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="p-0">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </section>
  );
}

export default AssetsPage;
