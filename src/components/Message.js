import React from "react";

const Message = ({ message }) => {
  return (
    <div
      className={
        message.username === "User"
          ? "message-from-user"
          : "message-from-friend"
      }
    >
      {message.message}
      {message.fileLink && (
        <a href={message.fileLink} target="_blank" rel="noopener noreferrer">
          {message.fileLink}
        </a>
      )}
    </div>
  );
};

export default Message;
