import useStore from "@/utils/store_provider";
import React from "react";
import styles from "./styles/ErrorMessageModal.module.css";
import Image from "next/image";
import close from "../../assets/images/close.png";

const ErrorMessageModal = () => {
  const { error, setError } = useStore();
  return (
    <div className={styles.container}>
      <div id={styles.modalHeader}>
        <div></div>
        <p>oops... Something went wrong!</p>
        <Image
          src={close}
          alt="close"
          width={40}
          height={40}
          onClick={() => setError(null)}
        />
      </div>
      <p className={styles.errMessage}>{error}</p>
    </div>
  );
};

export default ErrorMessageModal;
