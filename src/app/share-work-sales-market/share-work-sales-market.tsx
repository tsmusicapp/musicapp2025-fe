"use client";

import { useLocalStorage } from "@/context/LocalStorageContext";
import { IMusicAsset, defaultMusicAsset } from "@/types/ShareMusicAsset"; // Adjust path as needed
import { API_URL } from "@/utils/env_var";
import { removeEmptyStrings } from "@/utils/utils";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

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

export default function ShareWorkSalesMarket() {
  const { getItem } = useLocalStorage();
  const [auth] = useState<any>(getItem("auth", null));

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IMusicAsset>({ mode: "onChange" });

  const [formData, setFormData] = useState<IMusicAsset>(defaultMusicAsset);

  const [fileImage, setFileImage] = useState<File | null>(null);
  const [fileMusic, setFileMusic] = useState<File | undefined | Blob>(
    undefined
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [musicPreview, setMusicPreview] = useState<string | null>(null);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isPersonalUse, setIsPersonalUse] = useState(false);
  const [isCommercialUse, setIsCommercialUse] = useState(false);
  const [isContract, setIsContract] = useState(false);
  const [tags, setTags] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [imageError, setImageError] = useState<string | null>(null);
  const [musicError, setMusicError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

 clearErrors(name as keyof IMusicAsset);  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setCheckedItems((prev) => {
      let newCheckedItems;
      if (checked) {
        newCheckedItems = [...prev, value];
      } else {
        newCheckedItems = prev.filter((item) => item !== value);
      }
      setFormData((prev) => ({ ...prev, [name]: newCheckedItems }));
      return newCheckedItems;
    });
  };

  const handlePersonalUse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsPersonalUse(checked);
    setFormData((prev) => ({ ...prev, personalUse: checked }));
  };

  const handleCommercialUse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsCommercialUse(checked);
    setFormData((prev) => ({ ...prev, commercialUse: checked }));
  };

  const handleCollaborationContact = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;
    setIsContract(checked);
    setFormData((prev) => ({ ...prev, collaborationContact: checked }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagValue = e.target.value;
    setTags(tagValue);
    const tagArray = tagValue
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    if (tagArray.length < 3) {
      setError("Please enter at least 3 tags separated by commas.");
    } else {
      setError("");
    }
    setFormData((prev) => ({ ...prev, tags: tagValue }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setFileImage(selectedFile);
      setImageError(null); // reset on valid file
    } else {
      setImageError("Please upload an image file.");
    }
  };

  const handleFileMusicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      setFileMusic(selectedFile);
      setMusicError(null); // reset on valid file
    } else {
      setMusicError("Please upload a music file.");
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (!fileImage) return;
      const musicImageForm = new FormData();
      musicImageForm.append("musicImage", fileImage);

      console.log(musicImageForm, "music image here in form data");

      try {
        const response = await fetch(`${API_URL}/v1/upload/music-image`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.tokens.access.token}`,
          },
          body: musicImageForm,
        });

        if (response.ok) {
          const result = await response.json();
          setFormData((prev) => ({
            ...prev,
            musicImage: result.data.profilePicture,
          }));
          toast.success("Upload Music Image successful!")
          
        } else {
          const errorResult = await response.json();
          toast.error(`Error: ${
              errorResult.message || "Failed to upload Music Image"
            }`);
         
        }
      } catch (error) {
        console.error("Error during Upload Music Image:", error);
        toast.error("An unexpected error occurred.")
        
      }
    };

    const uploadMusic = async () => {
      if (!fileMusic) {
        return;
      }
      const formData = new FormData();
      formData.append("music", fileMusic);

      try {
        const response = await fetch(`${API_URL}/v1/tracks/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.tokens.access.token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          // result.data is the Mongo ObjectID, use it as your music identifier
          setFormData((prev) => ({ ...prev, music: result?.data?.music }));
          toast.success("Upload Music Track successful!")
          
        } else {
          const errorResult = await response.json();
          toast.error(`Error: ${
              errorResult.message || "Failed to upload Music Track"
            }`)
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
        
      }
    };
    if (fileMusic) {
      uploadMusic();
    }
    if (fileImage) {
      uploadImage();
    }
  }, [fileMusic, fileImage, auth]);

  const onSubmit: SubmitHandler<IMusicAsset> = async (data) => {
    setIsLoading(true);
    const finalData = { ...formData, ...data, myRole: checkedItems };
    const cleanedData = removeEmptyStrings(finalData);

    try {
      const response = await fetch(`${API_URL}/v1/music-asset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.tokens.access.token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        await response.json();
        toast.success("Music Asset Created successfully!")
        router.push("/assets");
        setIsLoading(false);
      
      } else {
        const errorResult = await response.json();
        toast.error(`Error: ${
            errorResult.message || "Failed to create music asset"
          }`)
        
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An unexpected error occurred.")
      
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await handleSubmit(onSubmit)();
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <section className="flex flex-row justify-center items-center my-8">
      <form className="flex flex-col gap-2">
        <div className="flex flex-row gap-8">
          <div className="w-96">
            {/* LEFT SIDE */}
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-bold"
              >
                Music Name
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                {...register("songName", {
                  required: "Music Name is required",
                })}
                onChange={handleChange}
                error={!!errors.songName}
                className="!border !border-black !rounded-none"
              />
              {errors.songName && (
                <p style={{ color: "red" }}>{errors.songName.message}</p>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex  gap-2">
                  <div className="w-[18rem] flex flex-col justify-center items-start gap-2 font-semibold text-sm">
                    Upload Music Image
                    <label
                      htmlFor="dropzone-file"
                      className="relative flex flex-col items-center justify-center w-[10rem] h-[10rem] border-2 border-black border-dashed rounded-lg cursor-pointer"
                    >
                      {!imagePreview && (
                        <div className="flex flex-col items-left justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Less than 1M</span>
                          </p>
                        </div>
                      )}
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Thumbnail"
                          className="w-[10rem] h-[10rem] object-cover shadow-md absolute hover:scale-105 rounded-md"
                        />
                      )}
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  {imageError && (
                    <p className="text-red-500 text-sm mt-1">{imageError}</p>
                  )}
                </div>

                <div className="flex justify-start items-start gap-2">
                  <div className="w-[18rem] flex flex-col justify-center items-start  font-semibold text-sm">
                    Upload Music
                    <label
                      htmlFor="dropzone-file-music"
                      className="relative flex flex-col items-center justify-center w-[10rem] h-[6rem] border-2 border-black border-dashed rounded-lg cursor-pointer"
                    >
                      {!musicPreview && (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Less than 20M</span>
                          </p>
                        </div>
                      )}
                      {musicPreview && (
                        <img
                          src={musicPreview}
                          alt="music Thumbnail"
                          className="w-[10rem] h-[6rem] object-cover shadow-md absolute hover:scale-105 rounded-md"
                        />
                      )}
                      <input
                        id="dropzone-file-music"
                        type="file"
                        name="track"
                        className="hidden"
                        onChange={handleFileMusicChange}
                      />
                    </label>
                  </div>
                  {musicError && (
                    <p className="text-red-500 text-sm mt-1">{musicError}</p>
                  )}
                </div>

                <div className="flex justify-start items-start gap-2 max-w-[28rem]">
                  <Button
                    className="bg-blue-200 text-black normal-case w-[16rem] flex items-center justify-center"
                    color="blue"
                    variant="filled"
                  >
                    <span className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-800">
                      PRO
                    </span>
                    Upgrade to gain more attention
                  </Button>
                </div>

                <div className="flex flex-col gap-1 my-6">
                  <p className="text-black font-bold text-sm">Music Sales</p>
                  <div className="flex flex-row items-center gap-3 justify-between h-[2.7rem] max-h-[2.7rem]">
                    <div className="flex items-center">
                      <input
                        id="inline-music-sales"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={isPersonalUse}
                        onChange={handlePersonalUse}
                      />
                      <label
                        htmlFor="inline-music-sales"
                        className="ms-1 text-sm font-medium text-gray-900"
                      >
                        Personal Use
                      </label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1">
                      US$
                      <div className="max-w-[5rem]">
                        <input
                          type="number"
                          name="personalUsePrice"
                          className="border border-black text-gray-900 text-sm p-2.5"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-3 justify-between h-[2.7rem] max-h-[2.7rem]">
                    <div className="flex items-center">
                      <input
                        id="inline-music-sales-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={isCommercialUse}
                        onChange={handleCommercialUse}
                      />
                      <label
                        htmlFor="inline-music-sales-2"
                        className="ms-1 text-sm font-medium text-gray-900"
                      >
                        Commercial Use
                      </label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1">
                      US$
                      <div className="max-w-[5rem]">
                        <input
                          type="number"
                          name="commercialUsePrice"
                          className="border border-black text-gray-900 text-sm p-2.5"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center h-[2.7rem] max-h-[2.7rem]">
                    <input
                      id="inline-music-sales-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      checked={isContract}
                      onChange={handleCollaborationContact}
                    />
                    <label
                      htmlFor="inline-music-sales-3"
                      className="ms-1 text-sm font-medium text-gray-900"
                    >
                      Collaboration Contact
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-96">
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                My Role (Multiple Choice)
              </Typography>
              <div className="flex">
                <div className="flex items-center me-4">
                  <input
                    id="inline-checkbox"
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("myRole")}
                    value="composer"
                    checked={checkedItems.includes("composer")}
                    onChange={handleCheckbox}
                    name="myRole"
                  />
                  <label
                    htmlFor="inline-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Composer
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="inline-2-checkbox"
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("myRole")}
                    value="lyricist"
                    checked={checkedItems.includes("lyricist")}
                    onChange={handleCheckbox}
                    name="myRole"
                  />
                  <label
                    htmlFor="inline-2-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Lyricist
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="inline-3-checkbox"
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("myRole")}
                    value="arranger"
                    checked={checkedItems.includes("arranger")}
                    onChange={handleCheckbox}
                    name="myRole"
                  />
                  <label
                    htmlFor="inline-3-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Arranger
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="inline-4-checkbox"
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("myRole")}
                    value="producer"
                    checked={checkedItems.includes("producer")}
                    onChange={handleCheckbox}
                    name="myRole"
                  />
                  <label
                    htmlFor="inline-4-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Producer
                  </label>
                </div>
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Creation Time
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                {...register("creationTime", {
                  required: "Creation Time is required",
                })}
                className="!border !border-black !rounded-none"
                onChange={handleChange}
                error={!!errors.creationTime}
              />
              {errors.creationTime && (
                <p style={{ color: "red" }}>{errors.creationTime.message}</p>
              )}

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="musicUsage"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Music Use
                </label>
                <select
                  id="musicUsage"
                  className="border border-black text-gray-900 text-sm p-2.5"
                  {...register("musicUsage", {
                    required: "Music usage is required.",
                  })}
                  onChange={handleChange}
                >
                  <option value="">Select Music Use</option>
                  <option value="pop-music">Pop Music</option>
                  <option value="folk-music">Folk Music</option>
                  <option value="game-music">Game Music</option>
                  <option value="movie-music">Movie Music</option>
                  <option value="classical-music">Classical Music</option>
                  <option value="children-music">Children Music</option>
                  <option value="dance-music">Dance Music</option>
                  <option value="travel-music">Travel Music</option>
                  <option value="animation-music">Animation Music</option>
                  <option value="light-music">Light Music</option>
                </select>
                {errors.musicUsage && (
                  <p className="text-red-500 text-xs">
                    {errors.musicUsage.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="musicStyle"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Music Style
                </label>
                <select
                  id="musicStyle"
                  className="border border-black text-gray-900 text-sm p-2.5"
                  {...register("musicStyle", {
                    required: "Music Style is required.",
                  })}
                  onChange={handleChange}
                >
                  <option value="">Select Music Style</option>
                  <option value="ambient">Ambient</option>
                  <option value="blues">Blues</option>
                  <option value="cinematic">Cinematic</option>
                  <option value="classical">Classical</option>
                  <option value="country">Country</option>
                </select>
                {errors.musicStyle && (
                  <p className="text-red-500 text-xs">
                    {errors.musicStyle.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="musicMood"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Music Mood
                </label>
                <select
                  id="musicMood"
                  className="border border-black text-gray-900 text-sm p-2.5"
                  {...register("musicMood", {
                    required: "Music Mood is required.",
                  })}
                  onChange={handleChange}
                >
                  <option value="">Select Music Mood</option>
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="exciting">Exciting</option>
                </select>
                {errors.musicMood && (
                  <p className="text-red-500 text-xs">
                    {errors.musicMood.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 mt-4">
          <div className="my-2 w-full">
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Musical Instrument (Optional)
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                {...register("musicInstrument")}
                onChange={handleChange}
                className="!border !border-black !rounded-none"
              />

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Tags (min 3)
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                placeholder="e.g., Jazz, Acoustic, Instrumental"
                value={tags}
                onChange={handleTagChange}
                className="!border !border-black !rounded-none"
              />
              {error && (
                <label className="text-red-500 -mt-4 text-xs">{error}</label>
              )}

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Description
              </Typography>
              <Textarea
                className="w-96 h-56"
                {...register("description", {
                  required: "Description is required",
                })}
                // className="!border !border-black !rounded-none"

                onChange={handleChange}
              />
              {errors.description && (
                <p style={{ color: "red" }}>{errors.description.message}</p>
              )}

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Software Tool (Optional)
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                {...register("softwareTool")}
                onChange={handleChange}
                className="!border !border-black !rounded-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4 mt-4">
          <Button
            className="bg-blue-gray-100 text-black w-[8rem]"
            color="blue-gray"
            variant="outlined"
            fullWidth
            type="button"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <div className="flex flex-row gap-6">
            <Button
              className="bg-blue-gray-100 text-black w-[14rem]"
              color="blue-gray"
              variant="outlined"
              fullWidth
              type="button"
              disabled={isLoading}
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={handleClick}
              className="w-[14rem]"
              color="blue"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
