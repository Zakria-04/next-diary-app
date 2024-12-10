"use client";
import React, { useRef } from "react";
import styles from "./styles/LoginRegister.module.css";

interface LoginRegisterProps {
  status: "login" | "register";
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ status }) => {
  const inputsRef = useRef({
    userName: "",
    email: "",
    password: "",
  });

  const buttonText = status === "login" ? "Login" : "Create New Account";
  const toggleText = status === "login" ? "not a member?" : "already a member?";
  const toggleLinkText = status === "login" ? "register" : "login";
  const toggleLinkHref = status === "login" ? "/register" : "/login";
  const userNameText = status === "login" ? "User Name" : "User Name or Email";
  return (
    <form id={styles.formContainer}>
      <label htmlFor="userName">{userNameText}</label>
      <input id="userName" type="text" />

      {status === "register" && (
        <>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" />
        </>
      )}

      <label htmlFor="password">Password</label>
      <input id="password" type="password" />

      <button>{buttonText}</button>
      <p>
        {toggleText} <a href={toggleLinkHref}>{toggleLinkText}</a>
      </p>
    </form>
  );
};

export default LoginRegister;
