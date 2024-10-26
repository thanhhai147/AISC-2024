import React, { useState } from 'react';
import '../assets/css/fileUploadButton.css';
import { LuUpload } from 'react-icons/lu';

const FileUploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = (file) => {
    console.log('Uploading:', file);
  };

  return (
    <div className="file-upload-button">
      <label htmlFor="file-upload" className="custom-file-upload font-family-regular">
        <LuUpload  className="icon-upload" /> Chọn các tệp
      </label>
      <input 
        id="file-upload" 
        type="file" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />
    </div>
  );
};
export default FileUploadButton;
