import React from "react";

import { useDispatch } from "react-redux";
import { currentChatActions } from "../../../../../store/chat/currentChat";
import styles from "./styles/user.module.scss";

const User = ({ user }) => {
  const dispatch = useDispatch();

  const selectChat = () => {
    dispatch(currentChatActions.setChat(user));
  };

  return (
    <div className={styles.user} onClick={selectChat}>
      {user && (
        <>
          <img src={user.avatar} alt="avatar" /> <h4>{user.username}</h4>
        </>
      )}
    </div>
  );
};

export default User;
