"use client";

import { Typography, Input } from "@material-tailwind/react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/env_var";
import { useLocalStorage } from "@/context/LocalStorageContext";
import toast from "react-hot-toast";

interface LeftSideFirstProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
}

function LeftSideFirst({ register, errors, setValue }: LeftSideFirstProps) {
  const { getItem } = useLocalStorage();
  const [auth] = useState<any>(getItem("auth", null));

  const [musicImagePreview, setMusicImagePreview] = useState<string>("");
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const musicSizeLimit = 20 * 1024 * 1024; // 20MB
  const imageSizeLimit = 1024 * 1024; // 1MB
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [fileMusic, setFileMusic] = useState<File | undefined | Blob>(
    undefined
  );
  const [imageError, setImageError] = useState<string | null>(null);
  const [musicError, setMusicError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMusicImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setFileImage(selectedFile);
      setImageError(null);
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
      setMusicError(null);
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

          setValue("musicImage", result.data.profilePicture);

          toast.success("Upload Music Image successful!");
        } else {
          const errorResult = await response.json();
          toast.error(
            `Error: ${errorResult.message || "Failed to upload Music Image"}`
          );
        }
      } catch (error) {
        console.error("Error during Upload Music Image:", error);
        toast.error("An unexpected error occurred.");
      }
    };

    const uploadMusic = async () => {
      if (!fileMusic) {
        return;
      }
      const formData = new FormData();
      formData.append("music", fileMusic);

      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_URL}/v1/tracks/`, true);
        xhr.setRequestHeader(
          "Authorization",
          `Bearer ${auth.tokens.access.token}`
        );

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(progress);
          }
        };

        xhr.onload = async () => {
          if (xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);
            setValue("musicAudio", result.data.music);
            toast.success("Upload Music Track successful!");
            setUploadProgress(100); // Set to 100% instead of 0
          } else {
            const errorResult = JSON.parse(xhr.responseText);
            toast.error(
              `Error: ${errorResult.message || "Failed to upload Music Track"}`
            );
            setUploadProgress(0);
          }
        };

        xhr.onerror = () => {
          toast.error("An unexpected error occurred.");
          setUploadProgress(0);
        };

        xhr.send(formData);
      } catch (error) {
        toast.error("An unexpected error occurred.");
        setUploadProgress(0);
      }
    };
    if (fileMusic) {
      uploadMusic();
    }
    if (fileImage) {
      uploadImage();
    }
  }, [fileMusic, fileImage, auth]);

  return (
    <div className="mb-1 flex flex-col gap-4">
      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-bold"
        >
          Music Name
        </Typography>
        <input
          {...register("musicName", { required: "Music name is required" })}
          className="w-full px-4 py-2 border border-black rounded-none outline-none focus:ring-0 focus:border-black"
          placeholder="Enter music name"
        />
        {errors.musicName && (
          <span className="text-red-500 text-xs">
            {errors.musicName.message as string}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="w-[18rem] flex flex-col gap-2 font-semibold text-sm">
              Upload Music Image
              <label
                htmlFor="musicImage"
                className="flex flex-col items-center justify-center w-[10rem] h-[10rem] border-2 border-black border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {musicImagePreview ? (
                  <img
                    src={musicImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Less than 1MB</span>
                    </p>
                  </div>
                )}
                <input
                  id="musicImage"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {imageError && (
                <span className="text-red-500 text-xs">{imageError}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="w-[18rem] flex flex-col gap-2 font-semibold text-sm">
              Upload Music
              <label
                htmlFor="music"
                className="flex flex-col items-center justify-center w-[10rem] h-[6rem] border-2 border-black border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Less than 20MB</span>
                  </p>
                </div>
                <input
                  id="music"
                  type="file"
                  className="hidden"
                  accept="audio/*"
                  onChange={handleFileMusicChange}
                />
              </label>
              {selectedFileName && (
                <p className="text-sm text-gray-700 mt-2">
                  Selected File: {selectedFileName}
                </p>
              )}
              {uploadProgress > 0 && (
                <div className="w-full mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-right">
                    {uploadProgress}%
                  </p>
                </div>
              )}
              {musicError && (
                <span className="text-red-500 text-xs">{musicError}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2 pr-32">
            <p className="text-sm">
              The Music uploaded here is only for trial listening and not for
              download; <br /> if you dont have copyright, only upload
              music clips
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideFirst;