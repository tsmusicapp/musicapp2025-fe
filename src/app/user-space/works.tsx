"use client";
import HomeMusicianBox from "@/components/music-box/home-musician-box";
import { getAuthToken } from "@/utils/auth";
import { API_URL } from "@/utils/env_var";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function Works() {
  const [myMusic, setMyMusic] = useState<any[]>([]);
  useEffect(() => {
    const getMyMusic = async () => {
      try {
        const token = getAuthToken();

        const endpoint = `${API_URL}/v1/music/get-music`;
        const response = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch music data");
        }

        const data = await response.json();
        setMyMusic(data);
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    getMyMusic();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
        {myMusic.length > 0 ? (
          myMusic.map((props, key) => (
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
    </>
  );
}

export default Works;
