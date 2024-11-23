import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../assets/css/questionList.page.css'
import MainLayout from "../layouts/main.layout";
import List from "../components/list.component";
import Button from "../components/button.component";
import CheckBox from "../components/checkBox.component";
import EditQuestionPopup from "../components/editQuestionPopup.component";
import SetupBankQuestionPopup from "../components/setupQuestionBankPopup.component";
import Swal from "sweetalert2";

export default function QuestionListPage() {
    const navigate = useNavigate();

    const [selectedQuestion, setSelectedQuestion] = useState(null);

    //QUẢN LÝ CHECKBOX
    // Quản lý trạng thái của checkbox
    const [selectedItems, setSelectedItems] = useState([]);

    // Hàm khởi tạo danh sách checkbox
    const initializeCheckboxState = () => {
        return list.data.flat().map(() => false);
    };

    useEffect(() => {
        setSelectedItems(initializeCheckboxState());
    }, []);

    // Hàm xử lý khi thay đổi trạng thái checkbox
    const handleCheckboxChange = (index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index] = !updatedItems[index];
        setSelectedItems(updatedItems);
    };

    // Hàm xử lý "Bỏ chọn"
    const handleDeselectAll = () => {
        setSelectedItems(initializeCheckboxState());
    };

    //QUẢN LÝ POPUP EDIT QUESTION
    const [showPopup, setShowPopup] = useState(false);

    const handleEdit = (key) => {
        setSelectedQuestion(key);
        setShowPopup(true); 
    };

    const handleClosePopup = () => {
        setShowPopup(false); 
    };

    //QUẢN LÝ POPUP SETUP QUESTION BANK
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    
    const handleOpenPopupQuestionBank = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopupQuestionBank = () => {
        setIsPopupVisible(false);
    };
    
    const handleCreateQuestionBank = () => {
        setIsPopupVisible(false);
        Swal.fire({
            icon: "success",
            title: "Tạo bộ câu hỏi thành công!",
            text: "Bạn có thể xem bộ câu hỏi của mình.",
            confirmButtonText: "Xem bộ câu hỏi",
            allowOutsideClick: false, 
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/question-bank"); 
            }
          });
    };

    const list = {
        sections: ["Tất cả câu hỏi", "Danh sách câu hỏi đã chọn", "Đã chọn"],
        columns: [
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
                        <span>{text}</span>
                    </span>
                )
            },
            {
                title: "Câu hỏi",
                dataIndex: "Question",
                key: "Question",
                align: "center",
                filtered: true,
                filterSearch: true
            },
            {
                title: "Ngày tạo",
                dataIndex: "date",
                key: "date",
                align: "center",
                filtered: true
            },
            {
                title: "Chi tiết",
                dataIndex: "detail",
                key: "detail",
                align: "center",
                render: (text, record) => (
                    <a 
                        className="link-effect black-color"
                        onClick={() => navigate("/question-detail?ques_id=" + record['key'])}
                    >
                        {text}
                    </a>
                )
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
                            // onClick={() => navigate("/take-exam?quiz_id" + record['key'])}
                            onClick={() => handleEdit(record.key)}
                        >
                            {text.split("-")[1]}
                        </Button>
                        <span className="ml-1"></span>
                        <Button type="warning" size="small">
                            {text.split("-")[0]}
                        </Button>
                    </span>
                )
            },
        ],
        data: [
            //Dữ liệu cho "Tất cả câu hỏi"
            [
                {
                    key: 1,
                    index: "1",
                    Question: "Mục tiêu lựa chọn đề tài?",
                    date: "15:00 18/11/2024",
                    detail: "Xem chi tiết",
                    status: "Xoá-Sửa"
                },
                {
                    key: 2,
                    index: "2",
                    Question: "Mục tiêu lựa chọn đề tài?",
                    date: "14:00 19/11/2024",
                    detail: "Xem chi tiết",
                    status: "Xoá-Sửa"
                }
            ],

            //Dữ liệu cho "Danh sách câu hỏi đã chọn"
            [
                {
                    key: 3,
                    index: "1",
                    Question: "Mục tiêu lựa chọn đề tài?",
                    date: "10:00 20/11/2024",
                    detail: "Xem chi tiết",
                    status: "Xoá-Sửa"
                },
                {
                    key: 4,
                    index: "2",
                    Question: "Mục tiêu lựa chọn đề tài?",
                    date: "11:00 20/11/2024",
                    detail: "Xem chi tiết",
                    status: "Xoá-Sửa"
                }
            ],

            // Dữ liệu cho "Đã chọn"
            []
        ]
    }
    
    return (
        <MainLayout>
            <List list={list} listTitle={'Danh sách câu hỏi'} emptyMessage={"Không có câu hỏi"} />
            {showPopup && selectedQuestion && (
                <EditQuestionPopup 
                    onClose={handleClosePopup} 
                    onManualEdit={() => navigate("/edit-question?ques_id=" + selectedQuestion.key)}
                    onChatEdit={() => navigate("/chat-eduvision?ques_id=" + selectedQuestion.key)}
                />
            )}
            <span 
                className="d-flex flex-row align-items-center justify-content-end"
                style={{ paddingRight: "50px", paddingTop: "20px"}}
            >
                <Button type="warning" size="small" onClick={handleDeselectAll}>Bỏ chọn</Button>
                <span className="ml-1"></span>
                <Button type="primary" size="small" onClick={handleOpenPopupQuestionBank}>Thêm vào bộ câu hỏi</Button>
            </span>
            <SetupBankQuestionPopup
                isVisible={isPopupVisible}
                onClose={handleClosePopupQuestionBank}
                onCreate={handleCreateQuestionBank}
            />
        </MainLayout>
    )
}
