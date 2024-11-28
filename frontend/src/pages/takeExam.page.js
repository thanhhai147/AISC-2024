import React, { useState } from "react";
import NavbarExam from "../components/navbarExam.component";
import QuestionCombo from "../components/questionCombo.component";
import BoxQuestion from "../components/boxQuestion.component";
import StartReviewing from "../components/startReviewing.component";
import MainLayout from "../layouts/main.layout";
import '../assets/css/takeExam.page.css';

export default function TakeExamPage() {
    const [isReviewingStarted, setIsReviewingStarted] = useState(false); 

    const questionData = {
        type: 'exam', 
        questionNumber: 1,
        questionContext: "Nêu lý do thực hiện dự án, dự án giúp giải quyết vấn đề gì trong thực tiễn?",
        A: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        B: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        C: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        D: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        answer: "", 
        rightAnswer: "", 
        wrongAnswer: "" 
    };

    const statusQuestions = [
        'success',  
        'warning',  
        'danger',   
        'secondary', 
    ];

    const startReviewing = [
        { 
            examName: "Đề thi số 1", 
            timeTaken: "60 phút", 
            totalQuestions: 20, 
            attempts: 10, 
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
                    <NavbarExam />
                    <div className="take-exam-page">
                        <div className="exam-container">
                            <QuestionCombo 
                                type={questionData.type}
                                questionNumber={questionData.questionNumber}
                                questionContext={questionData.questionContext}
                                A={questionData.A}
                                B={questionData.B}
                                C={questionData.C}
                                D={questionData.D}
                                answer={questionData.answer}
                                rightAnswer={questionData.rightAnswer}
                                wrongAnswer={questionData.wrongAnswer}
                            />
                        </div>
                        <div className="box-question">
                            <p className="title-boxquestion">Danh sách câu hỏi</p>
                            <BoxQuestion   
                                questionCount={10} 
                                statusQuestions={statusQuestions} 
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
