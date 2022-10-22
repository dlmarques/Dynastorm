import React from "react";
import { useSelector } from "react-redux";
import Button from "../../Components/Button/Button";
import styles from "./settings.module.scss";

const Settings = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <div className={styles["settings-container"]}>
      <img src={user.avatar} alt="avatar" />

      <input
        type="text"
        id="username"
        name="username"
        value={`@${user.name}`}
        disabled
      />
      <span>Change your password</span>
      <div className={styles.passwords}>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="New Password"
        />
      </div>
      <Button btn="changePasswordBtn">Change password</Button>
      <span id={styles.delete}>Delete account</span>
    </div>
  );
};

export default Settings;
