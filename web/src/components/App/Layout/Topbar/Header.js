import React from "react";
import styles from "./header.module.scss";

import { IoIosNotifications } from "react-icons/io";
import Notifications from "../../Modules/Notifications/Notifications";
const Header = (props) => {
  return (
    <header className={styles.topbar}>
      <h1 className={styles.logo}>{props.title}</h1>
      {props.user && (
        <div className={styles.menu}>
          <div className={styles.notifications}>
            <IoIosNotifications />
            <Notifications />
            <div className={styles.dot}></div>
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
