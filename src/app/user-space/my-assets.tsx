"use client";
import HomeMusicianBox from "@/components/music-box/home-musician-box";
import MusicPlayerDialog from "@/components/music-player/music-player-dialog";
import { getAuthToken } from "@/utils/auth";
import { API_URL } from "@/utils/env_var";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function MyAssets() {
  const [myAssets, setMyAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchMyAssets = async () => {
      try {
        const token = getAuthToken();
        const endpoint = `${API_URL}/v1/music-asset/my-assets`;

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
        setMyAssets(data);
      } catch (error) {
        console.error("Error fetching music data:", error);
      } finally {
        setLoading(false); // Stop loading once request is complete
      }
    };

    fetchMyAssets();
  }, []);

  if (loading) return <Spinner className="w-10 h-10 mx-auto" />;

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <MusicPlayerDialog source="assets" />

        {myAssets.length > 0 ? (
          myAssets.map((props, key) => (
            <HomeMusicianBox
              key={key}
              {...props}
              source="assets"
              lyrics={false}
              isMusicAsset={true}
            />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No music assets found.
          </div>
        )}
      </div>
    </>
  );
}

export default MyAssets;
