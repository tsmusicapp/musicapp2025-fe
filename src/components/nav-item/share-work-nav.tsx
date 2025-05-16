import React from "react";
import dynamic from "next/dynamic";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";

// Dynamically import Material Tailwind components
const Menu = dynamic(() => import("@material-tailwind/react").then((mod) => mod.Menu), {
  ssr: false,
});
const MenuHandler = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.MenuHandler),
  { ssr: false }
);
const MenuList = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.MenuList),
  { ssr: false }
);
const MenuItem = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.MenuItem),
  { ssr: false }
);
const Button = dynamic(() => import("@material-tailwind/react").then((mod) => mod.Button), {
  ssr: false,
});

const menuItems = [
  {
    url: "share-work-creation",
    description: "Share Your Music Creation",
    size: "0.875",
    iconName: "share-work-creation",
  },
  {
    url: "share-lyrics",
    description: "Share Your Sing Work",
    size: "0.875",
    iconName: "share-work-creation",
  },
  {
    url: "share-lyrics",
    description: "Share Your Lyric Work",
    size: "0.875",
    iconName: "share-lyric",
  },
  {
    url: "share-work-sales-market",
    description: "Upload Your Music Assets to the sales market",
    size: "0.875",
    iconName: "share-work-market",
  },
];

interface NavProps {
  isScrolling: boolean;
  lightOnly?: boolean;
}

export default function ShareWorkNav({ isScrolling, lightOnly = false }: NavProps) {
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleOpen = () => setOpenMenu(!openMenu);

  return (
    <div className="relative">
      <Menu open={openMenu} handler={handleOpen} allowHover placement="bottom-start">
        <MenuHandler>
          <Button
            color="gray"
            variant="outlined"
            size="sm"
            className={`flex items-center gap-2 rounded-full text-sm font-sans border-gray-300 normal-case transition-all duration-300 ${
              lightOnly
                ? "text-black hover:bg-gray-200 hover:border-gray-400"
                : isScrolling
                  ? "text-black hover:bg-gray-200 hover:border-gray-400"
                  : "text-white hover:bg-gray-800/20 hover:border-gray-500"
            }`}
          >
            Share Your Work
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform duration-300 ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList
          className="
            absolute 
            !top-[5%] !left-[60%] !mt-[29px] w-[18rem]
            rounded-lg 
            bg-white 
            shadow-lg 
            border 
            border-gray-200 
            p-2 
            z-50 
            hidden 
            lg:block 
            focus:outline-none 
            transform 
            transition-all 
            duration-200 
            origin-top-left 
            scale-95 
            hover:scale-100
          "
        >
          <ul className="flex w-full flex-col gap-1">
            {menuItems.map(({ url, description, size, iconName }) => (
              <Link href={`/${url}`} key={url} className="outline-none">
                <MenuItem
                  className="
                    flex 
                    items-center 
                    gap-3 
                    p-3 
                    rounded-md 
                    hover:bg-gray-100 
                    transition-colors 
                    duration-200 
                    group
                  "
                >
                  <img
                    src={`/icons/${iconName}.png`}
                    style={{ height: 32, width: 32 }}
                    className="object-contain"
                    alt={description}
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className={`flex-1 text-${size}rem font-medium group-hover:text-blue-600 transition-colors duration-200`}
                  >
                    {description}
                  </Typography>
                  <ArrowRightIcon
                    className="
                      h-5 
                      w-5 
                      text-gray-500 
                      group-hover:text-blue-600 
                      transition-colors 
                      duration-200
                    "
                  />
                </MenuItem>
              </Link>
            ))}
          </ul>
        </MenuList>
      </Menu>
    </div>
  );
}