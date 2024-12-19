"use client";
import React, { useEffect, useState } from "react";
import DiaryHeader from "./DiaryHeader";
import DiaryBody from "./DiaryBody";
import useStore from "@/utils/store_provider";
import ErrorMessageModal from "./modals/ErrorMessageModal";
import { redirect } from "next/navigation";
import { getUserDiaryFromDB } from "@/res/api";

const DiaryPage = () => {
  const [listSimulator, setListSimulator] = useState<string[]>([]);
  const { error, auth, user, getUserDiary, diary } = useStore();

  // check if user is logged in otherwise back to login page
  useEffect(() => {
    if (!auth || user === null) {
      redirect("/login");
    }
  }, [auth, user]);

  // get all user diary on mount
  useEffect(() => {
    getUserDiary();
  }, []);

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
