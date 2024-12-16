"use client";
import { ReactNode, useEffect, useState } from "react";
import StoreContext from "./StoreContext";
import { DiaryListTypes } from "./types";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [diary, setDiary] = useState<DiaryListTypes[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    const mode = theme === "light" ? "dark" : "light";
    setTheme(mode);
  };

  const providerValue = {
    // State
    theme,
    diary,
    isLive,

    // Setter Function
    setTheme,
    setDiary,
    setIsLive,

    // Functions
    handleThemeChange,
  };

  return (
    <StoreContext.Provider value={providerValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
