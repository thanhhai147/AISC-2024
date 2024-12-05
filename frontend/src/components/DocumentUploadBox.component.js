import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';  // Import CSS cho Viewer
import '../assets/css/documentUploadBox.css';
import Button from './button.component.js';
import Toggle from './toggle.component.js'; // Import Toggle component
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const pdfjsWorker = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

const DocumentUploadBox = ({ onNavigate, onGenerate }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const location = useLocation(); // Lấy dữ liệu từ location state
  const uploadedFiles = location.state?.uploadedFiles || []; // Lấy uploadedFiles từ state
  const [fileDetails, setFileDetails] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null); // Thêm state để lưu trữ PDF preview
  const [toggleChecked, setToggleChecked] = useState(false);  // Thêm state cho toggle

  useEffect(() => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      const file = uploadedFiles[0];  // Giả sử chỉ lấy tệp đầu tiên nếu có nhiều tệp
      setFileDetails(file);  // Lưu thông tin tệp

      // Kiểm tra loại tệp và xử lý hình ảnh hoặc PDF
      if (file.file_name.endsWith('.pdf')) {
        const pdfData = `data:application/pdf;base64,${file.file_content}`;
        setPdfPreview(pdfData); // Gán preview PDF
      } 
      else if (file.file_name.endsWith('.jpg') || file.file_name.endsWith('.jpeg') || file.file_name.endsWith('.png')) {
        const imgData = `data:image/jpeg;base64,${file.file_content}`;
        setImagePreview(imgData); // Gán preview ảnh
      }
    }
  }, [uploadedFiles]);

  const handleToggleChange = (checked) => {
    setToggleChecked(checked); // Cập nhật trạng thái của Toggle
  };

  const handleGenerateQuestions = async () => {
    onGenerate(uploadedFiles, toggleChecked); // Gọi hàm handleGenerateQuestions từ CreateQuestionsPage
  };

  return (
    <div className='box-document-upload'>
      <h className='font-family-semibold primary-color box-document-upload-input-text'>
        Tạo câu hỏi
      </h>
      <div className='box-document-upload-container foreground-color'>
        <h className='font-family-regular box-document-upload-container-input-text'>
          Hệ thống sẽ tạo câu hỏi trắc nghiệm dựa trên kết quả xử lý tài liệu bên dưới
        </h>

        {pdfPreview ? (
          <div style={{ width: '60%', height: '60%' }}>
            <Worker workerUrl={pdfjsWorker}>
              <Viewer 
                fileUrl={pdfPreview} 
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </div>
        ) : (
          <img src={imagePreview} alt="Preview" style={{ width: '40%', height: 'auto' }} />
        )}

        <h className='font-family-light' style={{ fontSize: '20px' }}>
          {fileDetails ? fileDetails.file_name : 'Tên tệp'}
        </h>

        <div className="toggle-container">
          <Toggle checked={toggleChecked} onChange={handleToggleChange} />
          <p className='font-family-semibold primary-color'>Tìm kiếm thông tin bổ sung</p>
        </div>

        <div className='box-document-upload-container-button'>
          <Button
            type='warning'
            size='large'
            status='active'
            onClick={onNavigate}
          >
            Hủy bỏ
          </Button>
          <Button
            type='primary'
            size='large'
            status='active'
            onClick={handleGenerateQuestions}  // Gọi hàm để tạo câu hỏi
          >
            Tạo câu hỏi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadBox;
