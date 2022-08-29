import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Notifications from "../../../App/Components/Notifications/Notifications";
import styles from "./profile.module.scss";
import { convert } from "../../../../utils/numbersConvert";
import Tooltip from "../../../App/Components/Tooltip/Tooltip";

const Profile = () => {
  const [isVisible, setIsVisible] = useState();
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/app/home" && (
        <div className={styles.profile}>
          {user && (
            <>
              {<Notifications />}
              <div className={styles.info}>
                <span>
                  <p
                    onMouseEnter={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}
                    className={styles.money}
                  >
                    ${convert(user.money, 0)}
                  </p>
                  {isVisible && <Tooltip info={`$${user.money}`} />}
                </span>
                {location.pathname !== "/app/home" && (
                  <img src={user && user.avatar} alt="avatar" />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
