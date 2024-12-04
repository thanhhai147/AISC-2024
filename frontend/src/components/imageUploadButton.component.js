import React from 'react';
import '../assets/css/imageUploadButton.css';
import { LuUpload } from 'react-icons/lu';

const ImageUploadButton = ({ onFileSelect }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && typeof onFileSelect === 'function') {
            onFileSelect(file); // Gửi file lên component cha
        }
    };

    return (
        <div className="image-upload-button">
            <label htmlFor="image-upload" className="custom-image-upload font-family-regular">
                <LuUpload className="icon-upload" /> Tải ảnh lên
            </label>
            <input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} // Gọi hàm khi file được chọn
                style={{ display: 'none' }} 
            />
        </div>
    );
};

export default ImageUploadButton;
