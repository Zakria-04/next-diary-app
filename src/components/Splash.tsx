"use client";
import { isLive } from "@/res/api";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./styles/Splash.module.css"

const Splash = () => {
  const isServerLive = async () => {
    const response = await isLive();
    response.live && redirect("/login");
  };

  useEffect(() => {
    isServerLive();
  }, [isServerLive]);

  return (
    <div className={styles.container}>
      <h1>Loading...</h1>
    </div>
  );
};

export default Splash;
