import React from 'react';
import QuestionCombo from '../components/questionCombo.component';
import Premium from "../components/premium.component";
import Question from '../components/question.component';
import Avatar from '../components/avatar.component';
import Post from '../components/post.component';
import Comment from '../components/comment_component';

export default function MainLayout({ children }) {
    const imageUrl = require('../assets/img/Post.png'); 
    const content = "Đây là nội dung bài viết mẫu. Bạn có thể thay thế bằng nội dung thực tế.";
    const timestamp = new Date().toLocaleString();

    return (
        <>
            {/* <Premium 
                period={"1 tháng"} 
                price={"59.000 VND/tháng"} 
                shortDescription={"Trải nghiệm lần đầu 1 tuần với giá 0 VND"} 
                longDescription={[
                    "1 tài khoản Premium",
                    "Hủy bất cứ lúc nào"
                ]}
                VAT={"Không bao gồm thuế GTGT"}
            />

            <QuestionCombo/>
            <Avatar 
                name="Sophia" 
                imageUrl={null}
            /> */}
            {/* <Post 
                imageUrl={imageUrl} 
                content={content} 
                timestamp={timestamp} 
            />  */}
            <Comment/>
            {children}
        </>
    );
}
