import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { currentChatActions } from "../../../../../store/chat/currentChat";
import styles from "./styles/user.module.scss";

import Tooltip from "../../../Components/Tooltip/Tooltip";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const selectChat = () => {
    dispatch(currentChatActions.setChat(user));
  };

  return (
    <>
      <div className={styles.user} onClick={() => selectChat}>
        {user && (
          <>
            <img src={user.avatar} alt="avatar" /> <h4>{user.username}</h4>
          </>
        )}
      </div>
      <div className={styles.userMobile} onClick={() => selectChat}>
        {user && (
          <div
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            <img src={user.avatar} alt="avatar" /> <h4>{user.username}</h4>
            {isVisible && <Tooltip info={user.username} />}
          </div>
        )}
      </div>
    </>
  );
};

export default User;
