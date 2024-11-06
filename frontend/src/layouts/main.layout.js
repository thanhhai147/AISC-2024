import React from 'react';
import QuestionCombo from '../components/questionCombo.component';
import Premium from "../components/premium.component";
import Question from '../components/question.component';
import Avatar from '../components/avatar.component';
import Post from '../components/post.component';
import Comment from '../components/comment.component';

export default function MainLayout({ children }) {
    const imageUrl = require('../assets/img/Post.png'); 
    const content = "Đây là nội dung bài viết mẫu. Bạn có thể thay thế bằng nội dung thực tế.";
    const timestamp = new Date().toLocaleString();

    return (
        <>
            {children}
        </>
    );
}
