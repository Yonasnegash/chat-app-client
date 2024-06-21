import { useEffect, useRef, useCallback } from "react";

const useWebSocket = (setMessages) => {
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
  }, [setMessages]);

  useEffect(() => {
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connectWebSocket]);

  return { ws, connectWebSocket };
};

export default useWebSocket;
