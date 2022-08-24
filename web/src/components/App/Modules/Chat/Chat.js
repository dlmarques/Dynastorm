import React from "react";

import styles from "./chat.module.scss";
import UsersList from "./components/UsersList";
import ChatBox from "./components/ChatBox";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <UsersList />
      <ChatBox />
    </div>
  );
};

export default Chat;
