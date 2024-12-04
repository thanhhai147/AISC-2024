import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import '../assets/css/editQuestion.page.css';
import MainLayout from "../layouts/main.layout";
import BackButton from "../components/buttonBack.component";
import QuestionCombo from '../components/questionCombo.component'
import Button from "../components/button.component";
import { useAuth } from "../context/authentication.context";
import Swal from "sweetalert2";
import QuestionAPI from "../api/question.api";
import {setLocalStorage, updateLocalStorage, getLocalStorage } from "../utils/localStorage.util";

export default function EditQuestionPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const questions = getLocalStorage("questions")
    const question_temp = questions;
    const [question, setQuestion] = useState(null);
    const [questionData, setQuestionData] = useState({
        questionContext: question?.question_text || "",
        A: question?.answer_text_A || "",
        B: question?.answer_text_B || "",
        C: question?.answer_text_C || "",
        D: question?.answer_text_D || "",
        correctAnswer: question?.is_correct || ""
    });
    const urlParams = new URLSearchParams(window.location.search);
    const quesId = urlParams.get("ques_id");
    useEffect(() => {
        if (quesId.length===0){
            const quesid = location.state?.ques_id ; 
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

    useEffect(() => {
        if (question) {
            setQuestionData({
                questionContext: question.question_text,
                A: question?.answer_text_A,
                B: question?.answer_text_B,
                C: question?.answer_text_C,
                D: question?.answer_text_D,
                correctAnswer: question?.is_correct,
            });
        }
    }, [question]);
    const handleDelete = () => {
        navigate(-1); 
    };
    console.log(question);

    const handleEdit = async() => {
        question['question_text'] = questionData.questionContext
        question['answer_text_A'] = questionData.A
        question['answer_text_B'] = questionData.B
        question['answer_text_C'] = questionData.C
        question['answer_text_D'] = questionData.D
        question['is_correct'] = questionData.correctAnswer
        if (quesId.length===0){
            const quesid = location.state?.ques_id ; 
            question_temp[quesid] = question;
            updateLocalStorage("questions", question_temp);
        }
        else{
            const response = await QuestionAPI.modifyHandcraftedQuestion(question);
            const data = await response.json();
            if (data.success) {
                // Thông báo thành công
                Swal.fire({
                  icon: "success",
                  title: "Sửa câu hỏi thành công!",
                  text: data.message,
                  confirmButtonText: "OK",
                  allowOutsideClick: false, // Không cho phép đóng ngoài vùng
                });
              } else {
                // Thông báo lỗi nếu tạo câu hỏi không thành công
                Swal.fire({
                  icon: "error",
                  title: "Lỗi sửa câu hỏi",
                  text: data.message ,
                  confirmButtonText: "Thử lại",
                });
              }
        }
        navigate(-1); 
    };
    
    const handleInputChange = (field, value) => {
        setQuestionData((prev) => ({
            ...prev,
            [field]: value // Cập nhật giá trị của trường cụ thể
        }));
    };
    
    return (
        <MainLayout>
            <BackButton onClick={() => navigate(-1)} />

            <div className="question-detail-container">
                <div className="question-detail-intro">
                    <p className="Title font-family-semibold black-color">Chi tiết câu hỏi </p>
                    {/* <span className="date">
                        <p className="font-family-semibold black-color">Ngày tạo: </p>
                        <p className="font-family-regular black-color">15:46 25/8/2024</p>
                    </span> */}
                    <hr />

                </div>
            

                <QuestionCombo
                    type={'edit'}
                    questionNumber={quesId}
                    questionContext={questionData.questionContext}
                    A={questionData.A}
                    B={questionData.B}
                    C={questionData.C}
                    D={questionData.D}
                    answer={questionData.correctAnswer}
                    onChange={handleInputChange}
                />
                <span className="button-container">
                    <Button type="warning" size="small" onClick={handleDelete}>
                        Xoá
                    </Button>
                    <Button type="success" size="small" onClick={handleEdit}>
                        Cập nhật
                    </Button>
                </span>

            </div>
        </MainLayout>
    );
}
