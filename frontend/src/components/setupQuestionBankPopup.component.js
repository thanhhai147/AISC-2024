import React, { useState, useEffect } from "react";
import "../assets/css/setupQuestionBankPopup.css";
import Button from "./button.component";
import TextInputTitle from "./textInput&Title.component";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useAuth } from "../context/authentication.context";
import QuestionAPI from "../api/question.api"; // Import QuestionAPI
import { getLocalStorage } from "../utils/localStorage.util";
import ListItems from "./listItems.component";

export default function SetupBankQuestionPopup({ isVisible, onClose, onCreate, context, checked }) {
    const { userId } = useAuth(); // Lấy userId từ context
    const questions = getLocalStorage("questions");
    const checkedQuestions = questions.filter((_, index) => checked[index]);

    const [questionBankName, setQuestionBankName] = useState("");
    const [allQuestionBank, setAllQuestionBank] = useState([]);
    const [allQuestionBankID, setAllQuestionBankID] = useState([]);

    const handleInputChange = (e) => {
        setQuestionBankName(e.target.value); // Cập nhật state
    };
    useEffect(() => {
        QuestionAPI.getAllQuestionBank(userId)
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                setAllQuestionBank(data?.data?.map(item => (item?.title)))
                setAllQuestionBankID(data?.data?.map(item => (item?.question_bank_id)))
                console.log("Success")

            } else {
                console.log("Error")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }, [userId])
    const handleCreateQuestionBank = async () => {
        try {
            const response = await QuestionAPI.createQuestionBank(userId, questionBankName, context);
            const result = await response.json();
            const question_bank_id = result.question_bank_id;
            const response_add_questions = await QuestionAPI.addQuestion(question_bank_id, checkedQuestions);
            const result_add_questions = await response_add_questions.json();
            
            if (result.success && result_add_questions.success) {
                onCreate(questionBankName); // Gọi hàm onCreate nếu cần
                onClose(); // Đóng popup
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Tạo bộ câu hỏi thất bại!",
                    text: "Có lỗi xảy ra: " + result.message + " " + result_add_questions.message,
                });
            }
        } catch (error) {
            console.error("Lỗi khi tạo bộ câu hỏi:", error);
            Swal.fire({
                icon: "error",
                title: "Đã xảy ra lỗi!",
                text: "Vui lòng thử lại sau.",
            });
        }
    };

    const handleItemClick = (item, index) => {
        console.log(`Bạn đã click vào: ${item} tại vị trí ${index}`);
    };
    const handleExtraButtonClick = async (item, index) => {
        console.log(`Nút "Thêm" được nhấn với item: ${item}, tại index: ${allQuestionBankID[index]}`);
        try {
            const response_add_questions = await QuestionAPI.addQuestion(allQuestionBankID[index], checkedQuestions);
            const result_add_questions = await response_add_questions.json();
            
            if (result_add_questions.success) {
                onCreate(questionBankName); // Gọi hàm onCreate nếu cần
                onClose(); // Đóng popup
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Tạo bộ câu hỏi thất bại!",
                    text: "Có lỗi xảy ra: "  + result_add_questions.message,
                });
            }
        } catch (error) {
            console.error("Lỗi khi tạo bộ câu hỏi:", error);
            Swal.fire({
                icon: "error",
                title: "Đã xảy ra lỗi!",
                text: "Vui lòng thử lại sau.",
            });
        }
        // Xử lý logic tùy ý ở đây
    };
    if (!isVisible) return null;


    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <p className="popup-title font-family-semibold primary-color">Vui lòng đặt tên bộ câu hỏi</p>
                <div className="popup-content">
                    <TextInputTitle
                        title="Tên bộ câu hỏi: "
                        placeholder="Bộ câu hỏi số 1..."
                        onChange={handleInputChange} // Cập nhật giá trị tên bộ câu hỏi
                    />
                    <ListItems
                        results={allQuestionBank}
                        emptyMessage="Không có bộ câu hỏi"
                        onItemClick={handleItemClick} // Truyền hàm click cho nút chính
                        onExtraButtonClick={handleExtraButtonClick} // Truyền hàm cho nút "Thêm"
                    />
                </div>

                <div className="popup-actions">
                    <Button type="warning" size="small" onClick={onClose}>
                        Thoát
                    </Button>
                    <Button type="primary" size="small" onClick={handleCreateQuestionBank}>
                        Tạo bộ câu hỏi
                    </Button>
                </div>
            </div>
        </div>
    );
}
