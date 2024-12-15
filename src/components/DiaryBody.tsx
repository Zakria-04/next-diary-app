"use client";
import React, { SetStateAction } from "react";
import styles from "./styles/DiaryBody.module.css";
import useStore from "@/utils/store_provider";
import DiaryList from "./DiaryList";

interface DiaryBodyProps {
  listSimulator: Array<string>;
  setListSimulator: React.Dispatch<SetStateAction<string[]>>;
}
const DiaryBody: React.FC<DiaryBodyProps> = ({
  listSimulator,
  setListSimulator,
}) => {
  const { diary } = useStore();

  return (
    <div className={styles.container}>
      <DiaryList
        diary={diary}
        listSimulator={listSimulator}
        setListSimulator={setListSimulator}
      />
    </div>
  );
};

export default DiaryBody;
