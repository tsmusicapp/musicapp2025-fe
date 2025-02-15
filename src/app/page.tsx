"use client";

// components
import { Navbar, Footer } from "@/components";
import Hero from "./hero";
import ExplorePage from "./explore-page";
import HomeMusicianBox from "@/components/music-box/home-musician-box";
import { CATEGORIES } from "@/conf/music";
import AssetMusicianBox from "@/components/music-box/asset-musician-box";
import BoxWithInfo from "@/components/music-box/box-with-info";
import MusicianBox from "@/components/music-box/musician-box";
import SelectableBox from "@/components/music-box/selectable-box";

export default function Portfolio() {
  // Only show a few items on the home page
  const featuredMusic = CATEGORIES // Show only first 5 items

  return (
    <>
      <Navbar />
      <Hero />
      <ExplorePage/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {featuredMusic.map((props, key) => (
          <HomeMusicianBox
            key={key}
            {...props}
            source="home"
            lyrics={false}
            isMusicAsset={false} // Explicitly set to false for home page
          />
        ))}
        {/* lyrics music box with feather icon */}
        {/* {featuredMusic.map((props, key) => (
          <HomeMusicianBox
            key={key}
            {...props}
            source="home"
            lyrics={true}
            isMusicAsset={false} // Explicitly set to false for home page
          />
        ))} */}
        {/* {featuredMusic.map((props, key) => (
          <HomeMusicianBox
            key={key}
            {...props}
            source="home"
            lyrics={false}
            isMusicAsset={false} // Explicitly set to false for home page
          />
        ))} */}
      </div>
    </>
  );
}
