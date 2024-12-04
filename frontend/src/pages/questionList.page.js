import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import '../assets/css/questionList.page.css';
import MainLayout from "../layouts/main.layout";
import List from "../components/list.component";
import Button from "../components/button.component";
import CheckBox from "../components/checkBox.component";
import EditQuestionPopup from "../components/editQuestionPopup.component";
import SetupBankQuestionPopup from "../components/setupQuestionBankPopup.component";
import Swal from "sweetalert2";
import { useAuth } from "../context/authentication.context";
import { getLocalStorage } from "../utils/localStorage.util";
 

export default function QuestionListPage() {  
    const location = useLocation(); 
    const context = getLocalStorage("context");
    // const { questions } = useAuth(); 
    const questions = getLocalStorage("questions")
    const navigate = useNavigate();
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    // QUẢN LÝ CHECKBOX
    const [selectedItems, setSelectedItems] = useState([]);

    // Hàm khởi tạo danh sách checkbox
    const initializeCheckboxState = () => {
        return questions.map(() => true); // Chọn tất cả
    };

    const removeclickCheckboxState = () => {
        return questions.map(() => false); // Mỗi câu hỏi có checkbox chưa chọn
    };

    useEffect(() => {
        setSelectedItems(initializeCheckboxState()); // Khởi tạo lại selectedItems khi questions thay đổi
    }, [questions]);

    // Hàm xử lý khi thay đổi trạng thái checkbox
    const handleCheckboxChange = (index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index] = !updatedItems[index];
        setSelectedItems(updatedItems);
    };

    // Hàm xử lý "Bỏ chọn"
    const handleDeselectAll = () => {
        setSelectedItems(removeclickCheckboxState());
    };

    // QUẢN LÝ POPUP EDIT QUESTION
    const [showPopup, setShowPopup] = useState(false);
    
    const handleEdit = (key) => {
        setSelectedQuestion(key);
        setShowPopup(true); 
    };

    const handleClosePopup = () => {
        setShowPopup(false); 
    };

    // QUẢN LÝ POPUP SETUP QUESTION BANK
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

    const data = [];
    questions.forEach((question, index) => {
        data.push({
            key: index + 1,
            index: `${index + 1}`,
            Question: question['question_text'],
            detail: "Xem chi tiết",
            status: "Sửa"
        });
    });
      
    const list = {
        sections: [
            "Tất cả câu hỏi",
            `Đã chọn (${selectedItems.filter(item => item).length})` // Đếm số checkbox được chọn
        ],
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
                title: "Chi tiết",
                dataIndex: "detail",
                key: "detail",
                align: "center",
                render: (text, record) => (
                    <a 
                        className="link-effect black-color"
                        onClick={() => navigate("/question-detail?ques_id=", { state: { ques_id: record["key"] - 1} } )}
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
                            onClick={() => handleEdit(record['key'])}
                        >
                            {text}
                        </Button>
                    </span>
                )
            },
        ],
        data: [
            data
        ]
    }
    
    return (
        <MainLayout>
            <List list={list} listTitle={'Danh sách câu hỏi'} emptyMessage={"Không có câu hỏi"} />
            {showPopup && selectedQuestion && (
                <EditQuestionPopup 
                    onClose={handleClosePopup} 
                    onManualEdit={() => navigate("/edit-question?ques_id=" + selectedQuestion, { state: { question: questions[selectedQuestion] } })}
                    onChatEdit={() => navigate("/chat-eduvision?ques_id=" + selectedQuestion, { state: { question: questions[selectedQuestion] } })}
                />
            )}
            <span 
                className="d-flex flex-row align-items-center justify-content-end"
                style={{ paddingRight: "50px", paddingTop: "20px" }}
            >
                <Button type="warning" size="small" onClick={handleDeselectAll}>Bỏ chọn</Button>
                <span className="ml-1"></span>
                <Button type="primary" size="small" onClick={handleOpenPopupQuestionBank}>Thêm vào bộ câu hỏi</Button>
            </span>
            <SetupBankQuestionPopup
                context={context}
                isVisible={isPopupVisible}
                onClose={handleClosePopupQuestionBank}
                onCreate={handleCreateQuestionBank}
            />
        </MainLayout>
    );
}
