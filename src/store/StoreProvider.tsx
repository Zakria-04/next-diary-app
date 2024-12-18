"use client";
import { ReactNode, useEffect, useState } from "react";
import StoreContext from "./StoreContext";
import { DiaryListTypes, UserInfoType } from "./types";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [diary, setDiary] = useState<DiaryListTypes[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    user,
    error,

    // Setter Function
    setTheme,
    setDiary,
    setIsLive,
    setUser,
    setError,

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
