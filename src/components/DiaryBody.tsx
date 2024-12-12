"use client";
import React from "react";
import styles from "./styles/DiaryBody.module.css";
import useStore from "@/utils/store_provider";
import DiaryList from "./DiaryList";

const DiaryBody = () => {
  const { diary } = useStore();

  console.log(diary);

  return (
    <div className={styles.container}>
      <DiaryList diary={diary}  />
    </div>
  );
};

export default DiaryBody;
