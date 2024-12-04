import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MainLayout from "../layouts/main.layout";
import DocumentUploadBox from "../components/documentUploadBox.component";
import ModalLoading from "../components/modalLoading.component";
import "../assets/css/createQuestions.page.css";
import QuestionAPI from "../api/question.api"; // Import QuestionAPI
import { useAuth } from "../context/authentication.context";

import { updateLocalStorage } from "../utils/localStorage.util";

export default function CreateQuestionsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setGeneratedQuestions, setGeneratedContext } = useAuth();  // Lấy hàm setGeneratedQuestions từ context

  // Hàm mở modal loading
  const handleOpenModal = () => {
    setIsLoading(true);
  };

  // Hàm đóng modal loading
  const handleCloseModal = () => {
    setIsLoading(false);
  };

  // Hàm xử lý khi nhấn "Generate Questions"
  const handleGenerateQuestions = async (uploadedFiles, toggleChecked) => {
    handleOpenModal(); // Mở modal loading

    try {
      // Giữ nguyên dữ liệu base64
      const files = uploadedFiles.map(file => ({
        file_name: file.file_name,
        file_size_mb: file.file_size_mb,
        file_content: file.file_content, // Giữ nguyên base64 của file
      }));

      // Gọi API để tạo câu hỏi
      const response = await QuestionAPI.generateQuestions(files, toggleChecked);
      const data = await response.json();

      // Lưu câu hỏi vào context
      updateLocalStorage('questions', data.questions);
      updateLocalStorage('context', data.context);
      
      setGeneratedQuestions(data.questions);
      setGeneratedContext(data.context);

      // Đóng modal và hiển thị thông báo sau khi nhận kết quả
      setTimeout(() => {
        handleCloseModal();

        if (data.success) {
          // Thông báo thành công
          Swal.fire({
            icon: "success",
            title: "Tạo câu hỏi thành công!",
            text: "Bạn có thể xem danh sách câu hỏi của mình.",
            confirmButtonText: "Xem danh sách câu hỏi",
            allowOutsideClick: false, // Không cho phép đóng ngoài vùng
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/question-list", { state: { context: data.context } }); // Điều hướng đến trang danh sách câu hỏi
            }
          });
        } else {
          // Thông báo lỗi nếu tạo câu hỏi không thành công
          Swal.fire({
            icon: "error",
            title: "Lỗi tạo câu hỏi",
            text: data.message || "Có lỗi xảy ra khi tạo câu hỏi.",
            confirmButtonText: "Thử lại",
          });
        }
      }, 5000); // Thời gian giả lập quá trình xử lý

    } catch (error) {
      console.error("Error while generating questions:", error);
      handleCloseModal(); // Đóng modal khi có lỗi
      Swal.fire({
        icon: "error",
        title: "Lỗi kết nối",
        text: "Không thể tạo câu hỏi, vui lòng thử lại sau.",
        confirmButtonText: "Thử lại",
      });
    }
  };

  const handleCancelCreateQuestions = () => {
    navigate("/");  // Quay về trang chủ
  };

  return (
    <MainLayout>
      {/* Hiển thị ModalLoading */}
      {isLoading && (
        <ModalLoading
          title="Đang tạo câu hỏi..."
          message="Quá trình này có thể mất vài giây. Vui lòng đợi!"
          isOpen={isLoading}
          onClose={handleCloseModal}
        />
      )}

      {/* Component Upload Box */}
      <DocumentUploadBox
        onNavigate={handleCancelCreateQuestions}
        onGenerate={handleGenerateQuestions} // Truyền handleGenerateQuestions vào
      />
    </MainLayout>
  );
}
