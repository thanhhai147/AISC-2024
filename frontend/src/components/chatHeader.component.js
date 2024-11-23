import React from "react";
 import '../assets/css/chatHeader.css'

const ChatHeader = () => {
  return (
    <div className="header-container" >
      <div className="header-title font-family-semibold primary-color" style={{ fontSize: "18px", fontWeight: "bold" }}>Chat cùng EduVision</div>
      <span className="header-status font-family-light" >● Online</span>
    </div>
  );
};

export default ChatHeader;
