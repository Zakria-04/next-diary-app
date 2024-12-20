"use client";
import { ReactNode, useEffect, useState } from "react";
import StoreContext from "./StoreContext";
import { DiaryListTypes, UserInfoType } from "./types";
import { getUserDiaryFromDB } from "@/res/api";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [diary, setDiary] = useState<DiaryListTypes[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [auth, setAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const savedUser = localStorage.getItem("user");
    const savedAuth = localStorage.getItem("auth");

    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedAuth) {
      setAuth(savedAuth === "true");
    }
  }, []);

  // Sync theme with local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Sync auth with local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", String(auth));
    }
  }, [auth]);

  // Sync user with local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Toggle Theme
  const handleThemeChange = () => {
    const mode = theme === "light" ? "dark" : "light";
    setTheme(mode);
  };

  // Get user diary list
  const getUserDiary = async () => {
    if (user?._id) {
      try {
        setError(null);
        const response = await getUserDiaryFromDB({ authID: user._id });
        setDiary(response);
      } catch (error: unknown) {
        const errMessage =
          error instanceof Error
            ? JSON.parse(error.message)
            : "An unknown error occurred";
        setError(errMessage.error);
      }
    }
  };

  // Logout user
  const logoutUser = () => {
    setAuth(false);
    setDiary([]);
    setUser(null);
  };

  const providerValue = {
    // State
    theme,
    diary,
    isLive,
    user,
    error,
    auth,
    isLoading,

    // Setter Functions
    setTheme,
    setDiary,
    setIsLive,
    setUser,
    setError,
    setAuth,
    setIsLoading,

    // Functions
    handleThemeChange,
    getUserDiary,
    logoutUser,
  };

  return (
    <StoreContext.Provider value={providerValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
