"use client";
import { ASSETS, fetchMusicData } from "../../conf/music";
import AssetMusicianBox from "@/components/music-box/asset-musician-box";
import MusicPlayerDialog from "../../components/music-player/music-player-dialog";
import { useEffect, useState } from "react";



interface FindCreativesProps {
  filterTags: string | null;
  searchTerm: string | null;
  selectedInstrument: string[];
  selectedMusicUsage: string[];
  selectedMusicStyle: string[];
  selectedMusicMood: string[];
}

export function FindCreatives({
  filterTags,
  searchTerm,
  selectedInstrument,
  selectedMusicUsage,
  selectedMusicStyle,
  selectedMusicMood,
}: FindCreativesProps) {
  console.log({
    filterTags,
    searchTerm,
    selectedInstrument,
    selectedMusicUsage,
    selectedMusicStyle,
    selectedMusicMood,
  });

  // Filter the ASSETS array

  console.log(ASSETS, "checkAssets")
  const filteredAssets = ASSETS.filter((item) => {
    // Filter by search term (matches in name or description)

    const normalizedSelectedStyles = selectedMusicStyle.map((style) =>
      style.trim().toLowerCase()
    );

    const normalizedSelectedMood = selectedMusicMood.map((mood) =>
      mood.trim().toLowerCase()
    );

    const matchesSearch =
      !searchTerm ||
      item.songName.toLowerCase().includes(searchTerm.toLowerCase())
    // Filter by tags
    const matchesMyRole: boolean =
      !filterTags ||
      (Array.isArray(item.myRole) &&
      item.myRole.some((role: string) => role.toLowerCase() === filterTags.toLowerCase()));
    // Filter by selected instrument
    const matchesInstrument =
      selectedInstrument.length === 0 ||
      selectedInstrument.some((instr) =>
        item.tags
          .split(",")
          .map((instr: string) => instr.trim().toLowerCase())
          .includes(instr.toLowerCase())
      );

    // Filter by music usage
    const matchesMusicUsage =
      selectedMusicUsage.length === 0 ||
      normalizedSelectedStyles.includes(item.musicUsage.trim().toLowerCase());


    // Filter by music style
    const matchesMusicStyle =
      selectedMusicStyle.length === 0 ||
      normalizedSelectedStyles.includes(item.musicStyle.trim().toLowerCase());
    // Filter by music mood
    const matchesMusicMood =
      selectedMusicMood.length === 0 ||
      normalizedSelectedMood.includes(item.musicMood.trim().toLowerCase());
    return (
      matchesSearch &&
      matchesMyRole &&
      matchesInstrument &&
      matchesMusicUsage &&
      matchesMusicStyle &&
      matchesMusicMood
    );
  });


  console.log(filteredAssets, "chec")

  return (
    <section className="grid min-h-screen">
      <MusicPlayerDialog source="assets" />
      <div className="py-4 flex justify-items-start items-start sm:justify-start">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {filteredAssets.map((item) => (
              <AssetMusicianBox
                key={item.id}
                lyrics={false}
                id={item.id}
                imgSong={item.musicImage}
                musicName={item.songName}
                musicStyle={item.musicStyle}
                musicMood={item.musicMood}
                myRole={item.myRole}
                musicInstrument={item.musicInstrument}
                softwareTool={item.softwareTool}
                description={item.description}
                personalUsePrice={item.personalUsePrice}
                commercialUsePrice={item.commercialUsePrice}
                createdBy={item.createdBy}
                tags={
                  item.tags
                    ? item.tags.split(",").map((tag: any) => tag.trim())
                    : []
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FindCreatives;
