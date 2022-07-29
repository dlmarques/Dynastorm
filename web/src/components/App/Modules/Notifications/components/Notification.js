import React from "react";
import styles from "./notification.module.scss";

const Notification = () => {
  return (
    <div className={styles.notification}>
      <img src="" alt="notification" />
      <div className={styles.text}>
        <h3>Title</h3>
        <p>Description</p>
      </div>
    </div>
  );
};

export default Notification;
