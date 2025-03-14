import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import '../assets/css/chatEduVision.page.css';
import MainLayout from "../layouts/main.layout";
import ChatHeader from "../components/chatHeader.component";
import ChatMessage from "../components/chatMessage.component";
import ChatInput from "../components/chatInput.component";
import BackButton from "../components/buttonBack.component";
import QuestionAPI from "../api/question.api";
import { getLocalStorage } from "../utils/localStorage.util";

export default function ChatEduVisionPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const questions = getLocalStorage("questions");
    const context = getLocalStorage("context");
    const [question, setQuestion] = useState(null);
    const [messages, setMessages] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const quesId = urlParams.get("ques_id");
    useEffect(() => {
        if (quesId.length===0){
            const quesid = location.state?.ques_id ; 
            setQuestion(questions[quesid]);
        }
        else{
            const fetchQuestion = async () => {
                try {
                    const response = await QuestionAPI.getDetailedQuestion(quesId);
                    const data = await response.json()
                    setQuestion(data.data); // Cập nhật dữ liệu vào state
                } catch (error) {
                    console.error("Error fetching question banks:", error);
                }
            };
            fetchQuestion();
        }
    }, [quesId]);
    const handleSendMessage = async (message) => {
        // Thêm tin nhắn của người dùng vào danh sách
        setMessages((prev) => [...prev, { text: message, isUser: true, ques_id:quesId, data: null}]);
    
        // Thêm tin nhắn chờ của bot
        setMessages((prev) => [...prev, { text: "BOT đang trả lời...", isUser: false, ques_id:quesId,  data: null }]);
    
        try {
            // Gọi API lấy dữ liệu câu hỏi
            const response = await QuestionAPI.modifyChatBotQuestion(question, context, message);
            const data = await response.json();
    
            // Cập nhật tin nhắn với nội dung từ API
            setMessages((prev) => [
                ...prev.slice(0, -1), // Xóa tin nhắn "BOT đang trả lời..."
                { text: (data?.data_json), isUser: false, ques_id:quesId, data: data.data_json },
            ]);
        } catch (error) {
            console.error("Error fetching question details:", error);
            // Cập nhật tin nhắn lỗi
            setMessages((prev) => [
                ...prev.slice(0, -1), // Xóa tin nhắn "BOT đang trả lời..."
                { text: "Có lỗi xảy ra khi lấy dữ liệu từ server.", isUser: false, ques_id:quesId,  data: null },
            ]);
        }
    };
    
    return (
        <>
            <MainLayout>
                
                <div className="chat-container" >
                    <div className="chat-back-button">
                        <BackButton
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <ChatHeader />
                    <div className="chat-message">
                        {
                            question &&
                            <ChatMessage  
                                text={
                                    <>
                                        <strong>Nội dung câu hỏi: </strong>{question?.question_text} <br />
                                        <strong>Câu trả lời: </strong><br />
                                        <div style={{ paddingLeft: '20px' }}>
                                            <strong>Câu A: </strong>{question?.answer_text_A} <br />
                                            <strong>Câu B: </strong>{question?.answer_text_B} <br />
                                            <strong>Câu C: </strong>{question?.answer_text_C} <br />
                                            <strong>Câu D: </strong>{question?.answer_text_D} <br />
                                        </div>
                                        <strong>Câu trả lời đúng: </strong><br />
                                        <strong>Câu {question?.is_correct}</strong>. Vì {question?.explanation}
                                    </>
                                }
                                isUser={false} 
                            />
                        }
                        {
                            messages.map((msg, index) => (
                                <ChatMessage  
                                    text={
                                        msg.isUser ? 
                                        msg.text :
                                        msg.text === "BOT đang trả lời..." ?
                                        msg.text :
                                        <> 
                                            <strong>Nội dung câu hỏi: </strong>{msg?.text?.question_text} <br />
                                            <strong>Câu trả lời: </strong><br />
                                            <div style={{ paddingLeft: '20px' }}>
                                                <strong>Câu A: </strong>{msg?.text?.answer_text_A} <br />
                                                <strong>Câu B: </strong>{msg?.text?.answer_text_B} <br />
                                                <strong>Câu C: </strong>{msg?.text?.answer_text_C} <br />
                                                <strong>Câu D: </strong>{msg?.text?.answer_text_D} <br />
                                            </div>
                                            <strong>Câu trả lời đúng: </strong><br />
                                            <strong>Câu {msg?.text?.is_correct}</strong>. Vì {msg?.text?.explanation}
                                        </>
                                    } 
                                    isUser={msg.isUser} 
                                    ques_id= {msg.ques_id} 
                                    modified_data={msg.data}
                                />
                            ))
                        }
                    </div>
                    <ChatInput onSend={handleSendMessage} />
                </div>
            </MainLayout>
        </>
    );
}
