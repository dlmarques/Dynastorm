import React, { useEffect, useState } from "react";
import Notification from "./components/Notification";
import styles from "./notifications.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { notificationsActions } from "../../../../store/ui/notifications";
import axios from "axios";

const Notifications = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .post("http://localhost:3001/api/noti/getNotifications", {
        token: token,
      })
      .then((response) => setNotifications(response.data));
    setTimeout(() => {
      dispatch(notificationsActions.deleteNotifications());
      const token = localStorage.getItem("authToken");
      axios.patch("http://localhost:3001/api/noti/readNotification", {
        token: token,
      });
    }, 3000);
  }, []);

  return (
    <div className={styles.container}>
      {notifications &&
        notifications
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
          .map((notification, id) => (
            <Notification
              key={id}
              title={notification.title}
              description={notification.description}
              category={notification.category}
              read={notification.read}
            />
          ))}
    </div>
  );
};

export default Notifications;
