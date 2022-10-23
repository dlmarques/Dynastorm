import React from "react";
import { Link } from "react-router-dom";
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
                <p className={styles.money}>OC{Math.floor(user.money)}</p>
              </span>
              <Link to="/app/settings">
                <img src={user && user.avatar} alt="avatar" />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
