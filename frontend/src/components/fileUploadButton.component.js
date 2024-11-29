// import React, { useState } from 'react';
// import '../assets/css/fileUploadButton.css';
// import { LuUpload } from 'react-icons/lu';

// const FileUploadButton = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);

//     if (file) {
//       handleUpload(file);
//     }
//   };

//   const handleUpload = (file) => {
//     console.log('Uploading:', file);
//   };

//   return (
//     <div className="file-upload-button">
//       <label htmlFor="file-upload" className="custom-file-upload font-family-regular">
//         <LuUpload  className="icon-upload" /> Chọn các tệp
//       </label>
//       <input 
//         id="file-upload" 
//         type="file" 
//         onChange={handleFileChange} 
//         style={{ display: 'none' }} 
//       />
//     </div>
//   );
// };
// export default FileUploadButton;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLoading from "../components/modalLoading.component";
import "../assets/css/fileUploadButton.css";
import { LuUpload } from "react-icons/lu";

const FileUploadButton = ({ path = "/create-questions" }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    handleUpload(file);
  };

  const handleModalClose = () => {
    setIsUploading(false);
  };

  const handleUpload = async (file) => {
    setIsUploading(true);

    try {
      // Giả lập gọi API tải lên
      const response = await new Promise((resolve) =>
        // setTimeout(() => resolve({ success: true, quiz_id: "12345" }), 3000)
        setTimeout(() => resolve({ success: true }), 3000)
      );

      if (response.success) {
        // const { quiz_id } = response;
        // navigate(`${path}?quiz_id=${quiz_id}`, { state: { file } });
        navigate(`${path}`, { state: { file } });
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error during upload:", error);
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
