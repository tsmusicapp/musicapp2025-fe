"use client";

import { MusicCreationService } from "@/services/music-creation.service";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import BottomPart from "../../components/share-work-creation/bottom-part";
import LeftSideFirst from "../../components/share-work-creation/left-side-first";
import LeftSideSecond from "../../components/share-work-creation/left-side-second";
import MusicBackgroundDialog from "../../components/share-work-creation/music-background-dialog";
import RightSideFirst from "../../components/share-work-creation/right-side-first";
import RightSideSecond from "../../components/share-your-sing-work/right-side-second";
import { API_URL } from "@/utils/env_var";
import { useLocalStorage } from "@/context/LocalStorageContext";

export interface ShareWorkFormData {
  musicName: string;
  myRole: string[];
  description: string;
  musicImage: any;
  musicAudio: any;
  language: string;
  music: any;
  albumname: any;
  musicLyric?: any;
  musicBackground?: FileList;
  musicUsage: string[];
  musicStyle: string;
  musicMood?: string;
  musicInstrument?: string;
  tags: string;
  softwareTool?: string;
  singerName?: string;
  publisher?: string;
  songLanguage?: string;
}

export function ShareYourSingWorkPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getItem } = useLocalStorage();
  const [auth] = useState<any>(getItem("auth", null));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ShareWorkFormData>({
    mode: "onChange",
    defaultValues: {
      musicName: "",
      myRole: [],
      description: "",
    },
  });

  useEffect(() => {
    // Check for authentication token when component mounts
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.success("No authentication token found. Please log in.");
      
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log("Form value changed:", name, value)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: ShareWorkFormData) => {
    setIsLoading(true);
    const payload = {
      songName: data.musicName,
      myRole: JSON.stringify(data.myRole),
      singerName: data.singerName || "",
      publisher: data.singerName || "",
      albumname: data.albumname || "",
      songLanguage: data.songLanguage || "",
      musicUsage: JSON.stringify(data.musicUsage),
      musicStyle: data.musicStyle,
      musicMood: data.musicMood || "",
      musicInstrument: data.musicInstrument || "",
      tags: data.tags,
      description: data.description,
      softwareTool: data.softwareTool || "",
      // Instead of sending files, send metadata or pre-uploaded URLs
      musicImage: data.musicImage,
      music: data.music,
      musicLyric: null,
      musicBackground: data.musicBackground,
      musicAudio: data.musicAudio,
    };
        try {
          const response = await fetch(`${API_URL}/v1/music/upload`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.tokens.access.token}`,
            },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
            await response.json();
            toast.success("Work shared successfully!");
            router.push("/");
            setIsLoading(false);
          } else {
            const errorResult = await response.json();
            toast.error(
              `Error: ${errorResult.message || "Failed to create music asset"}`
            );
    
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
          toast.error("An unexpected error occurred.");
        }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="flex flex-row w-full justify-center items-center my-8">
      <MusicBackgroundDialog setValue={setValue} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 px-24"
      >
        <div className="flex flex-row gap-24">
          <div className="flex flex-col gap- w-1/2">
            <LeftSideFirst register={register} errors={errors} setValue={setValue} />
            <LeftSideSecond
              register={register}
              errors={errors}
              setValue={setValue}
            />
          </div>

          <div className="flex flex-col gap-8 w-1/2">
            <RightSideFirst register={register} errors={errors} />
            <RightSideSecond
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          </div>
        </div>

        <BottomPart register={register} errors={errors} />

        <div className="flex flex-row justify-between gap-4 mb-10 mt-2">
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-blue-gray-100 text-black w-32"
            color="blue-gray"
            variant="outlined"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <div className="flex flex-row gap-6">
            <Button
              type="button"
              className="bg-blue-gray-100 text-black w-56"
              color="blue-gray"
              variant="outlined"
              disabled={isLoading}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="w-56"
              color="blue"
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">
              Please fix the following errors:
            </strong>
            <ul className="list-disc list-inside mt-2">
              {errors.musicName && (
                <li>{errors.musicName.message as string}</li>
              )}
              {errors.myRole && <li>{errors.myRole.message as string}</li>}
              {errors.description && (
                <li>{errors.description.message as string}</li>
              )}
            </ul>
          </div>
        )}
      </form>
    </section>
  );
}

export default ShareYourSingWorkPage;
