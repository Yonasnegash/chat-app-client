import React from "react";

const ChatInputSection = ({
  inputValue,
  setInputValue,
  setFile,
  sendMessage,
}) => {
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="chat-input-section">
      <input
        type="text"
        placeholder="Type your message..."
        className="chat-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatInputSection;
