import React, { useState } from 'react';
import '../assets/css/GenerateQuestionBox.css';
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineUpload } from "react-icons/hi";

const GenerateQuestionBox = () => {
    return (
        <div className='box-generate-question-container '>
            <h className='font-family-semibold primary-color box-generate-question-input-text'>
              Tạo câu hỏi
            </h>
            <div className='box-generate-question-upload-container'>
                <IoDocumentTextOutline size={56} color='white'/>
                <div className='box-generate-question-upload-bar'>
                <button 
                    className={'box-generate-question-upload-button'}
                >
                    <HiOutlineUpload size={16} />
                    <input
                        type = 'text'
                        className={'box-generate-question-upload-input-text font-family-regular'}
                        value='Chọn các tệp'
                    />
                </button>
                </div>
            </div>
        </div>
    );
  };
  
export default GenerateQuestionBox;