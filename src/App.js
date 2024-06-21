import React, { useState, useEffect, useRef, useCallback } from "react";

import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const ws = useRef(null);

  const connectWebSocket = useCallback(() => {
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    ws.current.onmessage = (event) => {
      const newMessages = JSON.parse(event.data);
      setMessages((prevMessages) => {
        const uniqueMessages = [
          ...prevMessages,
          ...newMessages.filter(
            (msg) => !prevMessages.some((m) => m._id === msg._id)
          ),
        ];
        return uniqueMessages;
      });
    };

    ws.current.onclose = (event) => {
      console.log(`WebSocket closed: ${event.code}, Reason: ${event.reason}`);
      // Reconnect after a delay
      setTimeout(connectWebSocket, 3000);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error: ", error);
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connectWebSocket]);

  const sendMessage = () => {
    if (inputValue.trim() === "" && !file) return;

    const formData = new FormData();
    formData.append("username", "User"); // Replace with actual username
    if (inputValue.trim() !== "") {
      formData.append("message", inputValue);
    }
    if (file) {
      formData.append("file", file);
    }

    fetch("http://localhost:5000/send", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Content uploaded:", data.chatMessage);
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify(data.chatMessage));
        }
      })
      .catch((error) => {
        console.error("Error sending content:", error);
      })
      .finally(() => {
        setInputValue("");
        setFile(null);
      });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat Application</div>
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.username === "User"
                ? "message-from-user"
                : "message-from-friend"
            }
          >
            {msg.message}
            <a href={msg.fileLink} target="_blank" rel="noopener noreferrer">
              {msg.fileLink}
            </a>
          </div>
        ))}
      </div>
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
    </div>
  );
}

export default App;
