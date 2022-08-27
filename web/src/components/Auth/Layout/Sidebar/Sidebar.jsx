import React from "react";
import styles from "./sidebar.module.scss";

const Sidebar = ({ children }) => {
  return (
    <div className={styles.sidebar}>
      <h2>Dynastorm</h2>
      {children && children}
      <p>© 2022 dlmarques</p>
    </div>
  );
};

export default Sidebar;
