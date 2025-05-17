import { isCustomer } from "@/redux/features/offer/offerSlice";
import { LOGOUTUSER } from "@/services/apiServices";
import { API_URL } from "@/utils/env_var";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface UserProps {
  user: any;
}

export default function DropdownProfile({ user }: UserProps) {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState<any>(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });
  const router = useRouter();
  const onLogout = async () => {
    try {
      const refreshToken = auth.tokens.refresh.token;
      console.log({ refreshToken });
      const response = await fetch(LOGOUTUSER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      if (response.status == 204) {
        localStorage.clear();
        toast.success("Logout successful!");

        router.push("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An unexpected error occurred.");
    }
  };
  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="profile picture"
          size="sm"
          className="cursor-pointer"
          src={
            user?.profilePicture
              ? `${API_URL}/uploads/${user.id}/profilePicture.png`
              : "/image/default-picture.png"
          }
        />
      </MenuHandler>
      <MenuList>
        <div className="flex flex-col justify-center items-center focus:outline-none">
          <div className="flex flex-col justify-center items-center mb-5">
            <p className="text-black font-semibold">{user.name}</p>
            <p className="text-black font-medium">{user.email}</p>
          </div>
          <Link href={"/member-management"}>
            <Button
              variant="filled"
              size="sm"
              color="blue"
              className="normal-case text-white w-full text-center cursor-pointer"
            >
              Upgrade to Pro
            </Button>
          </Link>
        </div>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2">
          <Link href={"/user-space"}>
            <Typography variant="small" className="font-medium">
              View Profile
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link href={"/edit-user-space"}>
            <Typography variant="small" className="font-medium">
              Edit Profile
            </Typography>
          </Link>
        </MenuItem>
        {/* <MenuItem className="flex items-center gap-2">
          <Typography variant="small" className="font-medium">
            Edit My Availability
          </Typography>
        </MenuItem> */}
        {auth.user.role == "recruiter" ? (
          <MenuItem className="flex items-center gap-2">
            <Link href={"/order"} onClick={() => dispatch(isCustomer(false))}>
              <Typography variant="small" className="font-medium">
                My Work Orders
              </Typography>
            </Link>
          </MenuItem>
        ) : (
          <>
            <MenuItem className="flex items-center gap-2">
              <Link href={"/order"} onClick={() => dispatch(isCustomer(true))}>
                <Typography variant="small" className="font-medium">
                  My Orders
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Link href={"/sales"}>
                <Typography variant="small" className="font-medium">
                  My Sales
                </Typography>
              </Link>
            </MenuItem>
          </>
        )}
        <MenuItem className="flex items-center gap-2">
          <Link href={"/purchase"}>
            <Typography variant="small" className="font-medium">
              My Purchase
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link
            href={{
              pathname: "/user-space",
              query: { section: "my-collection" },
            }}
          >
            <Typography variant="small" className="font-medium">
              My Collections
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link
            href={{
              pathname: "/user-space",
              query: { section: "my-liked" },
            }}
          >
            <Typography variant="small" className="font-medium">
              My Liked
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link
            href={{
              pathname: "/user-space",
              query: { section: "my-following" },
            }}
          >
            <Typography variant="small" className="font-medium">
              My Following
            </Typography>
          </Link>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 ">
          <Link href={"/settings"}>
            <Typography variant="small" className="font-medium">
              Setting
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2 ">
          <Link href={"/contact-us"}>
            <Typography variant="small" className="font-medium">
              Contact Us
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2 ">
          <Typography
            onClick={onLogout}
            variant="small"
            className="font-medium"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
