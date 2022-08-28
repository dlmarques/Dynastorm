import React from "react";
import styles from "./notifications.module.scss";

import { IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { notificationsActions } from "../../../../store/ui/notifications";

const Notifications = () => {
  const dispatch = useDispatch();
  const newNotifications = useSelector(
    (state) => state.notifications.newNotifications
  );
  const isVisible = useSelector((state) => state.notifications.isVisible);

  const toggleNotifications = () => {
    const token = localStorage.getItem("authToken");
    if (isVisible) {
      dispatch(notificationsActions.close());
    } else {
      dispatch(notificationsActions.open());
    }
    async function readNotifications() {
      axios.patch("http://localhost:3001/api/noti/readNotification", {
        token,
      });
      dispatch(notificationsActions.read());
    }
    setTimeout(readNotifications, 3000);
  };

  return (
    <div className={styles.notifications}>
      <IoIosNotifications onClick={toggleNotifications} />
      {newNotifications && <div className={styles.redDot}></div>}
    </div>
  );
};

export default Notifications;
