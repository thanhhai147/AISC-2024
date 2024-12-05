import React, { useState, useEffect } from 'react';
import ForumAPI from '../api/forum.api';
import UserAPI from '../api/user.api';
import Avatar from './avatar.component';
import Comment from './comment.component';
import Commented from './commented.component';
import '../assets/css/post.css';
import Swal from 'sweetalert2';
import { Image } from 'antd'
import Button from './button.component';

const Post = ({ postId }) => {
    const [post, setPost] = useState(null)
    const [postUser, setPostUser] = useState(null)
    const [postUserAvatar, setPostUserAvatar] = useState(null)
    const [postImageURLs, setPostImageURLs] = useState(null)
    const [comments, setComments] = useState(null)
    const [showComment, setShowComment] = useState(false); 

    useEffect(() => {
        handleLoadPost()
    }, [postId])

    useEffect(() => {
        handleLoadPostUser()
        handleLoadPostImages()
        handleLoadComments()
    }, [post])

    useEffect(() => {
        handleLoadPostUserAvatar()
    }, [postUser])

    const handleLoadPost = () => {
        ForumAPI.getPost(postId)
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                setPost({
                    postId: postId,
                    userId: data?.data?.user_id,
                    title: data?.data?.title,
                    content: data?.data?.content,
                    updatedAt: data?.data?.updated_at,
                    images: data?.data?.images
                })
            }
        })
    }

    const handleLoadPostUser = () => {
        if (!post?.userId) return
        UserAPI.getUser(post?.userId)
        .then(response => response.json())
        .then(data => {
            if (data?.success) {
                setPostUser({
                    userId: data?.data?.user_id,
                    username: data?.data?.user_name,
                    avatar: data?.data?.avatar
                })
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Truy xuất người dùng thất bại",
                    text: data?.message,
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
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    const handleLoadPostUserAvatar = () => {
        if (!postUser?.avatar) return
        UserAPI.getAvatar(postUser?.avatar)
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
                setPostUserAvatar(URL.createObjectURL(blobData))
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

    const handleLoadPostImages = () => {
        if (!post?.images) return
        const fetchImages = post?.images.map(imageId => {
            return ForumAPI.getPostImage(imageId)
            .then(response => {
                if (response.ok) {
                    return response.blob()
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Truy xuất ảnh bài đăng thất bại",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return null
                }
            })
            .then(blobData => {
                if (blobData) return URL.createObjectURL(blobData)
                else return null
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Truy xuất ảnh bài đăng thất bại",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                return null
            })
        })

        Promise.all(fetchImages)
        .then(imageURLS => {
            setPostImageURLs(imageURLS)
        })
        .catch(error => {
            console.error(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Truy xuất ảnh bài đăng thất bại",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    const handleLoadComments = () => {
        if (!post?.postId) return
        ForumAPI.getCommentByPost(post?.postId)
        .then(response => response.json())
        .then(data => {
            if (data?.success) {
                setComments(
                    data?.data.map(comment => ({
                        commnentId: comment?.comment_id,
                        postId: comment?.post_id,
                        userId: comment?.user_id,
                        content: comment?.content,
                        updatedAt: comment?.updated_at
                    }))
                )
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Truy xuất bình luận thất bại",
                    text: data?.message,
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
                title: "Truy xuất bình luận thất bại",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
  
    return (
        <div key={`post-${post?.postId}`} className="Post">
            <Avatar 
                name={postUser?.username} 
                imageUrl={postUserAvatar} 
                timestamp={post?.updatedAt} 
            />
            <p className='post-title font-family-semibold'>{post?.title}</p>
            <div className='post-images'>
                {
                    postImageURLs ?
                    postImageURLs.map((imageURL, index) => {
                        if (imageURL) {
                            return (
                                <Image 
                                    key={`post-image-${post?.postId}-${index}`}
                                    src={imageURL} 
                                    alt="Post" 
                                    width={200}
                                />
                            )
                        }
                    }) : null
                }
            </div>
            <p className='content font-family-regular'>{post?.content}</p>
            <div className="comments-section">
                {
                    comments &&
                    comments.map((comment, index) => (
                        <div key={`post-comment-${post?.postId}-${index}`}>
                            <Commented 
                                userId={comment?.userId}
                                content={comment?.content}
                                timestamp={comment?.updatedAt}
                            />
                        </div>
                    ))
                }
                {
                    showComment && 
                    <div className="reply-comment-section">
                        <Comment  
                            userId={post?.userId}
                            postId={postId}
                            onCreateComment={() => {
                                setShowComment(false)
                                handleLoadComments()
                            }}
                            onCloseComment={() => {
                                setShowComment(false)
                            }}
                        />
                    </div>
                }
            </div>
            <div className="action-row">
                <div className='comment-button'>
                    <Button
                        onClick={() => setShowComment(true)}
                        size='small'
                    >
                        Trả lời
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Post;
