import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import styles from "./Error.module.scss";
import { errorActions } from "../../../../store/ui/error";

const Error = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error.error);

  const deleteError = () => {
    dispatch(errorActions.deleteError());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.errorContainer}>
        <h1>Error</h1>
        <h2>{error && error}!</h2>
        <Button btn="errorBtn" onClick={deleteError}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Error;
