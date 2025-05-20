"use client";

// components
import HomeMusicianBox from "@/components/music-box/home-musician-box";
import { MUSIC_GENRES } from "@/conf/music";
import { getAuthToken } from "@/utils/auth";
import { API_URL } from "@/utils/env_var";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ExplorePage from "./explore-page";
import Hero from "./hero";

export default function Portfolio() {
  const [featuredMusic, setFeaturedMusic] = useState<any[]>([]);
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const token = getAuthToken();
        const isLoggedIn = !!token;

        const endpoint = isLoggedIn
          ? `${API_URL}/v1/music/get-music`
          : `${API_URL}/v1/music/get-all-music`;

        const response = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
            ...(isLoggedIn && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(errorData.message || "Failed to fetch music data");
        }

        const data = await response.json();
        setFeaturedMusic(data);
      } catch (error) {
        console.error("Error fetching music data:", error);
        setFeaturedMusic(MUSIC_GENRES); // fallback
      }
    };

    fetchMusic();
  }, []);

  return (
    <>
      <Hero />
      <section className="w-full min-h-screen px-4">
        <div className="py-4">
          <div className="flex flex-row justify-start gap-2 mb-4">
            <ExplorePage />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {featuredMusic.length > 0 ? (
              featuredMusic
                .map((props, key) => (
                  <HomeMusicianBox
                    key={key}
                    {...props}
                    source="home"
                    lyrics={false}
                    isMusicAsset={false}
                  />
                ))
            ) : (
              <Spinner className="w-10 h-10 mx-auto" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
