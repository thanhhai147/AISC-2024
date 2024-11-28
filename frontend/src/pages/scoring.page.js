import React, { useState } from "react";
import MainLayout from "../layouts/main.layout";
import ExamInformation from "../components/examInformation.component";

export default function Scoring() {


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
    ];

    return (
        <MainLayout>
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
