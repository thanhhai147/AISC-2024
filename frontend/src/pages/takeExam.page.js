import React from "react";
import NavbarExam from "../components/navbarExam.component";
import QuestionCombo from "../components/questionCombo.component";
import BoxQuestion from "../components/boxQuestion.component"
import '../assets/css/takeExam.page.css';


export default function TakeExamPage() {
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

    return (
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
                    <BoxQuestion>   
                        questionCount={10} 
                        statusQuestions={statusQuestions} 
                    </BoxQuestion>
                </div>
            </div>
        </>
    );
}
