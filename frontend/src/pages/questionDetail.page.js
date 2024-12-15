import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import '../assets/css/questionDetail.page.css';
import MainLayout from "../layouts/main.layout";
import BackButton from "../components/buttonBack.component";
import QuestionCombo from '../components/questionCombo.component'
import Button from "../components/button.component";
import EditQuestionPopup from "../components/editQuestionPopup.component";
import { useAuth } from "../context/authentication.context";
import QuestionAPI from "../api/question.api";
import { getLocalStorage } from "../utils/localStorage.util";


export default function QuestionDetailPage() {
    const location = useLocation(); // Lấy dữ liệu từ location state
    const questions = getLocalStorage("questions")
    const [question, setQuestion] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);
    const quesId = urlParams.get("ques_id");
    useEffect(() => {
        if (quesId.length===0){
            const quesid = location.state?.ques_id ; 
            console.log(quesid);
            setQuestion(questions[quesid]);
    
        }
        else{
            const fetchQuestion = async () => {
                try {
                    const response = await QuestionAPI.getDetailedQuestion(quesId);
                    const data = await response.json()
                    setQuestion(data.data); // Cập nhật dữ liệu vào state
                } catch (error) {
                    console.error("Error fetching question banks:", error);
                }
            };
            fetchQuestion();

        }
    }, [quesId]);
 
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = () => {
        navigate(-1); // Quay lại danh sách câu hỏi khi nhấn "Xoá"
    };

    const handleEdit = () => {
        setShowPopup(true); // Hiển thị popup khi nhấn "Chỉnh sửa câu hỏi"
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Đóng popup
    };
    return (
        <MainLayout>
            <div className="question-detail-back-button">
                <BackButton onClick={() => navigate(-1)} />
            </div>

            <div className="question-detail-container">
                <div className="question-detail-intro">
                    <p className="Title font-family-semibold black-color">Chi tiết câu hỏi</p>
                    <hr />
                </div>

                {
                    question ?
                    <QuestionCombo
                        type={"basic"}
                        questionId={`${quesId}`}
                        questionContext={`${question?.['question_text']}`}
                        A={`${question?.['answer_text_A']}`}
                        B={`${question?.['answer_text_B']}`}
                        C={`${question?.['answer_text_C']}`}
                        D={`${question?.['answer_text_D']}`}
                        answer={`${question?.is_correct}`}
                    /> : null
                }
              
                <span className="button-container">
                    <Button type="warning" size="small" onClick={handleDelete}>
                        {quesId.length === 0 ? "Hủy bỏ" : "Xóa"}
                    </Button>
                    <Button type="success" size="small" onClick={handleEdit}>
                        Chỉnh sửa câu hỏi
                    </Button>
                </span>

                {showPopup && (
                    <EditQuestionPopup
                        onClose={handleClosePopup}
                        onManualEdit={() => navigate("/edit-question?ques_id=" + quesId, { state: { ques_id: location.state?.ques_id} })}
                        onChatEdit={() => navigate("/chat-eduvision?ques_id=" + quesId, { state: { ques_id: location.state?.ques_id} })}
                    />
                )}
            </div>
        </MainLayout>
    );
}
