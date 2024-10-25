import React, { useState } from 'react';
import '../assets/css/imageUploadButton.css'
import { LuUpload } from 'react-icons/lu';

const ImageUploadButton = () => {
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
    <div className="image-upload-button">
      <label htmlFor="image-upload" className="custom-image-upload font-family-regular">
        <LuUpload  className="icon-upload" /> Tải ảnh lên
      </label>
      <input 
        id="image-upload" 
        type="file" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />
    </div>
  );
};
export default ImageUploadButton;
