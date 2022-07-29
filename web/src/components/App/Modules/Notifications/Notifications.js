import React from "react";
import Notification from "./components/Notification";
import styles from "./notifications.module.scss";

const Notifications = () => {
  return (
    <div className={styles.container}>
      <Notification />
    </div>
  );
};

export default Notifications;
