import React from 'react';
import '../assets/css/avatar.css';

function Avatar({ name="A", imageUrl, timestamp, type="post" }) {
    const date = new Date(timestamp)
    return (
        <div className="avatar-container font-family-regular">
            <div className="avatar">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                    />
                ) : (
                    <span>{name.charAt(0).toUpperCase()}</span>
                )}
            </div>
            <div className="account-info">
                <div className="account-name font-family-semibold">{name || "User"}</div>
                <div className="account-role font-family-regular">{type === "post" ? "Người tạo đăng bài vào" : "Người dùng bình luận vào"} {date.toLocaleString()}</div>
            </div>
        </div>
    );
}

export default Avatar;
