import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import styles from "./Error.module.scss";
import { alertActions } from "../../../../store/ui/alert";

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.alert);

  const closeAlert = () => {
    dispatch(alertActions.deleteAlert());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.errorContainer}>
        <h1>{alert && alert.title}</h1>
        <h2>{alert && alert.message}!</h2>
        <Button btn="errorBtn" onClick={closeAlert}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Alert;
