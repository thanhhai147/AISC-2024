import React from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/css/examDetail.page.css';
import Swal from "sweetalert2"; 

import BackButton from "../components/buttonBack.component";
import DetailedExamInf from "../components/detailedExamInf.component";
import MainLayout from "../layouts/main.layout";
import DownloadButton from "../components/downloadButton.component.js";
import QuestionCombo from "../components/questionCombo.component";
import Button from "../components/button.component";

export default function ExamDetailPage() {
    const navigate = useNavigate();

    const handleDownloadSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Tải xuống thành công!',
            confirmButtonText: 'OK',
        });
    };
    
    const DetailedExamInformation = [
        {
            examName: "Đề ôn 1",
            timeTaken: "60 phút", 
            totalQuestions: "20 câu", 
            attempts: "3 lần", 
            createDate: "11/22/2024", 
            lastTime: "08/10/2024"
        }
    ];

    const questionData = {
        type: 'pre-edit', 
        questionNumber: 1,
        questionContext: "Nêu lý do thực hiện dự án, dự án giúp giải quyết vấn đề gì trong thực tiễn?",
        A: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        B: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        C: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        D: "Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.",
        answer: "", 
    };

    const handleBackClick = () => {
        navigate('/exam');
    };

    const handleFinishEditing = () => {
        navigate('/exam');
    };

    const handleStartReviewing = () => {
        navigate('/take-exam');
    };

    return (
        <MainLayout>
            <div className="download-exam">
                <BackButton onClick={handleBackClick} aria-label="Go Back"></BackButton> 
                <DownloadButton onDownloadSuccess={handleDownloadSuccess} />
            </div>

            <div className="detail">
                {DetailedExamInformation.map((inf, index) => (
                    <DetailedExamInf
                        key={index}
                        examName={inf.examName}
                        timeTaken={inf.timeTaken}
                        totalQuestions={inf.totalQuestions}
                        attempts={inf.attempts}
                        createDate={inf.createDate}
                        lastTime={inf.lastTime}
                    />
                ))}
            </div>

            <div className="edit-question">
                <p className="title-edit-question font-family-semibold">Chi tiết đề thi</p>
                <hr></hr>
                <QuestionCombo 
                    type={questionData.type}
                    questionNumber={questionData.questionNumber}
                    questionContext={questionData.questionContext}
                    A={questionData.A}
                    B={questionData.B}
                    C={questionData.C}
                    D={questionData.D}
                    answer={questionData.answer}
                />
            </div>
            <div className="btn">
                <Button
                    type='success'
                    size='small'
                    status={'active'}
                    onClick={handleFinishEditing}
                >
                    Hoàn tất chỉnh sửa
                </Button>

                <Button
                    type='primary'
                    size='small'
                    status={'active'}
                    onClick={handleStartReviewing}
                >
                    Ôn tập
                </Button>
            </div>
        </MainLayout>
    );
}
