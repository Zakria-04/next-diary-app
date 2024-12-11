"use client";
import React, { useState } from "react";
import NewDiaryModal from "./modals/NewDiaryModal";
import styles from "./styles/DiaryHeader.module.css"

const DiaryHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button className={styles.newDiaryBtn} onClick={() => setIsOpen(!isOpen)}>Share New Story</button>
      {isOpen && <NewDiaryModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default DiaryHeader;
