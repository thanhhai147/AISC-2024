import React, { useState } from "react";
import "../assets/css/setupExamPopup.css";
import Button from "./button.component";
import TextInputTitle from "./textInput&Title.component";

export default function SetupExamPopup({
    isVisible,
    onClose,
    onCreate,
    popupTitle = "Vui lòng đặt tên đề ôn",  // Default title
    nameLabel = "Tên đề ôn: ",              // Default name label
    timeLabel = "Thời gian: ",              // Default time label
    placeholderName = "Đề ôn số 1...",     // Default placeholder for name input
    placeholderTime = "30 phút",           // Default placeholder for time input
    buttonCancelText = "Thoát",            // Default text for cancel button
    buttonCreateText = "Tạo đề ôn"         // Default text for create button
}) {
    const [examName, setExamName] = useState("");
    const [examTime, setExamTime] = useState("");

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <p className="popup-title font-family-semibold primary-color">
                    {popupTitle}
                </p>
                <div className="popup-content">
                    <TextInputTitle
                        title={nameLabel}
                        placeholder={placeholderName}
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)} // Cập nhật giá trị khi thay đổi
                    />

                    <TextInputTitle
                        title={timeLabel}
                        placeholder={placeholderTime}
                        value={examTime}
                        onChange={(e) => setExamTime(e.target.value)} // Cập nhật giá trị khi thay đổi
                    />
                </div>
                <div className="popup-actions">
                    <Button type="warning" size="small" onClick={onClose}>
                        {buttonCancelText}
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => onCreate(examName, examTime)}
                    >
                        {buttonCreateText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
