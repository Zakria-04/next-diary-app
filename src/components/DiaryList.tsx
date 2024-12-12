import { DiaryListTypes } from "@/store/types";
import React, { useState } from "react";
import styles from "./styles/DiaryList.module.css";
import ModifyModal from "./modals/ModifyModal";
import NewDiaryModal from "./modals/NewDiaryModal";

interface DiaryListProps {
  diary: DiaryListTypes[];
}

const DiaryList: React.FC<DiaryListProps> = ({ diary }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | DiaryListTypes>(null);

  const handleModifyClick = (item: DiaryListTypes) => {
    setIsOpen(!isOpen);
    setSelectedItem(item);
  };

  return (
    <div className={`${styles.container}`}>
      {diary.map((list, index) => (
        <div
          key={index}
          className={`${styles.listContainer} box-border box-bg`}
        >
          <p>title : {list.title}</p>
          <label>context :</label>
          <p>{list.context}</p>
          <div className={styles.modifyBtn}>
            <button onClick={() => handleModifyClick(list)}>modify</button>
          </div>
        </div>
      ))}
      {isOpen && (
        <NewDiaryModal
          setIsOpen={setIsOpen}
          direction="modify"
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default DiaryList;
