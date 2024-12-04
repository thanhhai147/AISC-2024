import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import "../assets/css/chatInput.css";
import TextInput from "./textInput.component";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");
  const [key, setKey] = useState(0); // Dùng key để reset input

  const handleSend = () => {
    if (input.trim()) {
      onSend(input); 
      setInput("");  
      setKey((prev) => prev + 1); // Thay đổi key để reset component
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
    //   e.preventDefault(); 
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <TextInput
        key={key} // Thay đổi key để reset component
        type="text"
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={handleKeyDown} 
        placeholder="Nhập tin nhắn của bạn..."
      />
      <div className="icon" onClick={handleSend}>
        <BsSend />
      </div>
    </div>
  );
};

export default ChatInput;
