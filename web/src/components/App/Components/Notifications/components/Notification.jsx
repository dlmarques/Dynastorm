import React from "react";
import styles from "./notification.module.scss";

const Notification = ({ title, description, date }) => {
  const notificationDate = new Date(date).toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.notification}>
      <div style={{ paddingLeft: "10px" }}>
        <h3 style={{ fontSize: "18px" }}>{title}</h3>
        <p>{description}</p>
        {<span>{date && notificationDate}</span>}
      </div>
    </div>
  );
};

export default Notification;
