import React from "react";
import "./notification.scss";

const Notification = ({ title, description, category, read, date }) => {
  return (
    <div className="notification">
      <img
        src={require(`../../../../../assets/notification/${category}.png`)}
        alt="notification"
      />
      <div className={read ? "text true" : "text false"}>
        <h3>{title}</h3>
        <p>{description}</p>
        <span>
          {date &&
            new Date(date).getHours() + ":" + new Date(date).getMinutes()}
        </span>
      </div>
    </div>
  );
};

export default Notification;
