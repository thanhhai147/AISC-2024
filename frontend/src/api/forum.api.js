export default class ForumAPI {
    static createPost(userId, title, content, images) {
        const formData = new FormData()
        const jsonData = {
            post: {
                user_id: userId,
                title: title,
                content: content
            }
        }
        formData.append("json", JSON.stringify(jsonData));
        for (let i=0; i<images.length; i++) {
            formData.append(`images-${i}`, images[i]);
        }
        return fetch(
            `http://localhost:8000/create-post`, 
            {
                method: "POST",
                mode: "cors",
                body: formData
            }
        )
    }

    static createComment(userId, postId, content) {
        return fetch(
            `http://localhost:8000/create-comment`, 
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comment: {
                        user_id: userId,
                        post_id: postId,
                        content: content
                    }
                })
            }
        )
    }

    static updatePost(postId, title, content, images) {
        const formData = new FormData()
        const jsonData = {
            post: {
                post_id: postId,
                title: title,
                content: content
            }
        }
        formData.append("json", JSON.stringify(jsonData));
        formData.append("images", images);
        return fetch(
            `http://localhost:8000/update-post`, 
            {
                method: "POST",
                mode: "cors",
                body: formData
            }
        )
    }

    static updateComment(commentId, content) {
        return fetch(
            `http://localhost:8000/update-comment`, 
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comment: {
                        comment_id: commentId,
                        content: content
                    }
                })
            }
        )
    }

    static getPost(postId) {
        return fetch(
            `http://localhost:8000/get-post?post_id=${postId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static getAllPost() {
        return fetch(
            `http://localhost:8000/get-all-post`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static getAllPostByUser(userId) {
        return fetch(
            `http://localhost:8000/get-all-post-by-user?user_id=${userId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static getComment(commentId) {
        return fetch(
            `http://localhost:8000/get-comment?comment_id=${commentId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static getCommentByPost(postId) {
        return fetch(
            `http://localhost:8000/get-comment-by-post?post_id=${postId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static deletePost(postId) {
        return fetch(
            `http://localhost:8000/delete-post`, 
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_id: postId
                })
            }
        )
    }

    static deleteComment(commentId) {
        return fetch(
            `http://localhost:8000/delete-comment`, 
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comment_id: commentId
                })
            }
        )
    }

    static getPostImage(imageId) {
        return fetch(
            `http://localhost:8000/get-post-image?image_id=${imageId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }
}