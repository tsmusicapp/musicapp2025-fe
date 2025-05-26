"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@material-tailwind/react";
import Navbar from "./navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarOn = ["/auth/login", "/auth/register"];

  const showNavbar = !hideNavbarOn.includes(pathname);

  return (
    <ThemeProvider>
      <div className="mx-auto max-w-[1450px] px-4">
        {showNavbar && <Navbar />}
        {children}
      </div>
    </ThemeProvider>
  );
}

export default Layout;
