import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import styles from "./styles/box.module.scss";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const currentChat = useSelector((state) => state.chat.user);
  const currentSender = useSelector((state) => state.sender.sender);

  const socket = useRef();

  useEffect(() => {
    if (currentSender) {
      socket.current = io("http://localhost:3001");
      socket.current.emit("add-user", currentSender._id);
    }
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/chat/getMessages", {
        from: currentSender._id,
        to: currentChat._id,
      })
      .then((response) => setMessages(response.data));
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
    console.log("arrived");
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <>
      {currentChat._id && (
        <div className={styles.box}>
          <ChatHeader />
          <ChatBody messages={messages} socket={socket} />
          <ChatFooter
            socket={socket}
            setMessages={setMessages}
            messages={messages}
          />
        </div>
      )}
    </>
  );
};

export default ChatBox;
