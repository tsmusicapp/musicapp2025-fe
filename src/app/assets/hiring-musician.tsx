"use client"

import { CATEGORIES } from "@/conf/music"
import ProfileBox from "@/components/profile/profile-box"

export function HiringMusician() {
  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-[1600px] mx-auto space-y-4">
        {CATEGORIES.map((category, index) => (
          <ProfileBox
            key={index}
            id={Number(category.id)}
            imgSong={category.imgSong}
            singerName={category.singerName}
            songName={category.songName}
            imgComposer={category.imgSong} // Using imgSong as imgComposer if not provided
            composerName={category.composerName}
            location={`${category.musicStyle} Artist`} // Using musicStyle as location
            isAvailable={category.collaborationContact}
            roles={category.myRole || ["Composer"]}
            work={[
              {
                id: category.id,
                imgSong: category.imgSong,
                songName: category.songName,
                singerName: category.singerName,
                composerName: category.composerName,
                musicStyle: category.musicStyle,
                duration: "03:45" // Hardcoded duration as it's not provided in the data
              }
            ]}
          />
        ))}
      </div>
    </section>
  )
}

export default HiringMusician

