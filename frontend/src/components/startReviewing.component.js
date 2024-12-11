import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import '../assets/css/startReviewing.css';
import Button from "../components/button.component";

export default function StartReviewing({ examName, timeTaken, totalQuestions, attempts, examType, onStartReviewing }) {
    return (
        <div className="start-reviewing-container">
            <p className="exam-name font-family-semibold">{examName}</p>
            <div className="row-content">
                <div className="row font-family-regular">
                    <span>
                        <FaRegClock style={{ fontSize: '25px', paddingRight: '8px' }} />
                        Thời gian làm bài
                    </span>
                    <span className="value font-family-regular">{timeTaken} phút</span>
                </div>

                <div className="row font-family-regular">
                    <span>
                        <IoCheckmarkDoneCircleOutline style={{ fontSize: '28px', paddingRight: '8px' }} />
                        Số lượng câu hỏi
                    </span>
                    <span className="value font-family-regular">{totalQuestions} câu</span>
                </div>

                <div className="row font-family-regular">
                    <span>
                        <FaRegCircleUser style={{ fontSize: '25px', paddingRight: '8px' }} />
                        Số lượt làm đề
                    </span>
                    <span className="value font-family-regular">{attempts}</span>
                </div>

                <div className="row font-family-regular">
                    <span>
                        <FaRegFileAlt style={{ fontSize: '23px', paddingRight: '8px' }} />
                        Loại đề
                    </span>
                    <span className="value font-family-regular">{examType}</span>
                </div>
            </div>
            <Button
                type='primary'
                size='extra-large'
                status={'active'}
                onClick={onStartReviewing}
            >
                Bắt đầu ôn tập 
            </Button>
        </div>
    );
}