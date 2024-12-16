"use client";
import React, { useRef, useState } from "react";
import styles from "./styles/LoginRegister.module.css";
import { loginUserFromDB } from "@/res/api";
import useStore from "@/utils/store_provider";
import { errorMessage } from "@/utils/errorMessage";

interface LoginRegisterProps {
  status: "login" | "register";
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ status }) => {
  const { user, setUser } = useStore();
  const [inputsError, setInputsError] = useState({});

  const inputsRef = useRef({
    userName: "",
    email: "",
    userPass: "",
  });

  const handleInputsChange = (key: string, value: string) => {
    inputsRef.current = {
      ...inputsRef.current,
      [key]: value,
    };
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUserFromDB(inputsRef.current);
      if (response) {
        console.log("user logged in sucsusfully", response);
        setUser(response.user);
      }
    } catch (error: any) {
      const errorMessage = JSON.parse(error.message);
      setInputsError(errorMessage);
    }
  };

  // render texts based on status => "login or register"
  const buttonText = status === "login" ? "Login" : "Create New Account";
  const toggleText = status === "login" ? "not a member?" : "already a member?";
  const toggleLinkText = status === "login" ? "register" : "login";
  const toggleLinkHref = status === "login" ? "/register" : "/login";
  const userNameText = status === "login" ? "User Name" : "User Name or Email";

  return (
    <form id={styles.formContainer} onSubmit={handleFormSubmit}>
      <label htmlFor="userName">{userNameText}</label>
      <input
        type="text"
        onChange={(e) => handleInputsChange("userName", e.target.value)}
      />

      {status === "register" && (
        <>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={(e) => handleInputsChange("email", e.target.value)}
          />
        </>
      )}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        onChange={(e) => handleInputsChange("userPass", e.target.value)}
      />

      <button>{buttonText}</button>
      <p>
        {toggleText} <a href={toggleLinkHref}>{toggleLinkText}</a>
      </p>
    </form>
  );
};

export default LoginRegister;
