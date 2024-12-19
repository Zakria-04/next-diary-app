"use client";
import React, { SetStateAction } from "react";
import useStore from "@/utils/store_provider";
import styles from "./styles/Header.module.css";
import Image from "next/image";
import logout from "../assets/images/logout.png";

interface HeaderProps {
  needTestAccount?: boolean;
  setNeedTestAccount?: React.Dispatch<SetStateAction<boolean>>;
  status?: string;
}

const Header: React.FC<HeaderProps> = ({
  needTestAccount,
  setNeedTestAccount,
  status,
}) => {
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
      {!auth && status === "login" && setNeedTestAccount && (
        <button onClick={() => setNeedTestAccount(!needTestAccount)}>
          Sign in with a test account
        </button>
      )}
    </div>
  );
};

export default Header;
