import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLoading from "../components/modalLoading.component";
import "../assets/css/fileUploadButton.css";
import { LuUpload } from "react-icons/lu";
import QuestionAPI from "../api/question.api"; 
import Swal from "sweetalert2";
import { useAuth } from "../context/authentication.context";

const FileUploadButton = ({ path = "/create-questions" }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const { setGeneratedContext } = useAuth();  
  const navigate = useNavigate();

  const handleFileChange = (event) => {
      const files = Array.from(event.target.files); // Lấy danh sách file
      if (!files || files.length === 0) return;

      setSelectedFile(files); // Cập nhật state
      event.target.value = null;

      handleUpload(files);    // Gọi upload
  };

  const handleModalClose = () => {
      setIsUploading(false);
  };

  const handleUpload = async (files) => {
    setIsUploading(true);
    setSelectedFile(null);

    try {
        const response = await QuestionAPI.uploadImages(files);
        const result = await response.json();

        if (response.ok && result.success) {
            // Upload thành công
            Swal.fire({
                icon: "success",
                title: "Tải lên thành công",
                text: "Các tệp đã được tải lên thành công!",
            });

            navigate(`${path}`, { state: { uploadedFiles: result.data } });
        } else {
            // Hiển thị lỗi từ backend
            Swal.fire({
                icon: "error",
                title: "Lỗi tải lên",
                text: result.message,
            });
        }
    } catch (error) {
        // Xử lý lỗi không mong muốn
        Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Đã xảy ra lỗi trong quá trình tải tệp lên: "+ error,
        });
    } finally {
        setIsUploading(false);
    }
};

  return (
      <div className="file-upload-button">
          <label htmlFor="file-upload" className="custom-file-upload font-family-regular">
              <LuUpload className="icon-upload" /> Chọn các tệp
          </label>
          <input 
              id="file-upload" 
              type="file" 
              multiple 
              onChange={handleFileChange} 
              style={{ display: "none" }} 
          />

          {/* Sử dụng ModalLoading */}
          <ModalLoading
              isOpen={isUploading}
              onClose={handleModalClose} 
          />
      </div>
  );
};

export default FileUploadButton;