import React, { useState, useEffect } from "react";
import ExamInformation from "../components/examInformation.component";
import MainLayout from "../layouts/main.layout";
import ExamAPI from "../api/exam.api";
import { useAuth } from "../context/authentication.context";

export default function ListOfCompletedExams() {
    const [loading, setLoading] = useState(true); // Trạng thái theo dõi quá trình tải
    const [allQuizAttempts, getAllQuizAttempts] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get("quiz_id");
    const { userId, user} = useAuth()
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await ExamAPI.getListAllQuizAttempts(quizId);
                const data = await response.json();
                if (response.ok) {
                    console.log('Quiz attempt updated successfully');
                    console.log(data.data)
                    getAllQuizAttempts(data.data);
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
    const completedExams = [];
    allQuizAttempts.forEach((quiz_attempt, i) => {
        completedExams.push({
            score: quiz_attempt["score"],
            examName: quiz_attempt["title"],
            userName: user?.['username'],
            timeTaken: quiz_attempt["time_taken"],
            correctAnswers: quiz_attempt["correct_ans_count"],
            incorrectAnswers: quiz_attempt["incorrect_ans_count"],
            totalQuestions: quiz_attempt["number_of_question"],
            attemptedId: quiz_attempt["attempted_id"],
        })
    });

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
                        attemptedId={exam.attemptedId}
                    />
                ))}
            </div>
        </MainLayout>
    );
}
