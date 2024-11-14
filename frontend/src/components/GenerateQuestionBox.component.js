import React from 'react';
import '../assets/css/generateQuestionBox.css';
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineUpload } from "react-icons/hi";
import FileUploadButton from './fileUploadButton.component';

const GenerateQuestionBox = () => {
    return (
        <div className='box-generate-question-container '>
            <p className='font-family-semibold primary-color box-generate-question-input-text'>
              Tạo câu hỏi
            </p>
            <div className='box-generate-question-upload-container'>
                <IoDocumentTextOutline size={56} color='white'/>
                <div className='box-generate-question-upload-bar'>
                    <FileUploadButton />
                </div>
            </div>
        </div>
    );
  };
  
export default GenerateQuestionBox;