import React, { useState, useEffect } from "react";
import NavbarExam from "../components/navbarExam.component";
import QuestionCombo from "../components/questionCombo.component";
import BoxQuestion from "../components/boxQuestion.component";
import StartReviewing from "../components/startReviewing.component";
import MainLayout from "../layouts/main.layout";
import '../assets/css/takeExam.page.css';
import QuizAPI from "../api/quiz.api";

export default function TakeExamPage() {
    const [isReviewingStarted, setIsReviewingStarted] = useState(false); 
    const [quiz, setQuiz] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [statusQuestions, setStatusQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Lưu đáp án đã chọn
    const [loading, setLoading] = useState(true); // Trạng thái theo dõi quá trình tải
    
    const handleQuestionClick = (index) => {
        setCurrentQuestionIndex(index); // Chuyển đến câu hỏi được chọn
        
    };
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await QuizAPI.getDetailedQuiz("6756b5ba16b1b81fb45bbdea");
                const data = await response.json();
                setQuiz(data.data || {}); // Cập nhật dữ liệu
                setSelectedAnswers(Array(data.data.brief_info.number_of_questions).fill("none"))
                setStatusQuestions(Array(data.data.brief_info.number_of_questions).fill("secondary"))
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
        questionContext: quiz?.["detailed_info"][currentQuestionIndex]?.["question_text"],
        A: quiz?.["detailed_info"][currentQuestionIndex]?.["answer_text_A"],
        B: quiz?.["detailed_info"][currentQuestionIndex]?.["answer_text_B"],
        C: quiz?.["detailed_info"][currentQuestionIndex]?.["answer_text_C"],
        D: quiz?.["detailed_info"][currentQuestionIndex]?.["answer_text_D"],
        answer: "", 
        rightAnswer: "", 
        wrongAnswer: "" 
    };
    const user_answers = [];
    for (let i = 0; i < quiz?.["detailed_info"]?.length; i++) {
        user_answers.push({
            question_id: quiz["detailed_info"][i]._id,
            correct_answer: quiz["detailed_info"][i].is_correct,
            user_answer: selectedAnswers[i] || "none" // Lấy câu trả lời đã chọn hoặc mặc định là "none"
        });
    }
    
    const handleAnswerSelect = (answer) => {
        console.log(selectedAnswers)
        console.log("Selected Answer:", answer); // In ra đáp án được chọn
        setSelectedAnswers((prevArray) => 
            prevArray.map((value, i) => (i === currentQuestionIndex ? answer : value))
        );
        setStatusQuestions((prevArray) => 
            prevArray.map((value, i) => (i === currentQuestionIndex ? "answer" : value))
        );
    };
    const startReviewing = [
        { 
            examName: quiz?.["brief_info"]?.["title"], 
            timeTaken: quiz?.["brief_info"]?.["time_limit"], 
            totalQuestions: quiz?.["brief_info"]?.["number_of_questions"], 
            attempts: quiz?.["brief_info"]?.["attempt_count"], 
            examType: "Đây là phần giải thích"
        }
    ];

    const handleStartReviewing = () => {
        setIsReviewingStarted(true); 
    };

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
                        initialTime={quiz?.["brief_info"]?.["time_limit"]}
                        userId={quiz?.["brief_info"]?.["user_id"]}
                        quizId={quiz?.["brief_info"]?.["_id"]}
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
                                questionCount={quiz?.["brief_info"]?.["number_of_questions"]} 
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
