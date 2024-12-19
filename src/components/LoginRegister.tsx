"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import styles from "./styles/LoginRegister.module.css";
import { createUserToDB, loginUserFromDB } from "@/res/api";
import useStore from "@/utils/store_provider";
import { redirect } from "next/navigation";

interface LoginRegisterProps {
  status: "login" | "register";
  needTestAccount?: boolean;
  setNeedTestAccount?: React.Dispatch<SetStateAction<boolean>>;
}

type InputForm = {
  userName: string;
  userPass: string;
  email: string;
};

const LoginRegister: React.FC<LoginRegisterProps> = ({
  status,
  needTestAccount,
}) => {
  const { setUser, auth, setAuth, user } = useStore();
  const [inputsError, setInputsError] = useState<{
    type?: string;
    error?: string;
    errorMsg?: string;
  }>({});

  useEffect(() => {
    if (user === null) {
      setAuth(false);
    }
    if (auth && user !== null) {
      redirect("/home");
    }
  }, [auth, user]);

  const [inputs, setInputs] = useState<InputForm>({
    userName: "",
    email: "",
    userPass: "",
  });

  useEffect(() => {
    if (needTestAccount) {
      setInputs({
        userName: "testing_account",
        userPass: "test123456789",
        email: "",
      });
    } else {
      setInputs({
        userName: "",
        userPass: "",
        email: "",
      });
    }
  }, [needTestAccount]);

  const handleInputsChange = (key: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const apiFunction = status === "login" ? loginUserFromDB : createUserToDB;
      const response = await apiFunction(inputs);
      if (response) {
        console.log("user logged in sucsusfully!");
        setUser(response.user);
        setAuth(true);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? JSON.parse(error.message)
          : "An unknown error occurred";
      setInputsError(errorMessage);
    }
  };

  // render texts based on status => "login or register"
  const buttonText = status === "login" ? "Login" : "Create New Account";
  const toggleText =
    status === "login" ? "not a member yet?" : "already a member?";
  const toggleLinkText = status === "login" ? "register" : "login";
  const toggleLinkHref = status === "login" ? "/register" : "/login";
  const userNameText = status === "login" ? "User Name" : "User Name or Email";

  // input error messages
  const notUserError = inputsError.type === "notUser" ? styles.inputError : "";
  const wrongPass = inputsError.type === "password" ? styles.inputError : "";

  return (
    <form id={styles.formContainer} onSubmit={handleFormSubmit}>
      <label htmlFor="userName">{userNameText}</label>
      <input
        className={`${notUserError}`}
        type="text"
        value={inputs.userName}
        onChange={(e) => handleInputsChange("userName", e.target.value)}
        onInput={() => setInputsError({})}
        required
      />
      {status === "login" ? (
        <p className={styles.errorText}>
          {inputsError.type === "notUser" && inputsError.error}
        </p>
      ) : (
        <p></p>
      )}

      {status === "register" && (
        <>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={inputs.email}
            onChange={(e) => handleInputsChange("email", e.target.value)}
            onInput={() => setInputsError({})}
          />
          <p></p>
        </>
      )}

      <label htmlFor="password">Password</label>
      <input
        className={`${wrongPass || notUserError}`}
        type="password"
        value={inputs.userPass}
        onChange={(e) => handleInputsChange("userPass", e.target.value)}
        onInput={() => setInputsError({})}
        required
      />
      {status === "login" ? (
        <p className={styles.errorText}>
          {inputsError.type === "password" || inputsError.type === "notUser"
            ? inputsError.error
            : ""}
        </p>
      ) : (
        <p className={styles.errorText}>{inputsError.errorMsg}</p>
      )}
      <button>{buttonText}</button>
      <p id={styles.linkText}>
        {toggleText}{" "}
        <a href={toggleLinkHref} onClick={() => setInputsError({})}>
          {toggleLinkText}
        </a>
      </p>
    </form>
  );
};

export default LoginRegister;
