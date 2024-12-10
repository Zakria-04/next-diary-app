import Header from "@/components/Header";
import LoginRegister from "@/components/LoginRegister";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <LoginRegister status="login" />
    </>
  );
};

export default page;
