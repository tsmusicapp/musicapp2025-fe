// components/share-work-creation/bottom-part.tsx
"use client";

import { Typography, Input, Textarea } from "@material-tailwind/react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useState, useEffect } from "react";

interface BottomPartProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

function BottomPart({ register, errors }: BottomPartProps) {
  const [tagCount, setTagCount] = useState<number>(0);
  const [tagError, setTagError] = useState<string>("");

  const validateTags = (value: string) => {
    if (!value) return;

    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setTagCount(tags.length);

    if (tags.length < 3) {
      setTagError("Please enter at least 3 tags");
      return false;
    }

    if (tags.some((tag) => tag.length > 20)) {
      setTagError("Each tag must be less than 20 characters");
      return false;
    }

    setTagError("");
    return true;
  };

  return (
    <div className="mb-1 flex flex-col gap-6">
      {/* Musical Instrument Section */}
      <div>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          Musical Instrument (Optional)
        </Typography>
        <Input
          crossOrigin={""}
          size="lg"
          {...register("musicInstrument")}
          className="!border !border-black !rounded-none"
          placeholder="e.g., Piano, Guitar, Violin"
        />
      </div>

      {/* Tags Section */}
      <div>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          Tags (Fill in at least 3 key attribute words, separated by commas)
        </Typography>
        <input
          type="text"
          placeholder="e.g., Jazz, Acoustic, Instrumental"
          className="w-full px-4 py-2 border border-black rounded-none outline-none focus:ring-0 focus:border-black"
          {...register("tags", {
            required: "Tags are required",
            validate: validateTags,
          })}
        />
        {errors.tags && (
          <span className="text-red-500 text-xs">
            {errors.tags.message as string}
          </span>
        )}
        {tagError && !errors.tags && (
          <span className="text-red-500 text-xs">{tagError}</span>
        )}
        <span className="text-gray-500 text-xs">{tagCount} tags added</span>
      </div>

      {/* Description Section */}
      <div>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          Description *
        </Typography>
        <Textarea
          className="!border !border-black !rounded-none"
          placeholder="Describe your music piece..."
          {...register("description", {
            required: "Description is required",
            minLength: { value: 1, message: "Description is required" },
          })}
        />
        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description.message as string}
          </span>
        )}
      </div>

      {/* Software Tool Section */}
      <div>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          Software Tool (Optional)
        </Typography>
        <input
          type="text"
          placeholder="e.g., FL Studio, Ableton Live, Pro Tools"
          className="w-full px-4 py-2 border border-black rounded-none outline-none focus:ring-0 focus:border-black"
          {...register("softwareTool")}
        />
      </div>
    </div>
  );
}

export default BottomPart;
