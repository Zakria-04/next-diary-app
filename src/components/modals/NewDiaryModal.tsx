import React, { SetStateAction } from "react";
import styles from "./styles/NewDiaryModal.module.css";

interface NewDiaryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const NewDiaryModal: React.FC<NewDiaryModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className={styles.overlay}>
      <form className={`${styles.container} box-bg`}>
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
    </div>
  );
};

export default NewDiaryModal;
