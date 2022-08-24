import React, { useEffect, useState, useRef } from "react";
import socketIO from "socket.io-client";
import axios from "axios";

import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import styles from "./styles/box.module.scss";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const socket = socketIO.connect("http://localhost:3001");

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
    console.log(messages);
  }, [socket, messages]);

  return (
    <div className={styles.box}>
      <ChatHeader />
      <ChatBody messages={messages} />
      <ChatFooter socket={socket} />
    </div>
  );
};

export default ChatBox;
