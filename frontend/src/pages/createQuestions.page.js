import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MainLayout from "../layouts/main.layout";
import DocumentUploadBox from "../components/documentUploadBox.component";
import ModalLoading from "../components/modalLoading.component";
import "../assets/css/createQuestions.page.css";

export default function CreateQuestionsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Hàm mở modal loading
  const handleOpenModal = () => {
    setIsLoading(true);
  };

  // Hàm đóng modal loading
  const handleCloseModal = () => {
    setIsLoading(false);
  };

  // Hàm xử lý khi nhấn "Generate Questions"
  const handleGenerateQuestions = () => {
    handleOpenModal(); // Mở modal loading

    // Đóng modal và hiển thị thông báo sau 5 giây
    setTimeout(() => {
      handleCloseModal();

      // Hiển thị thông báo thành công
      Swal.fire({
        icon: "success",
        title: "Tạo câu hỏi thành công!",
        text: "Bạn có thể xem danh sách câu hỏi của mình.",
        confirmButtonText: "Xem danh sách câu hỏi",
        allowOutsideClick: false, // Không cho phép đóng ngoài vùng
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/question-list"); 
        }
      });
    }, 5000); // Thời gian giả lập quá trình xử lý
  };

  const handleCancelCreateQuestions = () => {
    navigate("/");
  };
  return (
    <>
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
            onGenerate={handleGenerateQuestions} 
          />
      </MainLayout>
    </>
  );
}
