import React from "react";
import "./notification.scss";

const Notification = ({ title, description, category, read }) => {
  return (
    <div className="notification">
      <img
        src={require(`../../../../../assets/notification/${category}.png`)}
        alt="notification"
      />
      <div className={read ? "text true" : "text false"}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Notification;
