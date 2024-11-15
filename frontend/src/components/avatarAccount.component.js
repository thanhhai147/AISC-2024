import React from 'react';
import '../assets/css/avatarAccount.css';
import Avatar from './avatar.component';
import ImageUploadButton from './imageUploadButton.component';

export default function AvatarAccount({ 
    name = '', 
    imgUrl = '',
    
}) {
    return (
        <span className='avatar-account-container font-family-regular'>
            <Avatar 
                name={name}
                imageUrl={imgUrl}
            />
            <div className='avatar-account-impport font-family-regular'>
                <ImageUploadButton/>
                <p>Tải lên file ảnh và kích thước tối đa 5MB</p>
            </div>
        </span>
    );
}
