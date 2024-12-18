import React, { useState, useEffect } from "react";
import NavbarExam from "../components/navbarExam.component";
import QuestionCombo from "../components/questionCombo.component";
import BoxQuestion from "../components/boxQuestion.component";
import StartReviewing from "../components/startReviewing.component";
import MainLayout from "../layouts/main.layout";
import '../assets/css/takeExam.page.css';
import QuizAPI from "../api/quiz.api";

export default function TakeExamPage() {
    const queryString = window.location.search
    const params = new URLSearchParams(queryString);
    const quizId = params.get('quiz_id');

    const [isReviewingStarted, setIsReviewingStarted] = useState(false); 
    const [quiz, setQuiz] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [statusQuestions, setStatusQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Lưu đáp án đã chọn
    const [loading, setLoading] = useState(true); // Trạng thái theo dõi quá trình tải
    const [time, setTime] = useState(null)
    const [timeLimit, setTimeLimit] = useState(null)
    
    const handleQuestionClick = (index) => {
        setCurrentQuestionIndex(index); // Chuyển đến câu hỏi được chọn
        
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await QuizAPI.getDetailedQuiz(quizId);
                const data = await response.json();
                setQuiz(data?.data || {}); // Cập nhật dữ liệu
                setSelectedAnswers(Array(data?.data?.quiz?.number_of_questions).fill("none"))
                setStatusQuestions(Array(data?.data?.quiz?.number_of_questions).fill("secondary"))
                setTime(data?.data?.quiz?.time_limit)
                setTimeLimit(data?.data?.quiz?.time_limit)
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
    
    const questionData = {
        type: 'exam', 
        questionContext: quiz?.questions?.[currentQuestionIndex]?.["question_text"],
        A: quiz?.questions?.[currentQuestionIndex]?.["answer_text_A"],
        B: quiz?.questions?.[currentQuestionIndex]?.["answer_text_B"],
        C: quiz?.questions?.[currentQuestionIndex]?.["answer_text_C"],
        D: quiz?.questions?.[currentQuestionIndex]?.["answer_text_D"],
        answer: "", 
        rightAnswer: "", 
        wrongAnswer: "" 
    };
    const user_answers = [];
    for (let i = 0; i < quiz?.questions?.length; i++) {
        user_answers.push({
            question_id: quiz?.questions[i]?.question_id,
            correct_answer: quiz?.questions[i]?.is_correct,
            user_answer: selectedAnswers[i] || "none" // Lấy câu trả lời đã chọn hoặc mặc định là "none"
        });
    }
    
    const handleAnswerSelect = (answer) => {
        setSelectedAnswers((prevArray) => 
            prevArray.map((value, i) => (i === currentQuestionIndex ? answer : value))
        );
        setStatusQuestions((prevArray) => 
            prevArray.map((value, i) => (i === currentQuestionIndex ? "answer" : value))
        );
    };
    const startReviewing = [
        { 
            examName: quiz?.quiz?.["title"], 
            timeTaken: quiz?.quiz?.["time_limit"], 
            totalQuestions: quiz?.quiz?.["number_of_questions"], 
            attempts: quiz?.quiz?.["attempt_count"], 
            examType: "Trắc nghiệm"
        }
    ];

    const handleStartReviewing = () => {
        setIsReviewingStarted(true); 
    };

    const handleOnTimeChange = (timeObject) => {
        setTime(timeObject['total'] / 60 / 1000)
        // console.log(time * 60000)
    }

    return (
        <>
            {!isReviewingStarted ? (
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
                                onStartReviewing={handleStartReviewing} 
                            />
                        ))}
                    </div>
                </MainLayout>
            ) : (
                <>
                    <NavbarExam
                        time={time}
                        timeLimit={timeLimit}
                        onTimeChange={handleOnTimeChange}
                        quizId={quiz?.quiz?.["quiz_id"]}
                        userAnswers={user_answers}
                    >
                    </NavbarExam>
                    <div className="take-exam-page">
                        <div className="exam-container">
                            <QuestionCombo 
                                key={currentQuestionIndex} 
                                type={questionData.type}
                                questionNumber={currentQuestionIndex+1}            
                                questionContext={questionData.questionContext}
                                A={questionData.A}
                                B={questionData.B}
                                C={questionData.C}
                                D={questionData.D}
                                answer={questionData.answer}
                                rightAnswer={questionData.rightAnswer}
                                wrongAnswer={questionData.wrongAnswer}
                                onAnswerSelect={handleAnswerSelect}
                                selectedAnswer={selectedAnswers[currentQuestionIndex]}
                            />
                        </div>
                        <div className="box-question">
                            <p className="title-boxquestion">Danh sách câu hỏi</p>
                            <BoxQuestion   
                                questionCount={quiz?.quiz?.["number_of_questions"]} 
                                statusQuestions={statusQuestions} 
                                onQuestionClick={handleQuestionClick}
                                />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
