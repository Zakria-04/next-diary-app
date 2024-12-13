"use client";
import { ReactNode, useEffect, useState } from "react";
import StoreContext from "./StoreContext";
import { DiaryListTypes, UserInfoType } from "./types";
import { getUserDiaryFromDB } from "@/res/api";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );
  const [diary, setDiary] = useState<DiaryListTypes[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfoType | null>(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [error, setError] = useState<string | null>(null);
  const [auth, setAuth] = useState(
    () => localStorage.getItem("auth") === "true"
  );

  // sync theme with local storage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // sync auth with local storage
  useEffect(() => {
    localStorage.setItem("auth", String(auth));
  }, [auth]);

  // sync user with local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Toggle Theme
  const handleThemeChange = () => {
    const mode = theme === "light" ? "dark" : "light";
    setTheme(mode);
  };

  // get user diary list
  const getUserDiary = async () => {
    try {
      setError(null);
      const response = await getUserDiaryFromDB({ authID: user?._id });
      setDiary(response);
    } catch (error: unknown) {
      const errMessage =
        error instanceof Error
          ? JSON.parse(error.message)
          : "An unknown error occurred";
      setError(errMessage.error);
    }
  };

  const providerValue = {
    // State
    theme,
    diary,
    isLive,
    user,
    error,
    auth,

    // Setter Function
    setTheme,
    setDiary,
    setIsLive,
    setUser,
    setError,
    setAuth,

    // Functions
    handleThemeChange,
    getUserDiary,
  };

  return (
    <StoreContext.Provider value={providerValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
