// components/share-work-creation/right-side-second.tsx
"use client";

import { Typography, Input } from "@material-tailwind/react";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface RightSideSecondProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const musicUse = [
  "Pop Music",
  "Folk Music",
  "Game Music",
  "Movie Music",
  "Classical Music",
  "Children Music",
  "Dance Music",
  "Travel Music",
  "Animation Music",
  "Light Music",
];

const musicStyles = [
  "Ambient",
  "Blues",
  "Cinematic",
  "Classical",
  "Country",
  "Disco",
  "Dubstep",
  "Epic",
  "Folk",
  "Funk",
  "Hip hop",
  "Holiday",
  "House",
  "Indie Pop",
  "Jazz",
  "Latin",
  "Metal",
  "Neo-Soul",
  "New Age",
  "Orchestral",
  "Piano",
  "Pop",
  "R&B",
  "Rap",
  "Reggae",
  "Rock",
  "Samba",
  "Trap",
  "Underscore",
  "Video Game",
  "World",
];

const musicMoods = [
  "Aggressive",
  "Beautiful",
  "Bright",
  "Dark",
  "Dramatic",
  "Energetic",
  "Happy",
  "Inspirational",
  "Melancholic",
  "Peaceful",
  "Romantic",
  "Sad",
  "Suspenseful",
  "Uplifting",
];

const languages = [
  { value: "EN", label: "English" },
  { value: "JP", label: "Japanese" },
  { value: "GR", label: "German" },
  { value: "FR", label: "French" },
  { value: "IT", label: "Italian" },
  { value: "SP", label: "Spanish" },
  { value: "KR", label: "Korean" },
  { value: "CH", label: "Chinese" },
  { value: "AR", label: "Arabic" },
];

interface RightSideSecondProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

function RightSideSecond({
  register,
  errors,
  setValue,
  watch,
}: RightSideSecondProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Watch for external changes to musicUse
  const musicUseValue = watch("musicUsage");

  // Sync the internal state with form state
  useEffect(() => {
    if (musicUseValue && Array.isArray(musicUseValue)) {
      setSelectedItems(musicUseValue);
    }
  }, [musicUseValue]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleOption = (option: string) => {
    const newSelectedItems = selectedItems.includes(option)
      ? selectedItems.filter((item) => item !== option)
      : [...selectedItems, option];

    setSelectedItems(newSelectedItems);
    setValue("musicUsage", newSelectedItems, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    // Register the field
    register("musicUsage", {
      required: "Please select at least one music use",
      validate: (value) =>
        (value && value.length > 0) || "Please select at least one music use",
    });
  }, [register]);

  return (
    <div className="mb-1 flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <label className="block text-sm font-semibold text-gray-900">
          My Role (Multiple Choise)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {["Singer","Composer", "Producer", "Lyricist"].map((role) => (
            <div key={role} className="flex items-center">
              <input
                type="checkbox"
                id={`role-${role.toLowerCase()}`}
                value={role.toLowerCase()}
                {...register("myRole", {
                  required: "Please select at least one role",
                })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label
                htmlFor={`role-${role.toLowerCase()}`}
                className="ml-2 text-sm font-medium text-gray-900"
              >
                {role}
              </label>
            </div>
          ))}
        </div>
        {errors.myRole && (
          <span className="text-red-500 text-xs">
            {errors.myRole.message as string}
          </span>
        )}
      </div>
      <div>
        <Typography variant="small" color="blue-gray" className="font-bold">
          Album Name (Optional)
        </Typography>
        <Input
          crossOrigin={""}
          size="lg"
          {...register("albumname")}
          className="!border !border-black !rounded-none"
          placeholder="Enter album name"
        />
      </div>

      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold"
        >
          Publisher(Optional)
        </Typography>
        <Input
          crossOrigin={""}
          size="lg"
          {...register("singerName")}
          className="!border !border-black !rounded-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="musicStyle"
          className="block text-sm font-semibold text-gray-900"
        >
          Song Language(Optional)
        </label>
        <select
          id="songLanguage"
          {...register("songLanguage", {
            required: "Please select a music language",
          })}
          className=" border border-black text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Select Music Language</option>
          {languages.map((value, label) => (
            <option key={value.value} value={value.value.toLowerCase()}>
              {value.label}
            </option>
          ))}
        </select>
        {errors.languages && (
          <span className="text-red-500 text-xs mt-1">
            {errors.languages.message as string}
          </span>
        )}
      </div>
      {/* Music Use Section */}
      <div className="flex flex-col gap-1">
        <label className="block text-sm font-semibold text-gray-900">
          Music is used for
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="border border-black flex items-center justify-between w-full p-2.5 text-sm border hover:bg-gray-100 focus:ring-2 "
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span className="truncate">
              {selectedItems.length > 0
                ? selectedItems.join(", ")
                : "Select music use..."}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              <ul
                className="py-1 max-h-60 overflow-auto"
                role="listbox"
                aria-multiselectable="true"
              >
                {musicUse.map((option, index) => (
                  <li
                    key={index}
                    role="option"
                    aria-selected={selectedItems.includes(option)}
                    onClick={() => toggleOption(option)}
                    className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <span className="text-sm">{option}</span>
                    {selectedItems.includes(option) && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {errors.musicUse && (
          <span className="text-red-500 text-xs mt-1">
            {errors.musicUse.message as string}
          </span>
        )}
      </div>

      {/* Music Style Section */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="musicStyle"
          className="block text-sm font-semibold text-gray-900"
        >
          Music Style
        </label>
        <select
          id="musicStyle"
          {...register("musicStyle", {
            required: "Please select a music style",
          })}
          className="text-gray-900 text-sm block w-full p-2.5 border border-black"
        >
          <option value="">Select Music Style</option>
          {musicStyles.map((style) => (
            <option key={style} value={style.toLowerCase()}>
              {style}
            </option>
          ))}
        </select>

        {errors.musicStyle && (
          <span className="text-red-500 text-xs mt-1">
            {errors.musicStyle.message as string}
          </span>
        )}
      </div>

      {/* Music Mood Section */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="musicMood"
          className="block text-sm font-semibold text-gray-900"
        >
          Music Mood
        </label>
        <select
          id="musicMood"
          {...register("musicMood")}
          className="border border-black text-gray-900 text-sm block w-full p-2.5"
        >
          <option value="">Select Music Mood</option>
          {musicMoods.map((mood) => (
            <option key={mood} value={mood.toLowerCase()}>
              {mood}
            </option>
          ))}
        </select>
      </div>

      {/* PRO Button Section */}
    </div>
  );
}

export default RightSideSecond;
