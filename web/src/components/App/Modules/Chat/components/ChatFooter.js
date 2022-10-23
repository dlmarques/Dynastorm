import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/footer.module.scss";
import { currentChatActions } from "../../../../../store/chat/currentChat";
import { FiSend } from "react-icons/fi";
import { environment } from "../../../../../environment/environment";

const ChatFooter = ({ socket, setMessages, messages }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const currentChat = useSelector((state) => state.chat.user);
  const currentSender = useSelector((state) => state.sender.sender);

  const handleSendMessage = async () => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentSender._id,
      message: message,
    });

    axios.post(`${environment.apiUrl}/api/chat/addMessage`, {
      from: currentSender._id,
      to: currentChat._id,
      message: message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: message });
    setMessages(msgs);
    dispatch(currentChatActions.sendMessage());
    setMessage("");
  };
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.footer}>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Write message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeypress}
        />
        <button type="button" onClick={() => handleSendMessage}>
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatFooter;
