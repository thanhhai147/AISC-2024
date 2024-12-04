import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ForumAPI from '../api/forum.api';
import { useAuth } from '../context/authentication.context';
import { Image } from 'antd'
import { IoIosRemoveCircle } from "react-icons/io";
import '../assets/css/postArticle.css';
import TextInput from './textInput.component';
import ImageUploadButton from './imageUploadButton.component';
import Button from './button.component'; 

const PostArticle = () => {
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const { userId } = useAuth()

    const handlePostSubmit = () => {
        ForumAPI.createPost(userId, title, content, images)
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                Swal.fire({
                    title: 'Đăng bài thành công!',
                    text: 'Bài viết của bạn đã được đăng.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.reload()
            } else {
                console.log(data.message)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Tạo bài viết thất bại",
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
                title: "Tạo bài viết thất bại",
                showConfirmButton: false,
                timer: 1500
            })
        })        
    };

    const handleImageUpload = (file) => {
        if (file) {
            const imageBlob = new Blob([file], { type: file.type })
            const imageURL = URL.createObjectURL(imageBlob)
            let updatedImages = images
            updatedImages.push(imageBlob)
            setImages(updatedImages)
            setImageURLs(prevImageURLs => (
                [
                    ...prevImageURLs,
                    imageURL
                ]
            ))
        }
    };

    const handleRemoveImage = (removeIndex) => {
        let updatedImages = images.filter((image, index) => {
            if (index !== removeIndex) return image
        })
        let updatedImageURLs = imageURLs.filter((imageURL, index) => {
            if (index !== removeIndex) return imageURL
        })
        setImages(updatedImages)
        setImageURLs(updatedImageURLs)
    }

    return (
        <div className="post-article-wrapper">
            <div className='title-article'> 
                <TextInput 
                    placeholder='Tiêu đề'
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className='image'>
                <div 
                    className={`image-show ${imageURLs ? 'image-show-margin' : ''}`}
                >
                    {
                        imageURLs &&
                        imageURLs.map((imageURL, index) => (
                            <div className='image-wrapper' key={`image-${index}`}>
                                <Image width={200} src={imageURL} />
                                <IoIosRemoveCircle className='remove-image-icon' size={30} onClick={() => handleRemoveImage(index)} />
                            </div>
                        ))
                    }
                </div>
                <div className='image-upload-button'>
                    <ImageUploadButton 
                        onFileSelect={handleImageUpload}
                    />
                </div>
            </div>
            <div className='detail-article'>
                <TextInput 
                    placeholder='Nội dung chi tiết'
                    onChange={e => setContent(e.target.value)}
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
            </div>
        </div>
    );
};

export default PostArticle;
