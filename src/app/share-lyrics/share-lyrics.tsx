"use client";

import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { musicBackgroundDialog } from "@/redux/features/offer/offerSlice";
import MusicBackgroundDialog from "@/components/share-work-creation/music-background-dialog";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useForm } from "react-hook-form";

export interface LyricsWordFormData {
  lyricName: string;
  musicImage: any;
  lyricLanguage: string;
  coverImage: any;
  lyricStyle: string;
  writeLyric: string;
  lyricMood: string;
  tags: string;
  description: string;
  softwareTool: string;
}

export function ShareLyrics() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LyricsWordFormData>({ mode: 'onChange' });


  const [musicImagePreview, setMusicImagePreview] = React.useState<string>("");
  const musicSizeLimit = 20 * 1024 * 1024; // 20MB  
  const imageSizeLimit = 1024 * 1024; // 1MB
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMusicImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const onSubmit = async (data: LyricsWordFormData) => {

    console.log(data, "checkDataValue")
    const formData = new FormData();
    formData.append("lyricName", data.lyricName);
    formData.append("lyricLanguage", data.lyricLanguage);
    formData.append("lyricStyle", data.lyricStyle);
    formData.append("lyricMood", data.lyricMood);
    formData.append("writeLyric", data.writeLyric);
    formData.append("tags", data.tags);
    formData.append("description", data.description);
    formData.append("tools", data.softwareTool);
    
    if(data.musicImage && data.musicImage[0]){
      formData.append("musicImage", data.musicImage[0]);
    }

    try {
      const response  = await fetch("http://localhost:5000/v1/music/lyrics", {
        method: "POST",
        body: formData,
      });
      if(response.ok){
        console.log("Lyrics created successfully")
      }
    } catch (error) {
      console.log(error, "error")
    }
  }
  const dispatch = useDispatch<AppDispatch>();
  return (
    <section className="flex flex-row justify-center items-center my-8">
      {/* <MusicBackgroundDialog /> */}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-8">
          <div className="w-96">
            {/* LEFT */}
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-bold"
              >
                Lyric Name
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                {...register("lyricName", { required: "Lyric name is required" })}
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="default"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Song Language (Optional)
                </label>
                <select
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  {...register("lyricLanguage", {
                    required: "Please select a lyric language",
                  })}
                >
                  <option defaultValue={"Select Language"}>
                    Song Language
                  </option>
                  <option value="EN">English</option>
                  <option value="JP">Japanese</option>
                  <option value="GR">German</option>
                  <option value="FR">French</option>
                  <option value="IT">Italian</option>
                  <option value="SP">Spanish</option>
                  <option value="KR">Korean</option>
                  <option value="CH">Chinese</option>
                  <option value="AR">Arabic</option>
                </select>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex justify-center items-center gap-2 mt-10">
                  <div className="w-[18rem] flex flex-col gap-2 font-semibold text-sm">
                    Upload Cover Image
                    <label
                      htmlFor="musicImage"
                      className="flex flex-col items-center justify-center w-[10rem] h-[10rem] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer  hover:bg-gray-100"
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
                        {...register("musicImage", {
                          required: "Music image is required",
                          onChange: (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > imageSizeLimit) {
                                e.target.value = "";
                                // You can add a state for error message instead of alert here
                                alert("Image must be less than 1MB");
                                return;
                              }
                              if (!file.type.startsWith("image/")) {
                                e.target.value = "";
                                alert("File must be an image");
                                return;
                              }
                              handleImageChange(e);
                            }
                          },
                        })}
                      />
                    </label>
                    {errors.musicImage && (
                      <span className="text-red-500 text-xs">
                        {errors.musicImage.message as string}
                      </span>
                    )}
                  </div>
                </div>
                {/* music background upload removed */}
                {/* music pkayback background upload removed */}

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="default"
                    className="block text-sm font-semibold text-gray-900 "
                  >
                    Suitable Music Style
                  </label>
                  <select
                    id="lyricStyle"
                    {...register("lyricStyle", {
                      required: "Please select a music style",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option defaultValue={"Select Music Style"}>
                      Select Music Style
                    </option>
                    <option value="ambient">Ambient</option>
                    <option value="blues">Blues</option>
                    <option value="cinematic">Cinematic</option>
                    <option value="classical">Classical</option>
                    <option value="country">Country</option>
                    <option value="disco">Disco</option>
                    <option value="dubstep">Dubstep</option>
                    <option value="epic">Epic</option>
                    <option value="folk">Folk</option>
                    <option value="funk">Funk</option>
                    <option value="hip-hop">Hip hop</option>
                    <option value="holiday">Holiday</option>
                    <option value="house">House</option>
                    <option value="indie-pop">Indie Pop</option>
                    <option value="jazz">Jazz</option>
                    <option value="latin">Latin</option>
                    <option value="metal">Metal</option>
                    <option value="neo-soul">Neo-Soul</option>
                    <option value="new-age">New Age</option>
                    <option value="orchestral">Orchestral</option>
                    <option value="piano">Piano</option>
                    <option value="pop">Pop</option>
                    <option value="r&b">R&B</option>
                    <option value="rap">Rap</option>
                    <option value="reggae">Reggae</option>
                    <option value="rock">Rock</option>
                    <option value="samba">Samba</option>
                    <option value="trap">Trap</option>
                    <option value="underscore">Underscore</option>
                    <option value="video-game">Video Game</option>
                    <option value="world">World</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="default"
                    className="block text-sm font-semibold text-gray-900 "
                  >
                    Lyric Mood
                  </label>
                  <select
                    id="lyricMood"
                    {...register("lyricMood", {
                      required: "Please select a music mood",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option defaultValue={"Select Music Usage"}>
                      Select Music Mood
                    </option>
                    <option value="aggressive">Aggressive</option>
                    <option value="beautiful">Beautiful</option>
                    <option value="bright">Bright</option>
                    <option value="busy">Busy</option>
                    <option value="dark">Dark</option>
                    <option value="driving">Driving</option>
                    <option value="exciting">Exciting</option>
                    <option value="feel-good">Feel-good</option>
                    <option value="formal">Formal</option>
                    <option value="funny">Funny</option>
                    <option value="gentle">Gentle</option>
                    <option value="happy">Happy</option>
                    <option value="heroic">Heroic</option>
                    <option value="hypnotic">Hypnotic</option>
                    <option value="inspiring">Inspiring</option>
                    <option value="laid-back">Laid-back</option>
                    <option value="light-tension">Light Tension</option>
                    <option value="magical">Magical</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="neutral">Neutral</option>
                    <option value="nostalgic">Nostalgic</option>
                    <option value="peaceful">Peaceful</option>
                    <option value="quirky">Quirky</option>
                    <option value="reflective">Reflective</option>
                    <option value="relaxed">Relaxed</option>
                    <option value="romantic">Romantic</option>
                    <option value="sad">Sad</option>
                    <option value="scary">Scary</option>
                    <option value="serious">Serious</option>
                    <option value="sexy">Sexy</option>
                    <option value="spooky">Spooky</option>
                    <option value="stealthy">Stealthy</option>
                    <option value="strange">Strange</option>
                    <option value="tense">Tense</option>
                    <option value="uplifting">Uplifting</option>
                    <option value="urgent">Urgent</option>
                    <option value="violent">Violent</option>
                    <option value="warm">Warm</option>
                    <option value="whimsical">Whimsical</option>
                  </select>
                </div>

                <div className="flex justify-center items-center gap-2 max-w-[28rem]">
                  <Button
                    className="bg-blue-200 text-black normal-case w-[16rem] flex items-center justify-center"
                    color="blue"
                    variant="filled"
                  >
                    <span className=" text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-800">
                      PRO
                    </span>
                    Upgrade to gain more attention
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-96">
            {/* RIGHT */}
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Write Lyric
              </Typography>
              <RichTextEditor
                value={watch("writeLyric") || ""}
                onChange={(newValue) => setValue("writeLyric", newValue)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="my-2 w-full">
            {/* BOTTOM */}
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Tags (Fill in the key attribute words of the song for easy
                search, separated by commas)
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                {...register("tags", {
                  required: "Tags are required",
                  validate: (value) => {
                    if (value.split(",").length < 3) {
                      return "Please enter at least 3 tags";
                    }
                    return true;
                  }
                })}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Description
              </Typography>
              <Textarea className="w-96 h-56"
                {...register("description", { required: "Description is required", minLength: { value: 1, message: "Description is required" } })}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Software Tool (Optional)
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                {...register("softwareTool")}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <div>
            <Button
              className="bg-blue-gray-100 text-black w-[8rem]"
              color="blue-gray"
              variant="outlined"
              fullWidth
            >
              Cancel
            </Button>
          </div>
          <div className="flex flex-row gap-6">
            <Button
              className="bg-blue-gray-100 text-black w-[14rem]"
              color="blue-gray"
              variant="outlined"
              fullWidth
            >
              Save as Draft
            </Button>
            <Button className="w-[14rem]" color="blue" fullWidth type="submit">
              Publish
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ShareLyrics;
