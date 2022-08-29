import React, { useEffect } from "react";

import styles from "./chat.module.scss";
import UsersList from "./components/UsersList";
import ChatBox from "./components/ChatBox";
import { useDispatch } from "react-redux";
import { currentChatActions } from "../../../../store/chat/currentChat";

const Chat = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(currentChatActions.unselectChat());
    };
  }, []);
  return (
    <div className={styles.chat}>
      <UsersList />
      <ChatBox />
    </div>
  );
};

export default Chat;
