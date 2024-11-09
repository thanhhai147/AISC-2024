import React from 'react';
import ButtonQuestion from './buttonQuestion.component';
import '../assets/css/boxQuestion.css';


export default function BoxQuestion({ questionCount = 10, statusQuestions = [] }) {
    // Tạo danh sách trạng thái cho từng câu hỏi dựa vào `statusQuestions`
    const questionStatuses = Array.from({ length: questionCount }, (_, index) => statusQuestions[index] || 'secondary');

    return (
        <div className="box-question-container">
            {questionStatuses.map((status, index) => (
                <ButtonQuestion
                    key={index}
                    type={status}
                >
                {String(index + 1).padStart(2, '0')}
                </ButtonQuestion>
            ))}
        </div>
    );
}