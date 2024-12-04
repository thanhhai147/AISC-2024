import React, { useState } from 'react';
import Avatar from './avatar.component';
import LikeButton from '../components/likeButton.component';
import Button from './button.component'; 
import PostReport from './postReport.component'; 
import '../assets/css/post.css';

const Commented = ({ content, timestamp, onCommentClick }) => {
    const [showReportPopup, setShowReportPopup] = useState(false); 

    const handleReportClick = () => {
        setShowReportPopup(true); 
    };

    const handleClosePopup = () => {
        setShowReportPopup(false); 
    };

    return (
        <div className="Post">
            <Avatar />
            <p className='content font-family-regular'>{content}</p>
            <p className='time font-family-regular'>{timestamp}</p>
            <div className="action-row">
                <LikeButton />
                <p 
                    className="link_Cmt" 
                    onClick={onCommentClick}  
                >
                    Trả lời
                </p>
                <p
                    className="link_Report"
                    onClick={handleReportClick}
                >
                    Báo cáo
                </p>
            </div>
            {showReportPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <PostReport /> 
                        <Button type='small' className="close-popup" onClick={handleClosePopup}>Đóng</Button> 
                    </div>
                </div>
            )}
        </div>
    );
};

export default Commented;
