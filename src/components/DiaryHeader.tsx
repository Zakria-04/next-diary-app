"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import NewDiaryModal from "./modals/NewDiaryModal";
import styles from "./styles/DiaryHeader.module.css";
import Image from "next/image";
import bin from "../assets/images/bin.png";
import useStore from "@/utils/store_provider";
import { deleteDiaryFromDB } from "@/res/api";

interface DiaryHeaderProps {
  listSimulator: Array<string>;
  setListSimulator: React.Dispatch<SetStateAction<string[]>>;
}

const DiaryHeader: React.FC<DiaryHeaderProps> = ({
  listSimulator,
  setListSimulator,
}) => {
  const { diary, setDiary, setError, user } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const deleteSelectedItems = async () => {
    for (let i = 0; i < listSimulator.length; i++) {
      const getIndexOfList = diary.findIndex(
        (id) => id._id === listSimulator[i]
      );

      if (getIndexOfList !== -1) {
        let list = diary;
        list.splice(getIndexOfList, 1);
        setDiary(list);
      }
    }
    try {
      const response = await deleteDiaryFromDB({
        diaryIDs: listSimulator,
        authID: user?._id,
      });
      return response;
    } catch (error) {
      const errMessage =
        error instanceof Error
          ? JSON.parse(error.message)
          : "An unknown error occurred";
      setError(errMessage.error);
    }
    setListSimulator([]);
  };

  return (
    <div className={styles.container}>
      <Image
        className={
          listSimulator.length > 0 ? styles.binVisible : styles.binHidden
        }
        src={bin}
        alt="delete"
        width={35}
        height={35}
        onClick={deleteSelectedItems}
      />
      <button className={styles.newDiaryBtn} onClick={() => setIsOpen(!isOpen)}>
        Share New Story
      </button>
      {isOpen && <NewDiaryModal setIsOpen={setIsOpen} direction="create" />}
    </div>
  );
};

export default DiaryHeader;
