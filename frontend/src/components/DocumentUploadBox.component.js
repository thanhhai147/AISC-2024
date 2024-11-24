import React, { useState } from 'react';
import '../assets/css/documentUploadBox.css';
import Button from './button.component';
import FileImage from '../assets/img/file_image.svg'
import Toggle from './toggle.component';
const DocumentUploadBox = () => {
    const [hover, setHover] = useState({
        'exit': false,
        'generate': false,
    })

    const handleMouseEnter = (type) => {
        setHover((prevHover) => ({
            ...prevHover,
            [type]: true,
        }))
    }

    const handleMouseLeave = (type) => {
        setHover((prevHover) => ({
            ...prevHover,
            [type]: false,
        }))
    }
    return (
        <div className='box-document-upload'>
            <h className='font-family-semibold primary-color box-document-upload-input-text'>
              Tạo câu hỏi
            </h>
            <div className='box-document-upload-container foreground-color'>
                <h className='font-family-regular box-document-upload-container-input-text'>
                    Hệ thống sẽ tạo câu hỏi trắc nghiệm dựa trên kết quả xử lý tài liệu bên dưới
                </h>
                <img src={FileImage} style={{ width: '460px' , height: '557px'}} />
                <h className='font-family-light' style={{ fontSize: '20px' }} >
                    Thuyết minh dự án AISC.docx
                </h>
                <div className="toggle-container">
                    <Toggle />
                    <p className='font-family-semibold primary-color'>Tìm kiếm thông tin bổ sung</p>
                </div>

                <div className='box-document-upload-container-button'>
                    <Button 
                        type='warning' 
                        size='large' 
                        status={hover['exit'] ? 'disabled' : 'active'}
                        onMouseEnter={() => handleMouseEnter('exit')}
                        onMouseLeave={() => handleMouseLeave('exit')}
                    >
                        Hủy bỏ
                    </Button>
                    <Button 
                        type='primary' 
                        size='large' 
                        status={hover['generate'] ? 'disabled' : 'active'}
                        onMouseEnter={() => handleMouseEnter('generate')}
                        onMouseLeave={() => handleMouseLeave('generate')}
                    >
                        Tạo câu hỏi
                    </Button>
                </div>
            </div>
        </div>
    );
  };
  
export default DocumentUploadBox;