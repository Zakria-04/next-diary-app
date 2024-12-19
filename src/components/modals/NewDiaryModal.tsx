import React, { SetStateAction, useState } from "react";
import styles from "./styles/NewDiaryModal.module.css";
import { DiaryListTypes } from "@/store/types";
import useStore from "@/utils/store_provider";
import { createDiaryToDB } from "@/res/api";

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
  const { diary, setDiary, setError, user } = useStore();

  const [inputs, setInputs] = useState<DiaryListTypes>({
    _id: selectedItem?._id || "",
    authID: user?._id || "67600408208d7881b85b4523",
    title: selectedItem?.title || "",
    context: selectedItem?.context || "",
  });

  const handleInputsChange = (key: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDiarySubmitBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // add the new generated diary to the db
    try {
      setError(null);
      const response = await createDiaryToDB(inputs);
      const updateDiaryList = [response.diary, ...diary];
      setDiary(updateDiaryList);
      setIsOpen(false);
    } catch (error: unknown) {
      const errMessage =
        error instanceof Error
          ? JSON.parse(error.message)
          : "An unknown error occurred";
      setError(errMessage.errorMsg);
      console.log("err from errMsg", error);
    }
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
            required
          />
        </div>
        <label>My Story:</label>
        <textarea
          value={inputs.context}
          onChange={(e) => handleInputsChange("context", e.target.value)}
          required
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
