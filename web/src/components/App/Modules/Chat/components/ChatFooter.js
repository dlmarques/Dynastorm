import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { sendMessageRoute } from "../../../../../utils/APIRoutes";
import styles from "./styles/footer.module.scss";

const ChatFooter = ({ socket, setMessages, messages }) => {
  const [message, setMessage] = useState("");
  const currentChat = useSelector((state) => state.chat.user);
  const currentSender = useSelector((state) => state.sender.sender);

  const handleSendMessage = async () => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentSender._id,
      message: message,
    });

    axios.post("http://localhost:3001/api/chat/addMessage", {
      from: currentSender._id,
      to: currentChat._id,
      message: message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: message });
    setMessages(msgs);
    setMessage("");
  };

  return (
    <div className={styles.footer}>
      <input
        type="text"
        placeholder="Write message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatFooter;
