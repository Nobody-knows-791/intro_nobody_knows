import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chat({ character, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/chat/${character.id}`).then((res) => {
      setMessages(res.data.messages);
    });
  }, [character]);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input, timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setInput('');

    const res = await axios.post(`/api/chat/${character.id}`, { message: input });
    const botMessage = {
      sender: 'bot',
      text: res.data.response.text,
      image: res.data.response.image || null,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center mb-4">
        <img src={character.image} alt={character.name} className="w-12 h-12 rounded-full mr-2" />
        <h2 className="text-xl font-semibold">{character.name}</h2>
        <button className="ml-auto text-blue-500" onClick={onBack}>Back</button>
      </div>
      <div ref={chatRef} className="h-96 overflow-y-auto mb-4 p-2 border rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
          >
            {msg.text && <p>{msg.text}</p>}
            {msg.image && (
              <img src={msg.image} alt="Character" className="w-24 h-24 rounded mt-2" />
            )}
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;