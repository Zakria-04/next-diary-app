"use client";
import React, { useState } from "react";
import styles from "./styles/EmptyList.module.css";
import NewDiaryModal from "./modals/NewDiaryModal";

const EmptyList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${styles.container} text-color`}>
      <div className={styles.emptyText}>
        <h1>You don&apos;t have any diaries yet!</h1>
        <p className="text-color">
          Start capturing your thoughts, dreams, and memories today. Click the
          button
          <br /> below to create your first diary entry!
        </p>
        <button onClick={() => setIsOpen(true)} className={styles.button}>
          Create New Diary
        </button>
      </div>

      {/* new diary modal*/}
      {isOpen && <NewDiaryModal direction="create" setIsOpen={setIsOpen} />}
    </div>
  );
};

export default EmptyList;
