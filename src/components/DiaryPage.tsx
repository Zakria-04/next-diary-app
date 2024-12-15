"use client";
import React, { useState } from "react";
import DiaryHeader from "./DiaryHeader";
import DiaryBody from "./DiaryBody";

const DiaryPage = () => {
  const [listSimulator, setListSimulator] = useState<string[]>([]);
  return (
    <>
      <DiaryHeader listSimulator={listSimulator} setListSimulator={setListSimulator} />
      <DiaryBody
        listSimulator={listSimulator}
        setListSimulator={setListSimulator}
      />
    </>
  );
};

export default DiaryPage;
