import React from "react";

export interface StoreContextType {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  handleThemeChange: () => void;
}
