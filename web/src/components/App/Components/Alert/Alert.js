import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import styles from "./alert.module.scss";
import { alertActions } from "../../../../store/ui/alert";

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.alert);

  const closeAlert = () => {
    dispatch(alertActions.deleteAlert());
  };

  return (
    <div className={styles.errorContainer}>
      <h2>{alert && alert.message}.</h2>
      <Button btn="errorBtn" onClick={closeAlert}>
        Close
      </Button>
    </div>
  );
};

export default Alert;
