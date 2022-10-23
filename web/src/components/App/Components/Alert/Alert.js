import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./alert.module.scss";
import { alertActions } from "../../../../store/ui/alert";

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.alert);

  const closeAlert = () => {
    dispatch(alertActions.deleteAlert());
  };

  const confirm = () => {
    dispatch(alertActions.confirm());
  };

  console.log(alert);
  return (
    <div className={styles.errorContainer}>
      <h2>{alert && alert.message}</h2>
      <div className={styles.buttons}>
        <button class={styles.btn} onClick={() => closeAlert()}>
          Close
        </button>
        {alert.confirm && (
          <button class={styles.btn} onClick={() => confirm()}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
