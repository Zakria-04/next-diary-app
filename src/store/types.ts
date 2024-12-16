import React, { SetStateAction } from "react";

export type DiaryListTypes = {
  _id: string;
  title: string;
  context: string;
  timeStamp: string;
};

export interface StoreContextType {
  // State
  theme: "light" | "dark";
  diary: DiaryListTypes[];
  isLive: boolean;

  // Setter function
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  setDiary: React.Dispatch<SetStateAction<DiaryListTypes[]>>;
  setIsLive: React.Dispatch<SetStateAction<boolean>>;

  // Functions
  handleThemeChange: () => void;
}
