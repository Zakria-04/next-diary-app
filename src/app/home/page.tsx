import DiaryBody from "@/components/DiaryBody";
import DiaryHeader from "@/components/DiaryHeader";
import DiaryPage from "@/components/DiaryPage";
import Header from "@/components/Header";
import React from "react";

const page = () => {
  let listSimulator: Array<string> = [];
  return (
    <>
      <Header />
      <DiaryPage />
    </>
  );
};

export default page;
