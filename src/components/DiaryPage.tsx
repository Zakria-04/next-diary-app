"use client";
import React, { useState } from "react";
import DiaryHeader from "./DiaryHeader";
import DiaryBody from "./DiaryBody";
import useStore from "@/utils/store_provider";
import ErrorMessageModal from "./modals/ErrorMessageModal";

const DiaryPage = () => {
  const [listSimulator, setListSimulator] = useState<string[]>([]);
  const { error } = useStore();
  return (
    <>
      <DiaryHeader
        listSimulator={listSimulator}
        setListSimulator={setListSimulator}
      />
      <DiaryBody
        listSimulator={listSimulator}
        setListSimulator={setListSimulator}
      />

      {/* error modal component */}
      {error !== null && <ErrorMessageModal />}
    </>
  );
};

export default DiaryPage;
