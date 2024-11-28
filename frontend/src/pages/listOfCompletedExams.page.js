import React, { useState } from "react";
import ExamInformation from "../components/examInformation.component";
import MainLayout from "../layouts/main.layout";

export default function ListOfCompletedExams() {
    const completedExams = [
        {
            score: 10,
            examName: "Đề thi số 1",
            userName: "Nguyễn Hải Đăng",
            timeTaken: "25 phút",
            correctAnswers: 20,
            incorrectAnswers: 0,
            totalQuestions: 20,
        },
        {
            score: 8,
            examName: "Đề thi số 2",
            userName: "Nguyễn Hải Đăng",
            timeTaken: "30 phút",
            correctAnswers: 16,
            incorrectAnswers: 4,
            totalQuestions: 20,
        },
    ];

    return (
        <MainLayout>
            <p className="history-exam font-family-semibold" style={{ margin: '30px' }}>
                Lịch sử làm bài của bạn
            </p>

            <div className="exam-list">
                {completedExams.map((exam, index) => (
                    <ExamInformation 
                        key={index}
                        score={exam.score}
                        examName={exam.examName}
                        userName={exam.userName}
                        timeTaken={exam.timeTaken}
                        correctAnswers={exam.correctAnswers}
                        incorrectAnswers={exam.incorrectAnswers}
                        totalQuestions={exam.totalQuestions}
                    />
                ))}
            </div>
        </MainLayout>
    );
}
