import React, { useState } from "react";
import '../assets/css/detailedExamInf.css';
import Button from "./button.component";
import SetupExamPopup from "./setupExamPopup.component";
import QuizzesAPI from "../api/quizzes.api";
import Swal from "sweetalert2";

export default function DetailedExamInf({ quizId, examName, timeTaken, totalQuestions, attempts, createDate, lastTime }) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    
    const handleOpenPopup = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };
    
    const handleCreateExam = (examName, examTime) => {
        QuizzesAPI.editQuiz(quizId, examName, examTime)
        .then(response => response.json())
        .then(data => {
            if (data?.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật thông tin đề ôn thành công",
                    showConfirmButton: false,
                    timer: 1500
                })
                .then(() => {
                    setIsPopupVisible(false)
                    window.location.reload()
                })
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Cập nhật thông tin đề ôn thất bại",
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
                title: "Cập nhật thông tin đề ôn thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    };

    return (
        <div className="exam-details-container">
            <div className="exam-details-wrapper">
                <p className="title-exam font-family-semibold">Thông tin đề thi</p>

                <div className="exam-details-section-container">
                    <div className="exam-details-section">
                        <div className="exam-details-info font-family-semibold">
                            <div>Tên đề: </div>
                            <div className="exam-details-value font-family-regular">{examName}</div>
                        </div>

                        <div className="exam-details-info font-family-semibold">
                            <div>Thời gian làm bài (phút): </div>
                            <div className="exam-details-value font-family-regular">{timeTaken}</div>
                        </div>

                        <div className="exam-details-info font-family-semibold">
                            <div>Số lượng câu hỏi: </div>
                            <div className="exam-details-value font-family-regular">{totalQuestions} câu</div>
                        </div>
                    </div>
                    <div className="exam-details-section">
                        <div className="exam-details-info font-family-semibold">
                            <div>Số lượt làm đề: </div>
                            <div className="exam-details-value font-family-regular">{attempts}</div>
                        </div>

                        <div className="exam-details-info font-family-semibold">
                            <div>Ngày tạo: </div>
                            <div className="exam-details-value font-family-regular">{new Date(createDate).toLocaleDateString('vi-Vn')}</div>
                        </div>

                        <div className="exam-details-info font-family-semibold">
                            <div>Lần truy cập cuối: </div>
                            <div className="exam-details-value font-family-regular">{new Date(lastTime).toLocaleDateString('vi-Vn')}</div>
                        </div>
                    </div>
                </div>
                

                

                <Button
                    type='success'
                    size='small'
                    status={'active'}
                    onClick={handleOpenPopup}
                >
                    Chỉnh sửa thông tin
                </Button>
                <SetupExamPopup
                    isVisible={isPopupVisible}
                    onClose={ handleClosePopup}
                    onCreate={handleCreateExam}
                    popupTitle="Chỉnh sửa thông tin đề ôn"
                    nameLabel="Tên đề ôn:"
                    timeLabel="Thời gian làm bài (phút):"
                    placeholderName="Nhập tên đề ôn"
                    placeholderTime="Nhập thời gian làm bài"
                    buttonCancelText="Hủy bỏ"
                    buttonCreateText="Hoàn tất chỉnh sửa"
                />
            </div>
        </div>
    );
}
