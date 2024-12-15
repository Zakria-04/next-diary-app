"use client";
import React from "react";
import useStore from "@/utils/store_provider";
import styles from "./styles/Header.module.css";

const Header = () => {
  const { theme, handleThemeChange } = useStore();

  return (
    <div className={styles.header}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={handleThemeChange}
          checked={theme === "dark"}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default Header;
