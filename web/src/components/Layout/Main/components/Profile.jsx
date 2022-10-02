import React from "react";
import { useSelector } from "react-redux";
import Notifications from "../../../App/Components/Notifications/Notifications";
import styles from "./profile.module.scss";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div className={styles.profile}>
        {user && (
          <>
            <Notifications />
            <div className={styles.info}>
              <span>
                <p className={styles.money}>${Math.floor(user.money)}</p>
              </span>

              <img src={user && user.avatar} alt="avatar" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
