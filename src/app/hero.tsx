"use client";

import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/checkAuth";
import { LoginModal } from "@/components/modals/AuthModal";

function Hero() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const router = useRouter();

  const handleProtectedNavigation = (path: string) => {
    if (isAuthenticated()) {
      router.push(path);
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <>
      <div className="relative min-h-[55vh] w-full bg-[url('/image/landing.png')] bg-cover bg-no-repeat">
        <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
        <div className="grid min-h-[55vh] px-8">
          <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center mt-[9rem]">
            {/* <p className="text-white text-5xl font-extralight lg:max-w-4xl">
              A professional community for Composers, Lyricist, and Producers
            </p> */}
            <p className="text-white mt-1 mb-10 text-xl font-extralight w-full md:max-w-full lg:max-w-2xl">
              Let more record companies, singers, game companies, movie companies,
              and entertainment companies discover for you
            </p>
            <div className="flex flex-row gap-10 items-center mb-3">
              <Button
                variant="gradient"
                className="normal-case"
                color="white"
                onClick={() => handleProtectedNavigation("/share-work-creation")}
              >
                Share Your Music Work
              </Button>
              <Button
                variant="gradient"
                className="normal-case"
                color="white"
                onClick={() => handleProtectedNavigation("/share-work-sales-market")}
              >
                Sale Your Music Assets
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}

export default Hero;
