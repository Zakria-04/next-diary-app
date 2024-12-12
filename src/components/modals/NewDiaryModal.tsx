import React, { SetStateAction, useRef, useState } from "react";
import styles from "./styles/NewDiaryModal.module.css";
import { DiaryListTypes } from "@/store/types";
import useStore from "@/utils/store_provider";

interface NewDiaryModalProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  direction: "modify" | "create";
  selectedItem?: DiaryListTypes | null;
}

const NewDiaryModal: React.FC<NewDiaryModalProps> = ({
  setIsOpen,
  direction,
  selectedItem,
}) => {
  const { diary, setDiary } = useStore();

  const getDate = new Date();
  const day = getDate.getDate();
  const month = getDate.getMonth() + 1;
  const year = getDate.getFullYear();

  const fullDate = `${day},${month},${year}`;

  const [inputs, setInputs] = useState<DiaryListTypes>({
    _id: selectedItem?._id || "6",
    title: selectedItem?.title || "",
    context: selectedItem?.context || "",
    timeStamp: fullDate,
  });

  const handleInputsChange = (key: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDiarySubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateDiaryList = [inputs, ...diary];
    setDiary(updateDiaryList);
    setIsOpen(false);
  };

  const handleUpdatedInputs = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const list = diary.find((doc) => doc._id === selectedItem?._id);

    if (list) {
      list.title = inputs.title || list.title;
      list.context = inputs.context || list.context;
    }

    setIsOpen(false);
  };

  return (
    <div className={styles.overlay}>
      <form
        onSubmit={
          direction === "create" ? handleDiarySubmitBtn : handleUpdatedInputs
        }
        className={`${styles.container} box-bg`}
      >
        <p className={styles.headerTitle}>
          *---------{direction === "modify" ? "Modify" : "Create New List"}
          ----------*
        </p>
        <div className={styles.titleInputContainer}>
          <label>Title:</label>
          <input
            value={inputs.title}
            type="text"
            onChange={(e) => handleInputsChange("title", e.target.value)}
          />
        </div>
        <label>My Story:</label>
        <textarea
          value={inputs.context}
          onChange={(e) => handleInputsChange("context", e.target.value)}
        ></textarea>
        <div className={styles.btnControls}>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button>{direction === "create" ? "Add" : "Update"}</button>
        </div>
      </form>
    </div>
  );
};

export default NewDiaryModal;
