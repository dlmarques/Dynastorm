import React from "react";
import styles from "./sidebar.module.scss";
import { logout } from "../../../store/auth/thunk";

import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";

const Sidebar = ({ children, app }) => {
  const dispatch = useDispatch();

  const endSession = () => {
    logout(dispatch);
  };

  return (
    <div className={app ? styles.appSidebar : styles.sidebar}>
      <header>
        <h2 data-testid="logo">Omenia</h2>
        {app && <MdOutlineLogout onClick={() => endSession()} />}
      </header>
      {children && children}
      <p>© 2022 dlmarques</p>
    </div>
  );
};

export default Sidebar;
