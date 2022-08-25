import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles/header.module.scss";

const ChatHeader = () => {
  const currentChat = useSelector((state) => state.chat.user);
  return (
    <div className={styles.header}>
      <h3>@{currentChat && currentChat.username}</h3>
    </div>
  );
};

export default ChatHeader;
