import React, { useState } from "react";
import "../assets/css/setupQuestionBankPopup.css";
import Button from "./button.component";
import TextInputTitle from "./textInput&Title.component";

export default function SetupBankQuestionPopup({ isVisible, onClose, onCreate }) {
    const [questionBankName, setquestionBankName] = useState("");

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <p className="popup-title font-family-semibold primary-color ">Vui lòng đặt tên đề ôn</p>
                <div className="popup-content">
                    <TextInputTitle
                        title="Tên bộ câu hỏi: "
                        placeholder="Đề ôn số 1..."
                    />
                </div>
                <div className="popup-actions">
                    <Button type="warning" size="small" onClick={onClose}>
                        Thoát
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => onCreate(questionBankName)}
                    >
                        Tạo bộ câu hỏi
                    </Button>
                </div>
            </div>
        </div>
    );
}
