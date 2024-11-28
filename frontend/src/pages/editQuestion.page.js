import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../assets/css/editQuestion.page.css';
import MainLayout from "../layouts/main.layout";
import BackButton from "../components/buttonBack.component";
import QuestionCombo from '../components/questionCombo.component'
import Button from "../components/button.component";


export default function EditQuestionPage() {
    const navigate = useNavigate();

    const handleDelete = () => {
        navigate("/question-detail"); 
    };

    const handleEdit = () => {
        navigate("/question-detail"); 
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
                    type={'edit'}
                    questionNumber={'1'}
                    questionContext={'Nêu lý do thực hiện dự án, dự án giúp giải quyết vấn đề gì trong thực tiễn? '}
                    A={'Để tạo ra hệ thống tự động đánh giá chất lượng giáo viên.'}
                    B={'Để giúp giảm bớt gánh nặng công việc cho giáo viên, tiết kiệm thời gian và công sức trong việc tạo đề thi.'}
                    C={'Để phát triển các ứng dụng giải trí cho học sinh.'}
                    D={'Để thay thế hoàn toàn giáo viên trong việc giảng dạy.'}
                    answer={'A'}
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
