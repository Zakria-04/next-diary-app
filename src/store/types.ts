import React, { SetStateAction } from "react";

export type DiaryListTypes = {
  _id: string;
  title: string;
  context: string;
  timeStamp: string;
};

export type UserInfoType = {
  userName: string;
  email: string;
};

export interface StoreContextType {
  // State
  theme: "light" | "dark";
  diary: DiaryListTypes[];
  isLive: boolean;
  user: UserInfoType | null;
  error: string | null;

  // Setter function
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  setDiary: React.Dispatch<SetStateAction<DiaryListTypes[]>>;
  setIsLive: React.Dispatch<SetStateAction<boolean>>;
  setUser: React.Dispatch<SetStateAction<UserInfoType | null>>;
  setError: React.Dispatch<SetStateAction<string | null>>;

  // Functions
  handleThemeChange: () => void;
}
