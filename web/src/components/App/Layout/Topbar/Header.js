import React from "react";
import styles from "./header.module.scss";

import { IoIosNotifications } from "react-icons/io";
import Notifications from "../../Modules/Notifications/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { notificationsActions } from "../../../../store/ui/notifications";
import axios from "axios";

const Header = (props) => {
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
        token: token,
      });
      dispatch(notificationsActions.read());
    }
    setTimeout(readNotifications, 3000);
  };

  return (
    <header className={styles.topbar}>
      <h1 className={styles.logo}>{props.title}</h1>
      {props.user && (
        <div className={styles.menu}>
          <div className={styles.notifications}>
            <IoIosNotifications onClick={toggleNotifications} />
            {isVisible && <Notifications />}
            {newNotifications && <div className={styles.dot}></div>}
          </div>
          <img src={props.user.avatar} alt="avatar in game" />
          <div className={styles["menu-id"]}>
            <span>{props.user.name}</span>
            <span>${props.user.money}</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
