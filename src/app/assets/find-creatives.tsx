"use client";
import AssetMusicianBox from "@/components/music-box/asset-musician-box";
import { getAuthToken } from "@/utils/auth";
import { API_URL } from "@/utils/env_var";
import { useEffect, useState } from "react";
import MusicPlayerDialog from "../../components/music-player/music-player-dialog";
import HomeMusicianBox from "@/components/music-box/home-musician-box";
import { Spinner } from "@material-tailwind/react";

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
  const [assets, setAssets] = useState<any[]>([]);

  // Filter the ASSETS array
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.error("No authentication token found");
          return [];
        }

        const response = await fetch(`${API_URL}/v1/music-asset/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(errorData.message || "Failed to fetch music data");
        }

        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error("Error fetching music data:", error);
        return [];
      }
    };
    fetchAssets();
  }, []);
  const filteredAssets = assets.filter((item) => {
    const normalizedSelectedStyles = selectedMusicStyle.map((style) =>
      style.trim().toLowerCase()
    );

    const normalizedSelectedMood = selectedMusicMood.map((mood) =>
      mood.trim().toLowerCase()
    );

    const matchesSearch =
      !searchTerm ||
      item.songName.toLowerCase().includes(searchTerm.toLowerCase());
    // Filter by tags
    const matchesMyRole: boolean =
      !filterTags ||
      (Array.isArray(item.myRole) &&
        item.myRole.some(
          (role: string) => role.toLowerCase() === filterTags.toLowerCase()
        ));
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

  console.log(filteredAssets, "chec");

  return (
    <section className="w-full px-4 py-6">
      <MusicPlayerDialog source="assets" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((props, key) => (
                <HomeMusicianBox
                  key={key}
                  {...props}
                  source="home"
                  lyrics={false}
                  isMusicAsset={true}
                />
              ))
            ) : (
              <Spinner className="w-10 h-10 mx-auto" />
            )}
          </div>
        </div>
    </section>
  );
}

export default FindCreatives;
