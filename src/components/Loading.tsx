"use client";
import React from "react";
import styles from "./styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>
        Hang tight! We're getting things ready for you...
      </p>
    </div>
  );
};

export default Loading;
