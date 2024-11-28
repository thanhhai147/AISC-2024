import React from "react";
import '../assets/css/inforInExamDetails.css';

export default function InforInExamDetails({startTime, endTime, duration, statusExam, score}) {
    return (
        <div className="row-content">
            <div className="row font-family-semibold">
                <span >Bắt đầu vào lúc:</span>
                <span className="value font-family-regular">{startTime}</span>
            </div>
            <div className="row font-family-semibold">
                <span>Kết thúc vào lúc:</span>
                <span className="value font-family-regular">{endTime}</span>
            </div>
            <div className="row font-family-semibold">
                <span>Thời gian thực hiện:</span>
                <span className="value font-family-regular">{duration}</span>
            </div>
            <div className="row font-family-semibold">
                <span>Trạng thái:</span>
                <span className="value font-family-regular">{statusExam}</span>
            </div>
            <div className="row font-family-semibold">
                <span>Điểm:</span>
                <span className="value font-family-regular">{score}</span>
            </div>
        </div>
    );
}
