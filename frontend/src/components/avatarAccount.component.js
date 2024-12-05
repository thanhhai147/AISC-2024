import React, { useState, useEffect } from 'react';
import '../assets/css/avatarAccount.css';
import Avatar from './avatar.component';
import ImageUploadButton from './imageUploadButton.component';

export default function AvatarAccount({ name = '', imgUrl = '', onSetAvatar=() => {} }) {
    // State để quản lý URL ảnh
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        setImage(imgUrl) 
    }, [imgUrl])

    // Hàm xử lý file được tải lên
    const handleImageUpload = (file) => {
        if (file) {
            const imageBlob = new Blob([file], { type: file.type });
            const imageURL = URL.createObjectURL(imageBlob);
            setImage(imageURL);
            onSetAvatar(imageURL, imageBlob)
        }
    };

    return (
        <span className='avatar-account-container font-family-regular'>
            <Avatar 
                name={name}
                imageUrl={image} // Truyền URL ảnh xuống Avatar
            />
            <div className='avatar-account-import font-family-regular'>
                {/* Truyền hàm xử lý file xuống ImageUploadButton */}
                <ImageUploadButton onFileSelect={handleImageUpload} />

                <p>Tải lên file ảnh và kích thước tối đa 25MB</p>
            </div>
        </span>
    );
}

// import React, { useState } from 'react';
// import '../assets/css/avatarAccount.css';
// import Avatar from './avatar.component';
// import ImageUploadButton from './imageUploadButton.component';

// export default function AvatarAccount({ name = '', imgUrl = '' }) {
//     const [image, setImage] = useState(imgUrl);

//     // Hàm đọc file từ `selectedFile`
//     const handleImageUpload = (file) => {
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImage(reader.result); // Cập nhật URL ảnh dưới dạng Base64
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <span className="avatar-account-container font-family-regular">
//             <Avatar 
//                 name={name}
//                 imageUrl={image} // Truyền URL ảnh xuống Avatar
//             />
//             <div className="avatar-account-import font-family-regular">
//                 {/* Sử dụng ImageUploadButton như bình thường */}
//                 <ImageUploadButton 
//                     onUpload={(file) => handleImageUpload(file)} // Kết nối với hàm xử lý file
//                 />
//                 <p>Tải lên file ảnh và kích thước tối đa 5MB</p>
//             </div>
//         </span>
//     );
// }
