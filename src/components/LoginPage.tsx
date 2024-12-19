"use client";
import React, { useState } from "react";
import Header from "./Header";
import LoginRegister from "./LoginRegister";

const LoginPage = () => {
  const [needTestAccount, setNeedTestAccount] = useState<boolean>(false);
  return (
    <>
      <Header
        needTestAccount={needTestAccount}
        setNeedTestAccount={setNeedTestAccount}
        status="login"
      />
      <LoginRegister
        status="login"
        needTestAccount={needTestAccount}
        setNeedTestAccount={setNeedTestAccount}
      />
    </>
  );
};

export default LoginPage;
