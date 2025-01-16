import React, { useState, useEffect } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = { 
        id: Date.now(),
        user: 'User', 
        text: newMessage,
        timestamp: new Date().toISOString()
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
      localStorage.removeItem('chatMessages');
    }
  };

  return (
    <div className="page-container">
      <h1 className="main-heading">Realtime Chat Application</h1>
      <div className="chat-history-container">
        <div className="chat-header">
          <h2>Chat History</h2>
          <button onClick={clearHistory} className="clear-button">
            Clear History
          </button>
        </div>
        <div className="messages">
          {messages.length === 0 ? (
            <div className="no-messages">No messages yet</div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="message">
                <strong>{message.user}:</strong> {message.text}
                <div className="message-timestamp">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="chat-box-container">
        <div className="chat-box-header">
          <h2>New Message</h2>
        </div>
        <div className="chat-input-area">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="message-input"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
