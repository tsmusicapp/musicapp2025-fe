"use client";

// components
import { Navbar } from "@/components";
import HomeMusicianBox from "@/components/music-box/home-musician-box";
import { CATEGORIES } from "@/conf/music";
import { Spinner } from "@material-tailwind/react";
import ExplorePage from "./explore-page";
import Hero from "./hero";

export default function Portfolio() {
  // Only show a few items on the home page
  const featuredMusic = CATEGORIES // Show only first 5 items

  console.log(featuredMusic, "featuredMusic");
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
