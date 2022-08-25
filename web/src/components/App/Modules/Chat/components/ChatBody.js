import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./styles/body.scss";

const ChatBody = ({ messages }) => {
  const currentChat = useSelector((state) => state.chat.user);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="body">
      <div className="message__container">
        {messages &&
          messages.map((message) =>
            message.fromSelf ? (
              <div className="message__chats" key={message.id}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.message}</p>
                </div>
              </div>
            ) : (
              <div className="message__chats" key={message.id}>
                <p>{currentChat.username}</p>
                <div className="message__recipient">
                  <p>{message.message}</p>
                </div>
              </div>
            )
          )}
        <div ref={lastMessageRef} />
      </div>
    </div>
  );
};

export default ChatBody;
