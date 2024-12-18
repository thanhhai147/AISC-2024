import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";
import '../assets/css/examInformation.css'
import Button from "../components/button.component";

export default function ExamInformation({ 
    score, 
    examName, 
    userName, 
    timeTaken, 
    correctAnswers, 
    incorrectAnswers, 
    totalQuestions,
    attemptedId 
}) {
    const navigate = useNavigate();

    const handleViewAnswers = () => {
        navigate('/answer-detail?attempted_id='+ attemptedId); 
        console.log('Xem đáp án');
    };
    return (
        <div className="container">
            <div className="row-score">
                <p className="score font-family-semibold">Điểm của bạn: {score} </p>
                <hr className="divider" />
            </div>
            <p className="exam-name font-family-regular">{examName}</p>
            <div className="row-content">
                <div className="row font-family-regular">
                    <span>
                        <FaRegCircleUser style={{fontSize: '25px', paddingRight: '8px' }} />
                        Họ tên
                    </span>
                    <span className="value font-family-regular">{userName}</span>
                </div>
                <div className="row font-family-regular">
                    <span>
                        <FaRegClock style={{fontSize: '25px', paddingRight: '8px' }} />
                        Thời gian làm bài
                    </span>
                    <span className="value font-family-regular">{timeTaken} phút</span>
                </div>
                <div className="row font-family-regular">
                    <span>
                        <IoCheckmarkDoneCircleOutline style={{fontSize: '28px', paddingRight: '8px' }} />
                        Số lượng câu đúng
                    </span>
                    <span className="value font-family-regular">{correctAnswers} câu</span>
                </div>
                <div className="row font-family-regular">
                    <span>
                        <IoCloseCircleOutline style={{fontSize: '28px', paddingRight: '8px' }} />
                        Số lượng câu sai
                    </span>
                    <span className="value font-family-regular">{incorrectAnswers} câu</span>
                </div>
                <div className="row font-family-regular">
                    <span>
                        <FaRegQuestionCircle style={{fontSize: '25px', paddingRight: '8px' }} />
                        Tổng số lượng câu hỏi của đề
                    </span>
                    <span className="value font-family-regular">{totalQuestions} câu</span>
                </div>
            </div>
            <Button
                type='primary'
                size='extra-large'
                status={'active'}
                onClick={handleViewAnswers}
            >
                Xem đáp án 
            </Button>
        </div>
    );
}