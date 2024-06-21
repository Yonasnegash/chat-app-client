import "./App.css";

function App() {
  return (
    <div className="chat-container">
      <div className="chat-header">Chat Application</div>
      <div className="chat-history">
        <div className="message-from-user">Hey</div>
        <div className="message-from-friend">Hi</div>
      </div>
      <div className="chat-input-section">
        <input
          type="text"
          placeholder="Type your message..."
          className="chat-input"
        />
        <input type="file" />
        <button className="send-button">Send</button>
      </div>
    </div>
  );
}

export default App;
