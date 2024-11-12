import React from 'react';
import '../assets/css/postArticle.css';
import TextInput from './textInput.component';
import ImageUploadButton from './imageUploadButton.component';
 

const PostArticle = () => {
    return (
    <div className="post-article-wrapper">
        <div className='title-article'> 
            <TextInput 
                placeholder='Tiêu đề'
            />
        </div>
        <div className='image'>
            <ImageUploadButton/>
        </div>
        <div className='detail-article'>
            <TextInput 
                placeholder='Nội dung chi tiết'
            />
        </div>
        
    </div>
      
    );
  };
  
  export default PostArticle;
