import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles/footer.module.scss";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const currentChat = useSelector((state) => state.chat.user);
  const handleSendMessage = (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", {
        message: message,
        sender: token,
        receiver: currentChat.id,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  return (
    <div className={styles.footer}>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatFooter;
