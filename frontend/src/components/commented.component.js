import React, { useState, useEffect } from 'react';
import Avatar from './avatar.component';
import '../assets/css/post.css';
import UserAPI from '../api/user.api';
import Swal from 'sweetalert2';

const Commented = ({ userId, content, timestamp }) => {
    const [commentUser, setCommentUser] = useState(null)
    const [commentUserAvatar, setCommentUserAvatar] = useState(null)

    useEffect(() => {
        handleLoadCommentUser()
    }, [userId])

    useEffect(() => {
        handleLoadCommentUserAvatar()
    }, [commentUser])

    const handleLoadCommentUser = () => {
        if (!userId) return
        UserAPI.getUser(userId)
        .then(response => response.json())
        .then(data => {
            if (data?.success) {
                setCommentUser({
                    userId: data?.data?.user_id,
                    username: data?.data?.user_name,
                    avatar: data?.data?.avatar
                })
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Truy xuất người dùng thất bại",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .catch(error => {
            console.error(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Truy xuất người dùng thất bại",
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    const handleLoadCommentUserAvatar = () => {
        if (!commentUser?.avatar) return
        UserAPI.getAvatar(commentUser?.avatar)
        .then(response => {
            if (response.ok) {
                return response.blob()
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Truy xuất avatar người dùng thất bại",
                    showConfirmButton: false,
                    timer: 1500
                })
                return null
            }
        })
        .then(blobData => {
            if (blobData) {
                setCommentUserAvatar(URL.createObjectURL(blobData))
            }
        })
        .catch(error => {
            console.error(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Truy xuất avatar người dùng thất bại",
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    return (
        <div className="Post">
            <Avatar 
                name={commentUser?.username} 
                imageUrl={commentUserAvatar} 
                timestamp={timestamp}
                type='comment'
            />
            <p className='content font-family-regular'>{content}</p>
        </div>
    );
};

export default Commented;
