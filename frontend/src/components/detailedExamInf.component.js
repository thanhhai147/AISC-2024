import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/css/detailedExamInf.css';
import Button from "./button.component";
import SetupExamPopup from "./setupExamPopup.component";

export default function DetailedExamInf({ examName, timeTaken, totalQuestions, attempts, createDate, lastTime }) {
    const navigate = useNavigate(); 

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    
    const handleOpenPopup = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };
    
    const handleCreateExam = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="exam-details-container">
            <div className="row-content">
                <p className="title-exam font-family-semibold">Thông tin đề thi</p>

                <div className="row font-family-medium">
                    <span>Tên đề</span>
                    <span className="value font-family-regular">{examName}</span>
                </div>

                <div className="row font-family-medium">
                    <span>Thời gian làm bài</span>
                    <span className="value font-family-medium">{timeTaken}</span>
                </div>

                <div className="row font-family-medium">
                    <span>Số lượng câu hỏi</span>
                    <span className="value font-family-medium">{totalQuestions} câu</span>
                </div>

                <div className="row font-family-medium">
                    <span>Số lượt làm đề</span>
                    <span className="value font-family-medium">{attempts}</span>
                </div>

                <div className="row font-family-medium">
                    <span>Ngày tạo</span>
                    <span className="value font-family-medium">{createDate}</span>
                </div>

                <div className="row font-family-medium">
                    <span>Lần truy cập cuối</span>
                    <span className="value font-family-medium">{lastTime}</span>
                </div>

                <Button
                    type='success'
                    size='small'
                    status={'active'}
                    onClick={handleOpenPopup}
                >
                    Chỉnh sửa thông tin đề thi
                </Button>
                <SetupExamPopup
                    isVisible={isPopupVisible}
                    onClose={ handleClosePopup}
                    onCreate={handleCreateExam}
                    popupTitle="Chỉnh sửa thông tin đề ôn"
                    nameLabel="Tên đề ôn:"
                    timeLabel="Thời gian làm bài:"
                    placeholderName="Đề ôn 1"
                    placeholderTime="30 phút"
                    buttonCancelText="Hủy bỏ"
                    buttonCreateText="Hoàn tất chỉnh sửa"
                />
            </div>
        </div>
    );
}
