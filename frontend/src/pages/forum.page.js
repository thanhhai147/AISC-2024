import React, { useState, useEffect } from "react";
import '../assets/css/forum.page.css';

import ForumAPI from "../api/forum.api";
import Swal from 'sweetalert2'

import MainLayout from "../layouts/main.layout";
import NavbarForum from "../components/navbarForum.component";
import BoxSort from "../components/boxSort.component";
import Post from "../components/post.component";
import PostArticle from "../components/postArticle.component";
import News from "../components/news.component";

export default function ForumPage() {
    const [currentView, setCurrentView] = useState('all'); 
    const [postIdList, setPostIdList] = useState(null)

    const handleNavItemClick = (type) => {
        setCurrentView(type);
    };

    useEffect(() => {
        handleGetAllPostId()
    }, [])

    const handleGetAllPostId = () => {
        ForumAPI.getAllPost()
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                setPostIdList(data?.data?.post_ids)
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Truy xuất mã bài đăng thất bại",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .catch(error => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Truy xuất mã bài đăng thất bại",
                showConfirmButton: false,
                timer: 1500
            })
            console.error(error)
        })
    }

    return (
        <MainLayout>
            <NavbarForum onNavItemClick={handleNavItemClick} />
            <div className="forum-page-container">
                {
                    currentView === 'all' &&
                    <>
                        {/* <BoxSort /> */}
                        {
                            postIdList && postIdList.length > 0 ? 
                            postIdList.map(postId => (
                                <div className="post-container" key={`post-${postId}`}>
                                    <Post postId={postId}/>
                                </div>
                            )) : null
                        }
                    </>
                }
                {currentView === 'chosenList' && <PostArticle />} 
                {currentView === 'edit' && <News type={1}/>} 
            </div>
        </MainLayout>
    );
}
