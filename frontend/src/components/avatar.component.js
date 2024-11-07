import React from 'react';
import '../assets/css/avatar.css';

function Avatar({ name, imageUrl }) {
    const firstLetter = name ? name.charAt(0).toUpperCase() : 'A';

    return (
        <div className="avatar-container font-family-regular">
            <div className="avatar">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                    />
                ) : (
                    <span>{firstLetter}</span>
                )}
            </div>
            <div className="account-info">
                <div className="account-name font-family-semibold">{name || "User"}</div>
                <div className="account-role font-family-regular">Người tạo đăng bài</div>
            </div>
        </div>
    );
}

export default Avatar;
