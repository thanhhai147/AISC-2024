import React, { useState } from "react";
import "../assets/css/setupExamPopup.css";
import Button from "./button.component";
import TextInputTitle from "./textInput&Title.component";

export default function SetupExamPopup({ isVisible, onClose, onCreate }) {
    const [examName, setExamName] = useState("");
    const [examTime, setExamTime] = useState("");

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <p className="popup-title font-family-semibold primary-color ">Vui lòng đặt tên đề ôn</p>
                <div className="popup-content">
                    <TextInputTitle
                        title="Tên đề ôn: "
                        placeholder="Đề ôn số 1..."
                    />

                    <TextInputTitle
                        title="Thời gian: "
                        placeholder="30 phút"
                    />
                </div>
                <div className="popup-actions">
                    <Button type="warning" size="small" onClick={onClose}>
                        Thoát
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => onCreate(examName, examTime)}
                    >
                        Tạo đề ôn
                    </Button>
                </div>
            </div>
        </div>
    );
}
