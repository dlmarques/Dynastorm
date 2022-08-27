import React from "react";
import styles from "./main.module.scss";

const Main = ({ background }) => {
  return (
    <main
      className={background === "app" ? styles.mainApp : styles.mainAuth}
    ></main>
  );
};

export default Main;
