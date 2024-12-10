"use client";
import { ReactNode, useEffect, useState } from "react";
import StoreContext from "./StoreContext";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    const mode = theme === "light" ? "dark" : "light";
    setTheme(mode);
  };

  const providerValue = {
    theme,
    setTheme,
    handleThemeChange,
  };

  return (
    <StoreContext.Provider value={providerValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
