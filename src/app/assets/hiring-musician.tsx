"use client";

import ProfileBox from "@/components/profile/profile-box";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/utils/auth";
import { API_URL } from "@/utils/env_var";
import HomeMusicianBox from "@/components/music-box/home-musician-box";
import { Spinner } from "@material-tailwind/react";

export function HiringMusician() {
  const [featuredMusic, setFeaturedMusic] = useState<any[]>([]);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const token = getAuthToken();
        const isLoggedIn = !!token;

        const endpoint = `${API_URL}/v1/music/get-music`;

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
      }
    };

    fetchMusic();
  }, []);

  return (
    <section className="w-full px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
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
    </section>
  );
}

export default HiringMusician;
