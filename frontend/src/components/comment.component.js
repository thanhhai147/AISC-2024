import React, { useState, useEffect } from 'react';
import TextInput from './textInput.component';
import '../assets/css/comment.css';
import Button from './button.component';
import ForumAPI from '../api/forum.api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/authentication.context';

const Comment = ({ postId, onCreateComment=() => {}, onCloseComment=() => {} }) => {
    const { userId } = useAuth() 
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateComment = () => {
        setIsLoading(true)
        ForumAPI.createComment(userId, postId, comment)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data?.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tạo bình luận thành công",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Tạo bình luận thất bại",
                    text: data?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .catch(error => {
            console.error(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Tạo bình luận thất bại",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .finally(() => {
            onCreateComment()
            setIsLoading(false)
        })
    }

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
                    type='warning' 
                    size='small'
                    status={isLoading ? 'disabled' : 'active'}
                    onClick={onCloseComment}
                >
                    Đóng
                </Button>
                <Button 
                    type='success' 
                    size='small'
                    status={isLoading ? 'disabled' : 'active'}
                    onClick={handleCreateComment}
                >
                    Đăng
                </Button>
            </div>
        </div>
    );
};

export default Comment;
