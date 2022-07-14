import React from "react";
import styles from "./header.module.scss";

import { useDispatch } from "react-redux";

const Header = (props) => {
  const dispatch = useDispatch();

  return (
    <header className={styles.topbar}>
      <h1 className={styles.logo}>{props.title}</h1>
      {props.user && (
        <div className={styles.menu}>
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
