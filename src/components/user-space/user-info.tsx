import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../context/LocalStorageContext";
import { defaultStateUser, IUserProfile } from "../../types/UserSpace";
import { API_URL } from "../../utils/env_var";
import Image from 'next/image';

function UserInfo() {
  const { getItem, setItem } = useLocalStorage();
  const [auth, setAuth] = useState<any>(getItem("auth", null));
  const [imageUrl, setImageUrl] = useState("/image/default-picture.png");
  const [formData, setFormData] = useState<IUserProfile>(defaultStateUser);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.tokens?.access?.token) {
        toast.error("Please log in to view your profile.");

        return;
      }

      try {
        const response = await fetch(`${API_URL}/v1/user-space`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.tokens.access.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const profileUrl = data?.profilePicture
          ? `${data?.profilePicture}`
          : "/image/default-picture.png";
        setImageUrl(profileUrl);

        setFormData(data);
      } catch (error) {
        setImageUrl("/image/default-picture.jpg");
      }
    };

    fetchData();
  }, [auth]);

  return (
    <div className="absolute max-w-[22rem] top-[1rem] left-[0rem] z-30 border border-black/10/10 rounded-lg">
      <div className="bg-white shadow rounded-lg p-6 z-50">
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center gap-1 py-6">
            <Avatar
              size="xxl"
              variant="circular"
              src={imageUrl}
              alt="profile picture"
              className="border border-white hover:z-10 focus:z-10"
            />
            <Typography variant="h5" color="blue-gray" className="font-bold">
              {formData.firstName && formData.lastName
                ? formData.firstName + " " + formData.lastName
                : "-"}
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1">
              <Image
                src={"/icons/location.png"}
                alt="Location icon"
                width={24}
                height={24}
              />
              <p className="text-black font-bold text-sm">
                {/* {formData.location} */}
                USA , New York
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Image
                src={"/icons/profession.png"}
                alt="Profession icon"
                width={24}
                height={24}
              />
              <p className="text-black font-bold text-sm capitalize">
                {formData.creationOccupation
                  ? formData.creationOccupation.join(", ")
                  : "-"}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Image
                src={"/icons/profession.png"}
                alt="Business profession icon"
                width={24}
                height={24}
              />
              <p className="text-black font-bold text-sm capitalize">
                {formData.businessOccupation
                  ? formData.businessOccupation
                  : "-"}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Image 
                src={"/icons/time.png"} 
                alt="Time icon"
                width={24}
                height={24}
              />
              <p className="text-black font-bold text-sm">
                {formData.hiring
                  ? "Available to Work"
                  : `Work at ${formData.companyOrStudio}`}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Image
                src={"/icons/studio.png"}
                alt="Studio icon"
                width={24}
                height={24}
              />
              <p className="text-black font-bold text-sm">
                {formData.companyOrStudio ? formData.companyOrStudio : ""}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Image
                src={"/icons/website.png"}
                alt="Website icon"
                width={24}
                height={24}
              />
              <Link href={""} target="_blank">
                <p className="text-black font-bold text-sm cursor-pointer hover:text-blue-600">
                  {formData.websiteUrl}
                </p>
              </Link>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 w-full justify-center">
            <Link href={"/edit-user-space"} className="">
              <Button
                variant="gradient"
                color="blue"
                className="normal-case w-full font-semibold"
              >
                Edit Your Profile
              </Button>
            </Link>
            <Link href={"/member-management"}>
              <Button
                variant="gradient"
                color="blue-gray"
                className="normal-case w-full font-semibold"
              >
                Go Pro
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-1 my-4">
          <div className="flex flex-row justify-between gap-1">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-xs font-notoSemibold"
            >
              Appreciations
            </Typography>
            <p className="text-xs text-black font-bold font-notoRegular">
              60,216
            </p>
          </div>
          <div className="flex flex-row justify-between gap-1 mb-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-xs font-notoSemibold"
            >
              Followers
            </Typography>
            <p className="text-xs text-black font-bold font-notoRegular">
              16,069
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-between gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold text-xs font-notoSemibold"
              >
                Collaboration lyrics Language
              </Typography>
              <p className="text-xs text-black font-notoRegular capitalize">
                {formData.collaborationLyricsLangs
                  ? formData.collaborationLyricsLangs.join(", ")
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold text-xs font-notoSemibold"
              >
                Proficient in musical style
              </Typography>
              <p className="text-xs text-black font-notoRegular capitalize">
                {formData.proficientMusicStyles
                  ? formData.proficientMusicStyles.join(", ")
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold text-xs font-notoSemibold"
              >
                Skilled Instrument
              </Typography>
              <p className="text-xs text-black font-notoRegular capitalize">
                {formData.skilledInstruments
                  ? formData.skilledInstruments.join(", ")
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold text-xs font-notoSemibold"
              >
                Collaborated Singers
              </Typography>
              <p className="text-xs text-black font-notoRegular capitalize">
                {formData.collaboratedSingers
                  ? formData.collaboratedSingers
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold text-xs font-notoSemibold"
              >
                Collaborated Publishers
              </Typography>
              <p className="text-xs text-black font-notoRegular capitalize">
                {formData.collaboratedPublisher
                  ? formData.collaboratedPublisher
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold text-xs font-notoSemibold"
              >
                Company or Studio
              </Typography>
              <p className="text-xs text-black font-notoRegular capitalize">
                {formData.companyOrStudio ? formData.companyOrStudio : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col my-8 space-y-2">
          <div className="flex flex-row gap-1 justify-between border border-black/10 p-2">
            <p className="text-xs text-black font-notoRegular font-bold">
              LinkedIn
            </p>
            <Link href={"https://www.linkedin.com/"} target="_blank">
              <ArrowTopRightOnSquareIcon className="h-4 w-4 hover:text-blue-700" />
            </Link>
          </div>
          <div className="flex flex-row gap-1 justify-between border border-r-2 border-black/10 p-2">
            <p className="text-xs text-black font-notoRegular font-bold">X</p>
            <Link href={"https://x.com/?lang=en"} target="_blank">
              <ArrowTopRightOnSquareIcon className="h-4 w-4 hover:text-blue-700" />
            </Link>
          </div>
          <div className="flex flex-row gap-1 justify-between border border-black/10 p-2">
            <p className="text-xs text-black font-notoRegular font-bold">
              Facebook
            </p>
            <Link href={"https://www.facebook.com/"} target="_blank">
              <ArrowTopRightOnSquareIcon className="h-4 w-4 hover:text-blue-700" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-1 my-8">
          <div className="mb-2">
            <Typography variant="small" color="blue-gray" className="font-bold">
              About
            </Typography>
          </div>
          <p className="text-xs text-black font-notoRegular font-bold text-justify">
            {formData.aboutMe ? formData.aboutMe : "-"}
          </p>
        </div>
        <div className="flex flex-col gap-1 my-8">
          <div className="mb-2">
            <Typography variant="small" color="blue-gray" className="font-bold">
              Software Tools
            </Typography>
          </div>
          <p className="text-xs text-black capitalize font-notoRegular font-bold">
            {formData.softwareTool ? formData.softwareTool : "-"}
          </p>
          <p className="text-xs text-black font-notoRegular font-bold">
            ArchiCAD
          </p>
          <p className="text-xs text-black font-notoRegular font-bold">
            Autodesk Revit
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
