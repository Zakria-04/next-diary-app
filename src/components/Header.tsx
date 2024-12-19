"use client";
import React from "react";
import useStore from "@/utils/store_provider";
import styles from "./styles/Header.module.css";
import Image from "next/image";
import logout from "../assets/images/logout.png";

const Header = () => {
  const { theme, handleThemeChange, logoutUser, auth } = useStore();

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
      {auth && (
        <Image
          src={logout}
          alt="logout"
          width={45}
          height={45}
          onClick={logoutUser}
        />
      )}
    </div>
  );
};

export default Header;
