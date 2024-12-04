import React, { useState } from "react";
import MainLayout from "../layouts/main.layout";
import NavbarForum from "../components/navbarForum.component";
import BoxSort from "../components/boxSort.component";
import Post from "../components/post.component";
import Comment from "../components/comment.component"; 
import '../assets/css/forum.page.css';
import Commented from "../components/commented.component";
import PostArticle from "../components/postArticle.component";
import news1 from "../assets/img/tu-hoc.png";
import news2 from "../assets/img/giao-duc-truc-tuyen.png";
import news3 from "../assets/img/e-learning.png";
import News from "../components/news.component";

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
    const newsData = [
        {
            id: 1,
            img: news1,
            alt: "Tự học",
            title: "6 lợi ích của tự học mà bạn không nên bỏ lỡ",
            // param: "6-loi-ich-cua-tu-hoc",
        },
        {
            id: 2,
            img: news2,
            alt: "Giáo dục trực tuyến",
            title: "Theo khảo sát của IFC 2018, sự bùng nổ của giáo dục trực tuyến đã làm gia tăng nhu cầu về công cụ hỗ trợ học tập",
            // param: "giao-duc-truc-tuyen-gia-tang-nhu-cau-ve-cong-cu-ho-tro",
        },
        {
            id: 3,
            img: news3,
            alt: "E-learning",
            title: "5 phần mềm dạy học trực tuyến tốt nhất hiện nay ở Việt Nam",
            // param: "5-phan-mem-day-hoc-truc-tuyen",
        },
    ];
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
                 {currentView === 'edit' && <News type={1}/>} 
            </div>
        </MainLayout>
    );
}
