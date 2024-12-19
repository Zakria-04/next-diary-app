"use client";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
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
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const binVisible = useMemo(() => listSimulator.length > 0, [listSimulator]);

  const deleteSelectedItems = async () => {
    setIsDeleteClicked(true);
    const filterDiaryList = diary.filter(
      (li) => !listSimulator.includes(li._id)
    );
    setDiary(filterDiaryList);
    try {
      await deleteDiaryFromDB({
        diaryIDs: listSimulator,
        authID: user?._id,
      });
    } catch (error) {
      const errMessage =
        error instanceof Error
          ? JSON.parse(error.message)
          : "An unknown error occurred";
      setError(errMessage.error);
    }
    setListSimulator([]);
    setIsDeleteClicked(false);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.binBtn}
        onClick={deleteSelectedItems}
        disabled={listSimulator.length === 0 ? true : isDeleteClicked}
      >
        <Image
          className={binVisible ? styles.binVisible : styles.binHidden}
          src={bin}
          alt="delete"
          width={35}
          height={35}
        />
      </button>
      <button className={styles.newDiaryBtn} onClick={() => setIsOpen(!isOpen)}>
        Share New Story
      </button>
      {isOpen && <NewDiaryModal setIsOpen={setIsOpen} direction="create" />}
    </div>
  );
};

export default DiaryHeader;
