import React from "react";
import styles from "./modal.module.scss";

const Modal = ({ title, message }) => {
  return (
    <div className={styles.modal}>
      <h1>{title}</h1>
      <h2>{message}</h2>
    </div>
  );
};

export default Modal;
