import React, { useState } from 'react';
import TextInput from './textInput.component';
import '../assets/css/comment.css';
import Button from './button.component';

const Comment = () => {
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState({
        exit: false,
        generate: false,
    });

    const handleMouseEnter = (type) => {
        setHover((prevHover) => ({
            ...prevHover,
            [type]: true,
        }));
    };

    const handleMouseLeave = (type) => {
        setHover((prevHover) => ({
            ...prevHover,
            [type]: false,
        }));
    };

    const handleInputChange = (event) => {
        setComment(event.target.value); 
    };

    return (
        <div className="comment-container"> 
            <p className='title font-family-semibold'>Trả lời</p>
            <TextInput 
                placeholder="Nhập bình luận của bạn..." 
                width="1062px" 
                onChange={handleInputChange} 
            />
            <div className="button-container">
                <Button 
                    type='success' 
                    size='small'
                    status={hover.generate ? 'disabled' : 'active'}
                    onMouseEnter={() => handleMouseEnter('generate')}
                    onMouseLeave={() => handleMouseLeave('generate')}
                >
                    Đăng
                </Button>
            </div>
        </div>
    );
};

export default Comment;
