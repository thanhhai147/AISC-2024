import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import '../assets/css/questionDetail.page.css';
import MainLayout from "../layouts/main.layout";
import SimpleTable from "../components/simpleTable.component";
import Button from "../components/button.component";
import CheckBox from "../components/checkBox.component";
import EditQuestionPopup from "../components/editQuestionPopup.component";
import SetupExamPopup from "../components/setupExamPopup.component";
import QuestionAPI from "../api/question.api";

export default function QuestionBankDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Lấy dữ liệu từ URL query string
    const queryParams = new URLSearchParams(location.search);
    const quesBankID = queryParams.get("ques_bank_id");
    const quesBankName = location.state?.title; 

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await QuestionAPI.getDetailedQuestionBank(quesBankID);
                const data = await response.json()
                setQuestions(data.data); // Cập nhật dữ liệu vào state
            } catch (error) {
                console.error("Error fetching question banks:", error);
            }
        };
        fetchQuestions();
    }, [quesBankID]);
    const listData = [];
    questions.forEach((question, index) => {
        listData.push({
            key: index + 1,
            question: question["question_text"],
            date: question["create_date"],
            detail: "Xem chi tiết",
            status: "Sửa",
            questionID : question["question_id"]
        });
    });
    console.log(listData);

    //QUẢN LÝ CHECKBOX
    // Quản lý trạng thái của checkbox
    const [selectedItems, setSelectedItems] = useState([]);

    // Hàm xử lý khi thay đổi trạng thái checkbox
    const handleCheckboxChange = (index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index] = !updatedItems[index];
        setSelectedItems(updatedItems);
    };

    // Hàm xử lý "Bỏ chọn"
    const handleDeselectAll = () => {
        setSelectedItems(selectedItems.map(() => false));
    };

    //QUẢN LÝ POPUP EDIT QUESTION
    const [showPopup, setShowPopup] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleEdit = (key) => {
        setSelectedQuestion(key);
        setShowPopup(true); 
    };

    const handleClosePopup = () => {
        setShowPopup(false); 
    };

    //QUẢN LÝ POPUP SETUP EXAM
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    
    const handleOpenPopupSetupExam = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopupSetupExam = () => {
        setIsPopupVisible(false);
    };
    
    const handleCreateExam = () => {
        setIsPopupVisible(false);
    };

    const columns = [
        {
            title: "Thứ tự",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (text, record) => (
                <span className="check-box black-color">
                    <CheckBox
                        checked={selectedItems[record.key - 1] || false}
                        onChange={() => handleCheckboxChange(record.key - 1)}
                    />
                    <span>{record.key}</span>
                </span>
            ),
        },
        {
            title: "Câu hỏi",
            dataIndex: "question",
            key: "question",
            align: "center",
        },
        {
            title: "Ngày tạo",
            dataIndex: "date",
            key: "date",
            align: "center",
        },
        {
            title: "Chi tiết",
            dataIndex: "detail",
            key: "detail",
            align: "center",
            render: (text, record) => (
                <a
                    className="link-effect black-color"
                    onClick={() =>
                        navigate(
                            "/question-detail?ques_id=" + record.questionID
                        )
                    }
                >
                    {text}
                </a>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (text, record) => (
                <span className="d-flex flex-row align-items-center justify-content-center">
                    <Button 
                        type="success" 
                        size="small" 
                        onClick={() => handleEdit(record.questionID)}
                    >
                        {text.split("-")[0]}
                    </Button>
                    <span className="ml-1"></span>
                    <Button type="warning" size="small">
                        {text.split("-")[1]}
                    </Button>
                </span>
            )
        },
    ];

    return (
        <MainLayout>
            <SimpleTable
                columns={columns}
                data={listData}
                tableTitle={quesBankName || "Chi tiết bộ câu hỏi"}
                emptyMessage={"Không có câu hỏi nào"}
            />
            {showPopup && selectedQuestion && (
                <EditQuestionPopup 
                    onClose={handleClosePopup} 
                    onManualEdit={() => navigate("/edit-question?ques_id=" + selectedQuestion)}
                    onChatEdit={() => navigate("/chat-eduvision?ques_id=" + selectedQuestion)}
                />
            )}
            <span
                className="d-flex flex-row align-items-center justify-content-end"
                style={{ paddingRight: "50px", paddingTop: "20px" }}
            >
                <Button
                    type="warning"
                    size="small"
                    onClick={handleDeselectAll}
                >
                    Bỏ chọn
                </Button>
                <span className="ml-1"></span>
                <Button 
                    type="primary" 
                    size="small"
                    onClick={handleOpenPopupSetupExam}
                >
                    Tạo đề ôn
                </Button>
            </span>
            <SetupExamPopup
                isVisible={isPopupVisible}
                onClose={handleClosePopupSetupExam}
                onCreate={handleCreateExam}
            />
        </MainLayout>
    );
}
