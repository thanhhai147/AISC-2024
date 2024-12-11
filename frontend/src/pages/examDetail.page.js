import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/css/examDetail.page.css';
import Swal from "sweetalert2";
import QuizzesAPI from "../api/quizzes.api.js"; 
import { jsPDF } from "jspdf"
import "../assets/fonts/Roboto-Regular-normal.js"

import BackButton from "../components/buttonBack.component";
import DetailedExamInf from "../components/detailedExamInf.component";
import MainLayout from "../layouts/main.layout";
import DownloadButton from "../components/downloadButton.component.js";
import QuestionCombo from "../components/questionCombo.component";
import Button from "../components/button.component";
import EditQuestionPopup from "../components/editQuestionPopup.component.js";

export default function ExamDetailPage() {
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [editQuestionId, setEditQuestionId] = useState(null)
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const queryString = window.location.search
    const params = new URLSearchParams(queryString);
    const quizId = params.get('quiz_id');
    useEffect(() => {
    
        
        QuizzesAPI.getDetailedQuiz(quizId)
        .then(response => response.json())
        .then(data => {
            if (data?.success) {
                const returnedData = data?.data
                setData({
                    quiz: {
                        quizId: returnedData?.quiz?.quiz_id,
                        userId: returnedData?.quiz?.user_id,
                        title: returnedData?.quiz?.title,
                        questionNumber: returnedData?.quiz?.number_of_questions,
                        timeLimit: returnedData?.quiz?.time_limit,
                        attemptCount: returnedData?.quiz?.attempt_count,
                        createdAt: returnedData?.quiz?.created_at,
                        updatedAt: returnedData?.quiz?.updated_at
                    },
                    questions: returnedData?.questions.map(question => ({
                        questionId: question?.question_id,
                        questionBankId: question?.question_bank_id,
                        questionText: question?.question_text,
                        answerTextA: question?.answer_text_A,
                        answerTextB: question?.answer_text_B,
                        answerTextC: question?.answer_text_C,
                        answerTextD: question?.answer_text_D,
                        isCorrect: question?.is_correct,
                        explanation: question?.explanation,
                        createdAt: question?.created_at,
                        updatedAt: question?.updated_at
                    }))
                })
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Lấy thông tin chi tiết đề ôn thất bại",
                    text: data?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .catch(error => {
            console.error(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Lấy thông tin chi tiết đề ôn thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }, [])

    const handleDownloadSuccess = () => {
        const doc = new jsPDF()

        doc.setFont("Roboto-Regular", "normal")

        // Set title
        doc.setFontSize(20)
        // Set the text content
        const title = data?.quiz?.title;
        // Get the width of the text
        const textWidth = doc.getTextWidth(title);
        // Get the page width
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const maxTextHeight = pageHeight - 20
        // Calculate the x position to center the text
        const xPosition = (pageWidth - textWidth) / 2;
        doc.text(data?.quiz?.title, xPosition, 10)

        // Add object data
        doc.setFontSize(14)
        let yPosition = 20
        let yMargin = 30
        doc.text('Thông tin đề ôn:', 10, yPosition)
        yPosition += 10 // Move down for the next line
        doc.text(`Mã đề ôn: ${data?.quiz?.quizId}`, 10, yPosition)
        doc.text(`Tên đề ôn: ${data?.quiz?.title}`, doc.getTextWidth(`Mã đề ôn: ${data?.quiz?.quizId}`) + yMargin, yPosition, { maxWidth: pageWidth - yMargin })
        yPosition += 10 // Move down for the next line
        doc.text(`Thời gian làm bài: ${data?.quiz?.timeLimit} phút`, 10, yPosition)
        doc.text(`Số câu hỏi: ${data?.quiz?.questionNumber}`, doc.getTextWidth(`Thời gian làm bài: ${data?.quiz?.timeLimit}`) + yMargin, yPosition)
        yPosition += 10 // Move down for the next line
        doc.text(`Ngày tạo: ${new Date(data?.quiz?.createdAt).toLocaleDateString('vi-VN')}`, 10, yPosition)
        doc.text(`Ngày cập nhật: ${new Date(data?.quiz?.updatedAt).toLocaleDateString('vi-VN')}`, doc.getTextWidth(`Ngày tạo: ${new Date(data?.quiz?.createdAt).toLocaleDateString('vi-VN')}`) + yMargin, yPosition)
        yPosition += 10 // Move down for the next line

        doc.text('Thông tin câu hỏi:', 10, yPosition)
        data?.questions.map(question => {
            if (yPosition + 10 > maxTextHeight) {
                doc.addPage();
                yPosition = 0;
            }
            yPosition += 10 // Move down for the next line
            doc.text(`Câu hỏi: ${question?.questionText}`, 10, yPosition, { maxWidth: pageWidth - yMargin })
            if (yPosition + 10 > maxTextHeight) {
                doc.addPage();
                yPosition = 0;
            }
            yPosition += 10 // Move down for the next line
            doc.text(`A: ${question?.answerTextA}`, 10, yPosition, { maxWidth: pageWidth - yMargin })
            if (yPosition + 10 > maxTextHeight) {
                doc.addPage();
                yPosition = 0;
            }
            yPosition += 10 // Move down for the next line
            doc.text(`B: ${question?.answerTextB}`, 10, yPosition, { maxWidth: pageWidth - yMargin })
            if (yPosition + 10 > maxTextHeight) {
                doc.addPage();
                yPosition = 0;
            }
            yPosition += 10 // Move down for the next line
            doc.text(`C: ${question?.answerTextC}`, 10, yPosition, { maxWidth: pageWidth - yMargin })
            if (yPosition + 10 > maxTextHeight) {
                doc.addPage();
                yPosition = 0;
            }
            yPosition += 10 // Move down for the next line
            doc.text(`D: ${question?.answerTextD}`, 10, yPosition, { maxWidth: pageWidth - yMargin })
            if (yPosition + 10 > maxTextHeight) {
                doc.addPage();
                yPosition = 0;
            }
            yPosition += 10 // Move down for the next line
            doc.text(`Đáp án: ${question?.isCorrect}`, 10, yPosition)
            if (yPosition + 10 > maxTextHeight) {
                doc.addPage();
                yPosition = 0;
            }
            yPosition += 10 // Move down for the next line
            doc.text(`Giải thích: ${question?.explanation}`, 10, yPosition, { maxWidth: pageWidth - yMargin })
        })

        // Save the PDF
        doc.save(`${data?.quiz?.title}.pdf`)
        Swal.fire({
            icon: 'success',
            title: 'Tải xuống thành công!',
            confirmButtonText: 'OK',
        })
    }

    const handleDeleteQuestion = (questionId) => {
        QuizzesAPI.deleteQuestionFromQuiz(data?.quiz?.quizId, questionId)
        .then(response => response.json())
        .then(data => {
            if (data?.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa câu hỏi khỏi đề ôn thành công",
                    showConfirmButton: false,
                    timer: 1500
                })
                .then(() => window.location.reload())
            } else {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa câu hỏi khỏi đề ôn thất bại",
                    text: data?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .catch(error => {
            console.error(error)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Xóa câu hỏi khỏi đề ôn thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    const handleEditQuestion = (questionId) => {
        setEditQuestionId(questionId)
        setIsPopupVisible(true)
    }

    const handleBackClick = () => {
        navigate('/exam');
    };

    const handleFinishEditing = () => {
        navigate('/exam');
    };

    const handleStartReviewing = () => {
        navigate("/take-exam?quiz_id=" + quizId);
    };

    const handleClosePopup = () => {
        setEditQuestionId(null)
        setIsPopupVisible(false)
    }

    return (
        <MainLayout>
            <div className="download-exam">
                <BackButton onClick={handleBackClick} aria-label="Go Back"></BackButton> 
                <DownloadButton onDownloadSuccess={handleDownloadSuccess} />
            </div>

            <div className="detail-exam">
                {
                    data?.quiz &&
                    <DetailedExamInf
                        quizId={data?.quiz?.quizId}
                        examName={data?.quiz?.title}
                        timeTaken={data?.quiz?.timeLimit}
                        totalQuestions={data?.quiz?.questionNumber}
                        attempts={data?.quiz?.attemptCount}
                        createDate={data?.quiz?.createdAt}
                        lastTime={data?.quiz?.updatedAt}
                    />
                }
            </div>

            <div className="edit-question">
                <p className="title-edit-question font-family-semibold">Chi tiết đề thi</p>
                <hr></hr>
                <div className="edit-question-space"></div>
                {
                    data?.questions.map((question, index) => (
                        <>
                            <QuestionCombo
                                key={question?.questionId} 
                                type={'pre-edit'}
                                questionNumber={index + 1}
                                questionId={question?.questionId}
                                questionContext={question?.questionText}
                                A={question?.answerTextA}
                                B={question?.answerTextB}
                                C={question?.answerTextC}
                                D={question?.answerTextD}
                                answer={question?.isCorrect}
                                onRemove={handleDeleteQuestion}
                                onEdit={handleEditQuestion}
                            />
                            <div className="edit-question-space"></div>
                        </>
                    ))
                }
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

            {
                isPopupVisible && editQuestionId && 
                <EditQuestionPopup 
                    onClose={handleClosePopup} 
                    onManualEdit={() => navigate("/edit-question?ques_id=" + editQuestionId)}
                    onChatEdit={() => navigate("/chat-eduvision?ques_id=" + editQuestionId)}
                />
            }
        </MainLayout>
    );
}
