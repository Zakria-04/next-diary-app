import { DiaryListTypes } from "@/store/types";
import React, { SetStateAction, useState } from "react";
import styles from "./styles/DiaryList.module.css";
import ModifyModal from "./modals/ModifyModal";
import NewDiaryModal from "./modals/NewDiaryModal";
import useStore from "@/utils/store_provider";

interface DiaryListProps {
  diary: DiaryListTypes[];
  listSimulator: Array<string>;
  setListSimulator: React.Dispatch<SetStateAction<string[]>>;
}

const DiaryList: React.FC<DiaryListProps> = ({
  diary,
  listSimulator,
  setListSimulator,
}) => {
  const { setDiary } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | DiaryListTypes>(null);

  const handleModifyClick = (item: DiaryListTypes) => {
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
    console.log(listSimulator);
  };

  return (
    <div className={`${styles.container}`}>
      {diary.map((list, index) => (
        <div
          key={index}
          className={`${styles.listContainer} box-border box-bg`}
        >
          <div className={styles.listHeader}>
            <p>{list.timeStamp}</p>
            <input type="checkbox" onClick={() => getSelectedLists(list._id)} />
          </div>

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
