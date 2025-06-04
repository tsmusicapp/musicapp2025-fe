"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Avatar,
  Popover,
  PopoverContent,
  PopoverHandler,
  Badge,
} from "@material-tailwind/react";
import Link from "next/link";
import { useLocalStorage } from "@/context/LocalStorageContext";
import { toast } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";

interface HomeMusicianBoxProps {
  id: string;
  musicImage: string;
  songName: string;
  singerName: string;
  composerName: string;
  musicStyle: string;
  tags: string[];
  duration?: string;
  likes?: number;
  audioSrc?: string;
  lyrics?: boolean;
  myRole: string[];
  isMusicAsset?: boolean;
  commercialUsePrice: string;
  userName: string;
  profilePicture: string;
}

interface NavProps {
  isScrolling: boolean;
}

function ShoppingCartNav({ isScrolling }: NavProps) {
  const [openPopover, setOpenPopover] = useState(false);
  const { getItem, setItem } = useLocalStorage();
  
  // Use state to manage cart items for real-time updates
  const [cartItems, setCartItems] = useState<HomeMusicianBoxProps[]>([]);

  // Initialize cart items and set up real-time updates
  useEffect(() => {
    // Initial load
    const initialCart = getItem("cart", [] as HomeMusicianBoxProps[]);
    setCartItems(initialCart);

    // Set up storage event listener for cross-tab updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        const newCart = e.newValue ? JSON.parse(e.newValue) : [];
        setCartItems(newCart);
      }
    };

    // Listen for storage changes (cross-tab updates)
    window.addEventListener("storage", handleStorageChange);

    // Custom event listener for same-tab updates
    const handleCartUpdate = (e: CustomEvent) => {
      setCartItems(e.detail);
    };

    window.addEventListener("cartUpdated", handleCartUpdate as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate as EventListener);
    };
  }, [getItem]);

  // Also check for updates when popover opens (fallback)
  useEffect(() => {
    if (openPopover) {
      const currentCart = getItem("cart", [] as HomeMusicianBoxProps[]);
      setCartItems(currentCart);
    }
  }, [openPopover, getItem]);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  // Calculate total price
  const totalPrice = cartItems
    .reduce(
      (sum, item) =>
        sum + (parseFloat(item.commercialUsePrice.replace("$", "")) || 0),
      0
    )
    .toFixed(2);

  // Enhanced remove item function with real-time updates
  const handleRemoveItem = (id: string, songName: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    
    // Update localStorage
    setItem("cart", updatedCart);
    
    // Update local state immediately
    setCartItems(updatedCart);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: updatedCart }));
    
    toast.success(`${songName} has been removed from your cart!`, {
      position: "bottom-right",
      duration: 1000,
    });
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <Badge
        content={cartItems.length.toString()}
        color="red"
        withBorder
        className="p-1"
      >
        <PopoverHandler {...triggers}>
          <img
            src={
              isScrolling ? "/icons/cart-black.png" : "/icons/cart-white.png"
            }
            style={{ height: 24, width: 27 }}
            className="cursor-pointer"
            alt="Shopping Cart"
          />
        </PopoverHandler>
      </Badge>
      <PopoverContent {...triggers} className="z-50 w-[20rem]">
        <Typography
          variant="h6"
          color="black"
          className="mb-2 flex items-center gap-2 font-semibold"
        >
          Shopping Cart
        </Typography>
        <Typography
          variant="small"
          color="black"
          className="font-normal text-black"
        >
          You have <span className="text-blue-200">{cartItems.length}</span>{" "}
          {cartItems.length === 1 ? "item" : "items"} in your shopping cart
        </Typography>
        <div className="mt-4 flex flex-col gap-2">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-center justify-between mx-3"
              >
                <Avatar
                  variant="square"
                  alt={item.songName}
                  size="sm"
                  className="cursor-pointer"
                  src={item.musicImage || "/image/default-picture.jpg"}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = "/image/default-picture.jpg";
                  }}
                />
                <p className="text-black font-medium">{item.songName}</p>
                <div className="flex items-center gap-2">
                  <p className="text-blue-300 font-medium">
                    {item.commercialUsePrice}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id, item.songName)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-all duration-300"
                    aria-label={`Remove ${item.songName} from cart`}
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Typography
              variant="small"
              color="black"
              className="text-center font-normal text-black"
            >
              Your cart is empty
            </Typography>
          )}
          {cartItems.length > 0 && (
            <div className="flex flex-row items-center justify-end mx-3">
              <p className="text-black font-bold">Total: ${totalPrice}</p>
            </div>
          )}
          <div className="flex flex-col items-center justify-center gap-1 py-4">
            <Link href="/checkout">
              <Button
                variant="filled"
                color="red"
                size="sm"
                className="normal-case text-white font-semibold text-center w-full cursor-pointer rounded-none border-black border-2"
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </Button>
            </Link>
            <Link href="/checkout">
              <Button
                variant="text"
                size="sm"
                className="normal-case text-black text-center cursor-pointer"
              >
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ShoppingCartNav;