import DiaryBody from "@/components/DiaryBody";
import DiaryHeader from "@/components/DiaryHeader";
import Header from "@/components/Header";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <DiaryHeader />
      <DiaryBody />
    </>
  );
};

export default page;
