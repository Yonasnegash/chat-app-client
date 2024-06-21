import React, { useState, useEffect, useRef, useCallback } from "react";

import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
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
    if (inputValue.trim() === "") return;

    const messageData = {
      username: "User",
      message: inputValue.trim(),
    };

    fetch("http://localhost:5000/send", {
      method: "POST",
      body: JSON.stringify(messageData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Content sent:", data.newMessage);
      })
      .catch((error) => {
        console.error("Error sending content:", error);
      })
      .finally(() => {
        setInputValue("");
      });
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
        <input type="file" />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
