import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../assets/css/chatEduVision.page.css';
import MainLayout from "../layouts/main.layout";
import ChatHeader from "../components/chatHeader.component";
import ChatMessage from "../components/chatMessage.component";
import ChatInput from "../components/chatInput.component";
import BackButton from "../components/buttonBack.component";

export default function ChatEduVisionPage() {
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);

    const handleSendMessage = (message) => {
      setMessages((prev) => [...prev, { text: message, isUser: true }]);
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "BOT đang trả lời...", isUser: false }]);
      }, 1000);
    };
    return (
        <>
            <MainLayout>
                
                <div className="chat-container" >
                    <BackButton
                        onClick={() => navigate('/question-detail')}
                    />
                    <ChatHeader />
                    <div className="chat-message">
                        {messages.map((msg, index) => (
                        <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
                        ))}
                    </div>
                    <ChatInput onSend={handleSendMessage} />
                </div>
            </MainLayout>
        </>
    );
}
