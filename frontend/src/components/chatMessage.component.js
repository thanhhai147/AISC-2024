import React, { useState } from "react";
import Swal from "sweetalert2";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"; // Thêm các icon
import { useNavigate } from "react-router-dom";
import "../assets/css/chatMessage.css";

const ChatMessage = ({ text, isUser, ques_id }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  // Xử lý click Like
  const handleLike = () => {
    Swal.fire({
      icon: "success",
      title: "Chỉnh sửa câu hỏi thành công!",
      text: "Bạn có thể xem câu hỏi của mình.",
      confirmButtonText: "Xem câu hỏi",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/question-detail?ques_id=${ques_id}`); // Điều hướng đến danh sách câu hỏi
      }
    });
  };

  // Xử lý click Dislike
  const handleDislike = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: "Bạn có thể cho tôi biết bạn không hài lòng chỗ nào không?",
        isUser: false, 
      },
    ]);
  };

  return (
    <>
      <div className={`message font-family-regular ${isUser ? "message-user" : "message-bot"}`}>
        {text}
      </div>
      {messages.map((msg, index) => (
          <div key={index} className={`message font-family-regular ${msg.isUser ? "message-user" : "message-bot"}`}>
            {msg.text}
          </div>
        ))}
        <div className="icon-bot">
          {!isUser && (
            <div className="reaction-icons">
              <div className="reaction-icon" onClick={handleLike}>
                <AiOutlineLike />
                <span className="tooltip like font-family-light">Đồng ý</span>
              </div>
              <div className="reaction-icon" onClick={handleDislike}>
                <AiOutlineDislike />
                <span className="tooltip dislike font-family-light">Không đồng ý</span>
              </div>
            </div>
          )}
        </div>
      
    </>
    
  );
};

export default ChatMessage;
