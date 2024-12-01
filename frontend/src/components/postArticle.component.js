import React from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../assets/css/postArticle.css';
import TextInput from './textInput.component';
import ImageUploadButton from './imageUploadButton.component';
import Button from './button.component'; 

const PostArticle = () => {
    const handlePostSubmit = () => {
        Swal.fire({
            title: 'Đăng bài thành công!',
            text: 'Bài viết của bạn đã được đăng.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    return (
        <div className="post-article-wrapper">
            <div className='title-article'> 
                <TextInput 
                    placeholder='Tiêu đề'
                />
            </div>
            <div className='image'>
                <ImageUploadButton />
            </div>
            <div className='detail-article'>
                <TextInput 
                    placeholder='Nội dung chi tiết'
                />
            </div>
            <div className='btn_post_article'>
                <Button
                    type='success'
                    size='small'
                    onClick={handlePostSubmit}
                >
                    Đăng
                </Button>
                <Button
                    type='primary'
                    size='small'
                >
                    Quay lại
                </Button>
            </div>
        </div>
    );
};

export default PostArticle;
