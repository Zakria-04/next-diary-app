"use client";
import React from "react";
import lightDarkMode from "../assets/images/day-and-night.png";
import Image from "next/image";
import useStore from "@/utils/store_provider";

const Header = () => {
  const { theme, handleThemeChange } = useStore();

  return (
    <div>
      <Image
        onClick={handleThemeChange}
        src={lightDarkMode}
        alt="light-dark mode"
      />
    </div>
  );
};

export default Header;
