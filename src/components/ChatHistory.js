import React from "react";
import Message from "./Message";

const ChatHistory = ({ messages }) => {
  return (
    <div className="chat-history">
      {messages.map((msg) => (
        <Message key={msg._id} message={msg} />
      ))}
    </div>
  );
};

export default ChatHistory;
