"use client";

import React, { Suspense, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import MusicPlayerDialog from "@/components/music-player/music-player-dialog";
import UserInfo from "@/components/user-space/user-info";
import Works from "@/app/user-space/works";
import Collections from "@/app/user-space/collections";
import MyFollowing from "./my-following";
import MyAssets from "./my-assets";
import MyLiked from "./my-liked";

export function UserSpace() {
  const section = [
    { label: "My Works", value: "my-works", desc: <Works /> },
    { label: "My Assets", value: "my-assets", desc: <MyAssets /> },
    { label: "My following", value: "my-following", desc: <MyFollowing /> },
    { label: "My Liked", value: "my-liked", desc: <MyLiked /> },
    { label: "My Collection", value: "my-collection", desc: <Collections /> },
    { label: "Draft", value: "draft", desc: <div>Draft</div> },
  ];

  const [activeTab, setActiveTab] = useState<string>("my-works");

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spinner className="h-12 w-12" />
        </div>
      }
    >
      <MusicPlayerDialog />
      <div className="mx-auto min-h-[60rem] px-10">
        {/* User Info outside of tabs */}
        <div className="mb-8">
          <UserInfo />
        </div>

        {/* Tabs Section */}
        <div className="grid grid-cols-12">
          <div className="col-start-4 col-span-9 w-full">
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-4 border border-white/25 bg-white/10 rounded-md p-2">
                {section.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => handleTabClick(value)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                      activeTab === value
                        ? "bg-gray-900/10 text-gray-900 shadow-md"
                        : "text-gray-700 hover:bg-gray-100/10"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="border-t-2 border-black/10 w-full mb-2" />

              <div className="pt-4">
                {section.map(({ value, desc }) =>
                  activeTab === value ? (
                    <div key={value}>{desc}</div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default UserSpace;
