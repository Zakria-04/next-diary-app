import React, { SetStateAction } from "react";
import styles from "./styles/NewDiaryModal.module.css";

interface NewDiaryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const NewDiaryModal: React.FC<NewDiaryModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <form className={styles.container}>
      <div className={styles.titleInputContainer}>
        <label>Title:</label>
        <input type="text" />
      </div>
      <label>My Story:</label>
      <textarea></textarea>

      <div className={styles.btnControls}>
        <button onClick={() => setIsOpen(!isOpen)}>Cancel</button>
        <button>Add</button>
      </div>
    </form>
  );
};

export default NewDiaryModal;
