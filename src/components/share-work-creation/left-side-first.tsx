import { Typography } from "@material-tailwind/react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/env_var";
import { useLocalStorage } from "@/context/LocalStorageContext";
import toast from "react-hot-toast";
import { X } from "lucide-react";

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
  const musicSizeLimit = 20 * 1024 * 1024;
  const imageSizeLimit = 1024 * 1024;
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [fileMusic, setFileMusic] = useState<File | undefined>(undefined);
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
      setFileMusic(selectedFile);
      setSelectedFileName(selectedFile.name);
      setMusicError(null);
    } else {
      setMusicError("Please upload a music file.");
    }
  };

  const removeImage = () => {
    setMusicImagePreview("");
    setFileImage(null);
    setValue("musicImage", null);
  };

  const removeAudio = () => {
    setFileMusic(undefined);
    setSelectedFileName("");
    setUploadProgress(0);
    setValue("musicAudio", null);
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (!fileImage) return;
      const musicImageForm = new FormData();
      musicImageForm.append("musicImage", fileImage);

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
      if (!fileMusic) return;
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

        xhr.onload = () => {
          if (xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);
            setValue("musicAudio", result.data.music);
            toast.success("Upload Music Track successful!");
            setUploadProgress(100);
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

    if (fileImage) uploadImage();
    if (fileMusic) uploadMusic();
  }, [fileImage, fileMusic, auth, setValue]);

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

      <div className="flex flex-col gap-2 text-sm font-semibold">
        Upload Music Image
        <div className="relative w-[10rem] h-[10rem] border-2 border-black border-dashed rounded-lg">
          <label
            htmlFor="musicImage"
            className="w-full h-full cursor-pointer flex items-center justify-center hover:bg-gray-100"
          >
            {musicImagePreview ? (
              <img
                src={musicImagePreview}
                alt="Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <p className="text-center text-gray-500">Less than 1MB</p>
            )}
            <input
              id="musicImage"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {musicImagePreview && (
            <button
              onClick={removeImage}
              className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-600"
              title="Remove image"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {imageError && (
          <span className="text-red-500 text-xs">{imageError}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm font-semibold">
        Upload Music
        <div className="relative w-[10rem] h-[6rem] border-2 border-black border-dashed rounded-lg">
          <label
            htmlFor="music"
            className="w-full h-full cursor-pointer flex items-center justify-center hover:bg-gray-100"
          >
            {selectedFileName ? (
              <p className="text-center text-gray-700">🎵</p>
            ) : (
              <p className="text-center text-gray-500">Less than 20MB</p>
            )}
            <input
              id="music"
              type="file"
              className="hidden"
              accept="audio/*"
              onChange={handleFileMusicChange}
            />
          </label>
          {selectedFileName && (
            <button
              onClick={removeAudio}
              className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-600"
              title="Remove audio"
            >
              <X size={16} />
            </button>
          )}
        </div>
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
        <p className="text-sm text-gray-600 mt-2">
          The Music uploaded here is only for trial listening and not for
          download; <br />
          if you don't have copyright, only upload music clips.
        </p>
      </div>
    </div>
  );
}

export default LeftSideFirst;
