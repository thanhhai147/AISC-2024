import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../assets/css/questionDetail.page.css';
import MainLayout from "../layouts/main.layout";
import BackButton from "../components/buttonBack.component";
import QuestionCombo from '../components/questionCombo.component'
import Button from "../components/button.component";
import EditQuestionPopup from "../components/editQuestionPopup.component";

export default function QuestionDetailPage() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = () => {
        navigate("/question-list"); // Quay lại danh sách câu hỏi khi nhấn "Xoá"
    };

    const handleEdit = () => {
        setShowPopup(true); // Hiển thị popup khi nhấn "Chỉnh sửa câu hỏi"
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Đóng popup
    };

    return (
        <MainLayout>
            <BackButton onClick={() => navigate("/question-list")} />

            <div className="question-detail-container">
                <div className="question-detail-intro">
                    <p className="Title font-family-semibold black-color">Chi tiết câu hỏi 1</p>
                    <span className="date">
                        <p className="font-family-semibold black-color">Ngày tạo: </p>
                        <p className="font-family-regular black-color">15:46 25/8/2024</p>
                    </span>
                    <hr />
                </div>

                <QuestionCombo
                    type={"basic"}
                    questionNumber={"1"}
                    questionContext={"Nêu lý do thực hiện dự án, dự án giúp giải quyết vấn đề gì trong thực tiễn? "}
                    A={"Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên."}
                    B={"Để giúp giảm bớt gánh nặng công việc cho giáo viên, tiết kiệm thời gian và công sức trong việc tạo đề thi."}
                    C={"Để phát triển các ứng dụng giải trí cho học sinh."}
                    D={"Để thay thế hoàn toàn giáo viên trong việc giảng dạy."}
                    answer={"A"}
                />

                <span className="button-container">
                    <Button type="warning" size="small" onClick={handleDelete}>
                        Xoá
                    </Button>
                    <Button type="success" size="small" onClick={handleEdit}>
                        Chỉnh sửa câu hỏi
                    </Button>
                </span>

                {showPopup && (
                    <EditQuestionPopup
                        onClose={handleClosePopup}
                        onManualEdit={() => navigate("/edit-question")}
                        onChatEdit={() => navigate("/chat-eduvision")}
                    />
                )}
            </div>
        </MainLayout>
    );
}
