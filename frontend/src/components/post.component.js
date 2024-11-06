import React from 'react';
import Avatar from './avatar.component';
import LikeButton from '../components/likeButton.component';
import Link from './link.component';
import '../assets/css/post.css'

const Post = ({ imageUrl, content, timestamp, linkComment, linkLabelComment, linkReport, linkLabelReport }) => {
    linkComment = 'null';
    linkLabelComment = 'Trả lời'
    linkReport = 'null';
    linkLabelReport = 'Báo cáo'

    return (
        <div className="Post">
            <Avatar />
            <img src={imageUrl} alt="Post" className="post-image" />
            <p className='content font-family-regular'>{content}</p>
            <p className='time font-family-regular'>{timestamp}</p>
            <div className="action-row">
                <LikeButton />
                <Link className="link_Cmt" href={linkComment} label={linkLabelComment} textDecoration="none" />
                <Link className="link_Report" href={linkReport} label={linkLabelReport} textDecoration="none" />
            </div>
        </div>
    );
};

export default Post;
