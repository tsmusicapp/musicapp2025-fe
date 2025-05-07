"use client";

// components
import { Navbar } from "@/components";
import HomeMusicianBox from "@/components/music-box/home-musician-box";
import { CATEGORIES, MUSIC_GENRES } from "@/conf/music";
import { Spinner } from "@material-tailwind/react";
import ExplorePage from "./explore-page";
import Hero from "./hero";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/utils/auth";
import { API_URL } from "@/utils/env_var";

export default function Portfolio() {

   const [featuredMusic, setFeaturedMusic] = useState<any[]>([]);
    useEffect(() => {
      const fetchMusic = async () => {
        try {
          const token = getAuthToken();
          if (!token) {
            console.error("No authentication token found");
            return [];
          }
  
          const response = await fetch(`${API_URL}/v1/music/get-music`, {
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
          setFeaturedMusic(data.length > 0 ? data : MUSIC_GENRES);
        } catch (error) {
          console.error("Error fetching music data:", error);
          return [];
        }
      };
      fetchMusic();
    }, []);
  return (
    <>
    <Navbar />
    <Hero />
    <section className="grid min-h-screen">
    <div className="py-4 flex justify-items-start items-start sm:justify-start">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
        <div className="flex flex-row justify-start gap-2">
        <ExplorePage />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {featuredMusic ? featuredMusic.map((props, key) => (
            <HomeMusicianBox
              key={key}
              {...props}
              source="home"
              lyrics={false}
              isMusicAsset={false} // Explicitly set to false for home page
            />
          )) : <Spinner className="w-10 h-10" />}
        </div>
      </div>
    </div>
  </section>
  </>
  );
}
