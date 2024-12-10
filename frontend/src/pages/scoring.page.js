import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/main.layout";
import ExamInformation from "../components/examInformation.component";
import ExamAPI from "../api/exam.api";

export default function Scoring() {
    const [loading, setLoading] = useState(true); // Trạng thái theo dõi quá trình tải
    const [detailQuizAttempt, getDetailQuizAttempt] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const attemptedId = urlParams.get("attempted_id");
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await ExamAPI.getQuizAttempt(attemptedId);
                const data = await response.json();
                if (response.ok) {
                    console.log('Quiz attempt updated successfully');
                    getDetailQuizAttempt(data.data);
                } else {
                    console.error('Failed to update quiz attempt');
                }
                
            } catch (error) {
                console.error("Error fetching question banks:", error);
            } finally {
                setLoading(false); // Dữ liệu đã được tải xong
            }
        };
        fetchQuestions();
    }, []);
    if (loading) {
        return <p></p>;
    }
    const completedExams = [
        {
            score: detailQuizAttempt["score"],
            examName: "Đề thi số 1",
            userName: "Nguyễn Hải Đăng",
            timeTaken: "25 phút",
            correctAnswers: detailQuizAttempt["correct_ans_count"],
            incorrectAnswers: detailQuizAttempt["incorrect_ans_count"],
            totalQuestions: detailQuizAttempt["number_of_question"],
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
                        attemptedId={attemptedId}
                    />
                ))}
            </div>
        </MainLayout>
    );
}
