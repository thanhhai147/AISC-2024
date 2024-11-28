import React, { useState } from "react";
import NavbarAnswerDetail from "../components/navbarAnswerDetail.component";
import BoxQuestion from "../components/boxQuestion.component";
import QuestionCombo from "../components/questionCombo.component";
import "../assets/css/answerDetail.page.css";
import NavbarHomePage from "../components/navbarHomePage.component";
import InforInExamDetails from "../components/inforInExamDetails.component";

export default function AnswerDetail() {    
    const Name = [
        {
            examName: "Đề thi số 1"
        }
    ];
    const ExamInformation =[
        {
            startTime: "Thứ hai, 02/09/2024, 13:44",
            endTime: "Thứ hai, 02/09/2024, 14:44", 
            duration: "60 phút",
            statusExam: "Hoàn tất",
            score: "80/100",
        }
    ]

    const questionData = {
        type: 'explanation',  
        questionNumber: 1,
        questionContext: "Nêu lý do thực hiện dự án, dự án giúp giải quyết vấn đề gì trong thực tiễn?",
        A: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        B: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        C: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        D: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        answer: "", 
        rightAnswer: "", 
        wrongAnswer: "",
        explanation: "Giải thích tại sao dự án này quan trọng đối với việc nâng cao chất lượng giáo viên."  
    };

    const statusQuestions = [
        'success',  
        'warning',  
        'danger',   
        'secondary', 
    ];

    return (
    <>
        <NavbarHomePage />
        <div className="navbar-Answer">
            {Name.map((navbar, index) => (
                <NavbarAnswerDetail
                    key={index}
                    examName={navbar.examName}
                />
            ))}
        </div> 

        <div className="exam-content">
            <div className="exam-left">
                <p className="title-boxquestion">Danh sách câu hỏi</p>
                <BoxQuestion questionCount={10} statusQuestions={statusQuestions} />
            </div>
            
            <div className="exam-right">
                {ExamInformation.map((inf,index) => (
                        <InforInExamDetails
                            key={index}
                            startTime={inf.startTime}
                            endTime={inf.endTime}
                            duration={inf.duration}
                            statusExam={inf.statusExam}
                            score={inf.score}
                        />
                ))}
                <div className="exam-right-content">
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
                        explanation={questionData.explanation}  
                    />
                </div>
                <div className="exam-right-content">
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
                        explanation={questionData.explanation}  
                    />
                </div>
            </div>
        </div>
    </>
    );
}
