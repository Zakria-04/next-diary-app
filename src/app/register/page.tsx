import Header from "@/components/Header";
import LoginRegister from "@/components/LoginRegister";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <LoginRegister status="register" />
    </div>
  );
};

export default page;
