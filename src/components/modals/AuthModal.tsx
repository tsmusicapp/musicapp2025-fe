"use client";

import React, { useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { musicPlayerDialog } from "@/redux/features/offer/offerSlice";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isMusicPlayerDialog = useSelector(
    (state: RootState) => state.offer.musicPlayerDialog
  );

  const closeMusicPlayer = useCallback(() => {
    if (isMusicPlayerDialog) {
      dispatch(musicPlayerDialog());
    }
  }, [dispatch, isMusicPlayerDialog]);

  useEffect(() => {
    if (isOpen) {
      closeMusicPlayer();
    }
  }, [isOpen, closeMusicPlayer]);

  const handleLogin = () => {
    router.push("/auth/login");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-[425px] bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white border-none shadow-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            🎵 Login Required
          </DialogTitle>
          <DialogDescription className="text-sm">
            Log in to enjoy our premium features and personalize your music
            experience.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            className="bg-gray-800 text-white hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-pink-500 to-red-600 text-white hover:opacity-90"
            onClick={handleLogin}
          >
            Log In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
