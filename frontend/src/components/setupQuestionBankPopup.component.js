import React, { useState } from "react";
import "../assets/css/setupQuestionBankPopup.css";
import Button from "./button.component";
import TextInputTitle from "./textInput&Title.component";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useAuth } from "../context/authentication.context";
import QuestionAPI from "../api/question.api"; // Import QuestionAPI
import { getLocalStorage } from "../utils/localStorage.util";
export default function SetupBankQuestionPopup({ isVisible, onClose, onCreate, context, checked}) {
    const { userId } = useAuth(); // Lấy userId từ context
    const questions = getLocalStorage("questions");
    const checkedQuestions = questions.filter((_, index) => checked[index]);

    const [questionBankName, setQuestionBankName] = useState("");
    const handleInputChange = (e) => {
        const newValue = e.target.value; // Lấy giá trị từ sự kiện
        setQuestionBankName(newValue); // Cập nhật state
    };

    const handleCreateQuestionBank = async () => {
        try {
            // Gọi API createQuestionBank với các tham số userId, questionBankName và context
            const response = await QuestionAPI.createQuestionBank(userId, questionBankName, context);
            // Kiểm tra phản hồi từ API (giả sử API trả về dữ liệu JSON)
            const result = await response.json();
            const question_bank_id = result.question_bank_id
            const response_add_questions = await QuestionAPI.addQuestion(question_bank_id, checkedQuestions);
            const result_add_questions = await response_add_questions.json()
            console.log(question_bank_id, checkedQuestions)
            if (result.success && result_add_questions.success) {
                onCreate(questionBankName); // Gọi hàm onCreate nếu cần
                onClose(); // Đóng popup
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Tạo bộ câu hỏi thất bại!",
                    text: "Có lỗi xảy ra khi tạo bộ câu hỏi." + result.message + " " + result_add_questions.message,
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

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <p className="popup-title font-family-semibold primary-color">Vui lòng đặt tên bộ câu hỏi</p>
                <div className="popup-content">
                    <TextInputTitle
                        title="Tên bộ câu hỏi: "
                        placeholder="Bộ câu hỏi số 1..."
                        value={questionBankName}
                        onChange={handleInputChange} // Cập nhật giá trị tên bộ câu hỏi
                    />
                </div>
                <div className="popup-actions">
                    <Button type="warning" size="small" onClick={onClose}>
                        Thoát
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={handleCreateQuestionBank} // Gọi hàm tạo bộ câu hỏi
                    >
                        Tạo bộ câu hỏi
                    </Button>
                </div>
            </div>
        </div>
    );
}
