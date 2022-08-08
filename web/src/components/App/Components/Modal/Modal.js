import React from "react";
import { useSelector } from "react-redux";
import styles from "./modal.module.scss";

const Modal = () => {
  const modal = useSelector((state) => state.modal.modal);
  return (
    <div className={styles.modal}>
      <h1>{modal.title}</h1>
      <h2>{modal.message}</h2>
    </div>
  );
};

export default Modal;
