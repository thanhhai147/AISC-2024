import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../assets/css/questionList.page.css';
import MainLayout from "../layouts/main.layout";
import SimpleTable from "../components/simpleTable.component"; // Sử dụng component mới
import Button from "../components/button.component";
import CheckBox from "../components/checkBox.component";
import SetupExamPopup from "../components/setupExamPopup.component";
import QuestionAPI from "../api/question.api";
import { useAuth } from "../context/authentication.context";

export default function QuestionBankPage() {
    const navigate = useNavigate();
    const {userId} = useAuth()
    const [questionBanks, setQuestionBanks] = useState([]);

    useEffect(() => {
        const fetchQuestionBanks = async () => {
            try {
                const response = await QuestionAPI.getAllQuestionBank(userId);
                const data = await response.json()
                setQuestionBanks(data.data); // Cập nhật dữ liệu vào state
            } catch (error) {
                console.error("Error fetching question banks:", error);
            }
        };
        fetchQuestionBanks();
    }, [userId]);
    const listData = [];
    questionBanks.forEach((questionBank, index) => {
        listData.push({
            key: index + 1,
            index: `${index + 1}`,
            name: questionBank["title"],
            date: questionBank["create_date"],
            detail: "Xem chi tiết",
            status: "Xoá",
            questionBankID : questionBank["question_bank_id"]
        });
    });
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

    //QUẢN LÝ POPUP SETUP EXAM
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    
    const handleOpenPopup = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
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
            title: "Tên bộ câu hỏi",
            dataIndex: "name",
            key: "name",
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
                            "/question-bank-detail?ques_bank_id=" + record.questionBankID,
                            { state: { title: record.name } }
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
            render: (text) => (
                <span className="d-flex flex-row align-items-center justify-content-center">
                    <Button type="warning" size="small">
                        {text}
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <MainLayout>
            <SimpleTable
                columns={columns}
                data={listData}
                tableTitle={"Danh sách bộ câu hỏi"}
                emptyMessage={"Không có câu hỏi nào"}
            />
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
                    onClick={handleOpenPopup}
                >
                    Tạo đề ôn
                </Button>
            </span>

            <SetupExamPopup
                isVisible={isPopupVisible}
                onClose={handleClosePopup}
                onCreate={handleCreateExam}
            />
        </MainLayout>
    );
}
