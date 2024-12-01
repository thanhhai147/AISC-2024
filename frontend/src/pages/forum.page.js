import React, { useState } from "react";
import MainLayout from "../layouts/main.layout";
import NavbarForum from "../components/navbarForum.component";
import BoxSort from "../components/boxSort.component";
import Post from "../components/post.component";
import Comment from "../components/comment.component"; 
import '../assets/css/forum.page.css';
import Commented from "../components/commented.component";
import PostArticle from "../components/postArticle.component";

export default function ForumPage() {
    const [currentView, setCurrentView] = useState('all'); 
    const [showComment, setShowComment] = useState(false); 
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(null); 

    const comments = [
        { content: "Bình luận 1: Đây là một câu trả lời rất hay!", timestamp: "14/10/2024" },
        { content: "Bình luận 2: Mình nghĩ rằng bạn có thể cải thiện câu hỏi này bằng cách...", timestamp: "15/10/2024" },
    ];

    const handleNavItemClick = (type) => {
        setCurrentView(type);
    };

    return (
        <MainLayout>
            <NavbarForum onNavItemClick={handleNavItemClick} />
            <div className="forum-page-container">
                {currentView === 'all' && (
                    <>
                        <BoxSort />
                        <Post 
                            imageUrl="your-image-url.jpg"
                            content="Nội dung bài viết"
                            timestamp="14/10/2024"
                            onCommentClick={() => setShowComment(true)} 
                        />
                        <div className="comments-section">
                            {comments.map((comment, index) => (
                                <div key={index}>
                                    <Commented 
                                        content={comment.content}
                                        timestamp={comment.timestamp}
                                        onCommentClick={() => setSelectedCommentIndex(index)} 
                                    />
                                    {selectedCommentIndex === index && showComment && (
                                        <div className="reply-comment-section">
                                            <Comment />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
                 {currentView === 'chosenList' && <PostArticle />} 
            </div>
        </MainLayout>
    );
}
