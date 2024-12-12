import React, { SetStateAction } from "react";
import styles from "./styles/ModifyModal.module.css";
import NewDiaryModal from "./NewDiaryModal";

interface ModifyModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ModifyModal: React.FC<ModifyModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className={styles.container}>
      {/* <NewDiaryModal isOpen={isOpen} setIsOpen={setIsOpen} direction="modify" /> */}
    </div>
  );
};

export default ModifyModal;
