import React, { useState } from "react";
import ExamInformation from "../components/examInformation.component";
import StartReviewing from "../components/startReviewing.component";
import MainLayout from "../layouts/main.layout";

export default function ListOfCompletedExams() {
    const [showHistory, setShowHistory] = useState(false); // State to control history visibility

    const startReviewing = [
        { 
            examName: "Đề thi số 1", 
            timeTaken: "60 phút", 
            totalQuestions: 20, 
            attempts: 10, 
            examType: "Đây là phần giải thích"
        }
    ];

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
            <div className="start-reviewing">
                {startReviewing.map((reviewing, index) => (
                    <StartReviewing
                        key={index}
                        examName={reviewing.examName}
                        timeTaken={reviewing.timeTaken}
                        totalQuestions={reviewing.totalQuestions}
                        attempts={reviewing.attempts}
                        examType={reviewing.examType}
                    />
                ))}
            </div>

            {!showHistory && (
                <p 
                    className="history-exam font-family-medium" 
                    style={{
                        textAlign: 'center', 
                        cursor: 'pointer',
                    }}
                    onClick={() => setShowHistory(true)}
                >
                    Xem lịch sử làm bài của bạn
                </p>
            )}

            {showHistory && (
                <>
                    <p className="history-exam font-family-semibold" style={{ marginLeft: '160px' }}>
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
                </>
            )}
        </MainLayout>
    );
}
