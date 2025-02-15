import BoxWithInfo from "@/components/music-box/box-with-info";
import { CATEGORIES } from "@/conf/music";
import React, { useState, useEffect } from "react";

function MyLiked() {
    const [likedSongs, setLikedSongs] = useState<string[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<typeof CATEGORIES>([]);

    useEffect(() => {
        const auth = localStorage.getItem("auth");

        if (auth) {
            try {
                const parsedAuth = JSON.parse(auth);
                const songs = parsedAuth?.user?.likedSongs || [];
                setLikedSongs(songs);
            } catch (error) {
                console.error("Error parsing auth data:", error);
            }
        }
    }, []);

    console.log(likedSongs, "likedSongs")

    useEffect(() => {
        if (likedSongs.length > 0) {
            const matchedCategories = CATEGORIES.filter(category => likedSongs.includes(category.id));
          
            setFilteredCategories(matchedCategories);
        }
    }, [likedSongs]);

    return (
        <div className="grid grid-cols-4 gap-3">
            {filteredCategories.map((props, key) => (
                <BoxWithInfo key={key} withName={false} {...props} withSale={false} />
            ))}
        </div>
    );
}

export default MyLiked;
