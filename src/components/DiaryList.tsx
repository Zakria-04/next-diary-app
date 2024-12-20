import { DiaryListTypes } from "@/store/types";
import React, { SetStateAction, useState } from "react";
import styles from "./styles/DiaryList.module.css";
import NewDiaryModal from "./modals/NewDiaryModal";
import EmptyList from "./EmptyList";

interface DiaryListProps {
  diary: DiaryListTypes[];
  listSimulator: Array<string>;
  setListSimulator: React.Dispatch<SetStateAction<string[]>>;
}

const DiaryList: React.FC<DiaryListProps> = ({ diary, setListSimulator }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DiaryListTypes | undefined>(undefined);

  if (diary.length === 0) {
    return <EmptyList />;
  }

  const handleModifyClick = async (item: DiaryListTypes) => {
    setIsOpen(!isOpen);
    setSelectedItem(item);
  };

  const getSelectedLists = (id: string) => {
    setListSimulator((prevList) => {
      const isSelected = prevList.includes(id);
      if (isSelected) {
        return prevList.filter((listID) => listID !== id);
      } else {
        return [...prevList, id];
      }
    });
  };

  return (
    <div className={`${styles.container}`}>
      {diary.map((list) => (
        <div
          key={list._id}
          className={`${styles.listContainer} box-border box-bg`}
        >
          <div className={styles.listHeader}>
            <p>{list.timeStamp}</p>
            <input type="checkbox" onClick={() => getSelectedLists(list._id)} />
          </div>

          <div className={styles.titleHeader}>
            <p className={styles.listTitle}>Title : </p>
            <p className={styles.title}>{list.title}</p>
          </div>

          <label className={styles.listTitle}>Context :</label>
          <p>{list.context}</p>
          <div className={styles.modifyBtn}>
            <button onClick={() => handleModifyClick(list)}>Modify</button>
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
