import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { notificationsActions } from "../../../../../store/ui/notifications";
import { BiArrowToLeft } from "react-icons/bi";
import styles from "./container.module.scss";
import Notification from "./Notification";
import { environment } from "../../../../../environment/environment";

const Container = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState();
  const isVisible = useSelector((state) => state.notifications.isVisible);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    axios
      .post(`${environment.apiUrl}/api/noti/getNotifications`, {
        token: token,
      })
      .then((response) => setNotifications(response.data));
    setTimeout(() => {
      dispatch(notificationsActions.deleteNotifications());
      const token = sessionStorage.getItem("authToken");
      axios.patch(`${environment.apiUrl}/api/noti/readNotification`, {
        token: token,
      });
    }, 5000);
  }, [isVisible]);

  const closeNotifications = () => dispatch(notificationsActions.close());

  return (
    <div
      className={
        isVisible
          ? styles.notificationsContainerActive
          : styles.notificationsContainer
      }
    >
      <div className={styles.icon}>
        <BiArrowToLeft onClick={() => closeNotifications} />
      </div>
      <div className={styles.notificationsContent}>
        {notifications &&
          isVisible &&
          notifications
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })
            .map((notification, id) => (
              <Notification
                key={id}
                title={notification.title}
                description={notification.description}
                date={notification.date}
              />
            ))}
      </div>
    </div>
  );
};

export default Container;
