import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInputSection from "./ChatInputSection";
import useWebSocket from "../hooks/useWebSocket";
import "../App.css";

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);

  const { ws } = useWebSocket(setMessages); // Remove connectWebSocket destructuring

  const sendMessage = async () => {
    if (inputValue.trim() === "" && !file) return;

    const formData = new FormData();
    formData.append("username", "User"); // Replace with actual username
    if (inputValue.trim() !== "") {
      formData.append("message", inputValue);
    }
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Content uploaded:", data.chatMessage);
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(data.chatMessage));
      }
    } catch (error) {
      console.error("Error sending content:", error);
    } finally {
      setInputValue("");
      setFile(null);
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatHistory messages={messages} />
      <ChatInputSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        file={file}
        setFile={setFile}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatContainer;
