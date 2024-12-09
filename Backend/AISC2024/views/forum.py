from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from datetime import datetime
from rest_framework.parsers import MultiPartParser, FormParser
import os
from bson import ObjectId
import json

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import PostsValidator, CommentValidator
from ..models.base import BaseModel

class CreatePostAPIView(GenericAPIView):
    parser_classes = (MultiPartParser, FormParser)
    MAX_FILE_SIZE_MB =  1   # Giới hạn kích thước file tối đa là 25 MB
    def post(self, request):
        data = request.data
        try:
            data_json = data.get('json', None)
            data_json = json.loads(data_json)
            post = data_json.get('post', None)
            user_id = post.get('user_id', None)
            title = post.get('title', None)
            content = post.get('content', None)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
  
        images = []
        for key in data.keys():
            if key.split("-")[0] == "images":
                images.append(data[key])

        if (images != None) and (not isinstance(images, str)):
            file_size_mb = sum([image.size / (1024 * 1024) for image in images])
            if file_size_mb > self.MAX_FILE_SIZE_MB:
                return Response(
                    {
                        "success": False,
                        "message": f"Kích thước ảnh vượt quá giới hạn (25 MB)"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        if not PostsValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not PostsValidator.check_title(title):
            return Response(
                {
                    "success": False,
                    "message": "Tiêu đề không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not PostsValidator.check_content(content):
            return Response(
                {
                    "success": False,
                    "message": "Nội dung không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        image_ids = []

        if (images != None) and (not isinstance(images, str)) and (images[0].content_type.startswith('image/')):
            try:
                for image in images:
                    image_id = BaseModel.insert_image(image)
                    image_ids.append(image_id)   
            except Exception:
                return Response(
                    {
                        "success": False,
                        "message": f"Upload hình ảnh không thành công" 
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        try:
            post_id = BaseModel.insert_one('posts', {
                'user_id': ObjectId(user_id),
                'title': title,
                'content': content,
                'images': image_ids,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            })
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Tạo thành công bài đăng",
                "data": {
                    "post_id": str(post_id)
                }
            }, 
            status=status.HTTP_200_OK
        )

class UpdatePostAPIView(GenericAPIView):
    parser_classes = (MultiPartParser, FormParser)
    MAX_FILE_SIZE_MB =  1   # Giới hạn kích thước file tối đa là 25 MB
    def post(self, request):
        data = request.data
        try:
            data_json = data.get('json', None)
            data_json = json.loads(data_json)
            post = data_json.get('post', None)
            post_id = post.get('post_id', None)
            title = post.get('title', None)
            content = post.get('content', None)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        images = []
        for key in data.keys():
            if key.split("-")[0] == "images":
                images.append(data[key])
        
        if (images != None) and (not isinstance(images, str)):
            file_size_mb = sum([image.size / (1024 * 1024) for image in images])
            if file_size_mb > self.MAX_FILE_SIZE_MB:
                return Response(
                    {
                        "success": False,
                        "message": f"Kích thước ảnh vượt quá giới hạn (25 MB)"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        if not CommentValidator.check_post_id(post_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not PostsValidator.check_title(title):
            return Response(
                {
                    "success": False,
                    "message": "Tiêu đề không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not PostsValidator.check_content(content):
            return Response(
                {
                    "success": False,
                    "message": "Nội dung không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        image_ids = []

        if (images != None) and (not isinstance(images, str)) and (images[0].content_type.startswith('image/')):
            try:
                post = BaseModel.find_one('posts', {
                    "_id": post_id
                })
                prev_image_ids = post.get("images", None)
                if prev_image_ids:
                    for prev_image_id in prev_image_ids:
                        BaseModel.delete_image(prev_image_id)

                for image in images:
                    image_id = BaseModel.insert_image(image)
                    image_ids.append(image_id)   
            except Exception:
                return Response(
                    {
                        "success": False,
                        "message": f"Upload hình ảnh không thành công" 
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        try:
            BaseModel.update_one(
                'posts',
                {
                    '_id': ObjectId(post_id)
                }, 
                {
                    '$set': {
                        'title': title,
                        'content': content,
                        'images': image_ids,
                        'updated_at': datetime.now()
                    }
                }
            )
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Chỉnh sửa thành công bài đăng"
            }, 
            status=status.HTTP_200_OK
        )
    
class GetPostAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            post_id = params['post_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not CommentValidator.check_post_id(post_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            post = BaseModel.find_one('posts', {
                '_id': ObjectId(post_id)
            })
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        return Response(
            {
                "success": True,
                "message": "Lấy thành công bài đăng",
                "data": {
                    "post_id": post_id,
                    "user_id": str(post.get('user_id', None)),
                    "title": post.get('title', None),
                    "content": post.get('content', None),
                    "updated_at": post.get('updated_at', None),
                    "images": [str(image_id) for image_id in post.get('images', [])]
                }
            }, 
            status=status.HTTP_200_OK
        )

class GetAllPostIdAPIView(GenericAPIView):
    def get(self, request):  
        try:
            posts = sorted(
                BaseModel.find_many('posts', {}),
                key=lambda post: post['updated_at'],
                reverse=True
            )
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Lấy thành công bài đăng",
                "data": {
                    "post_ids": [
                        str(post['_id']) for post in posts
                    ]
                }
            }, 
            status=status.HTTP_200_OK
        )

class GetAllPostIdByUserAPIView(GenericAPIView):
    def get(self, request):   
        params = request.query_params
        try:
            user_id = params['user_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not PostsValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
         
        try:
            posts = sorted(
                BaseModel.find_many('posts', {
                    "user_id": ObjectId(user_id)
                }),
                key=lambda post: post['updated_at'],
                reverse=True
            )
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Lấy thành công bài đăng",
                "data": {
                    "post_ids": [
                        str(post.get('_id', None)) for post in posts
                    ]
                }
            }, 
            status=status.HTTP_200_OK
        )
    
class GetPostImageAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            image_id = params['image_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not image_id:
            return Response(
                {
                    "success": False,
                    "message": "Mã hình ảnh không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            image = BaseModel.get_image(ObjectId(image_id))
            if image is None: 
                return Response(
                    {
                        "success": False,
                        "message": "Mã hình ảnh không hợp lệ"
                    }, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return FileResponse(image, content_type=image.content_type)
    
class DeletePostAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            post_id = data['post_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not CommentValidator.check_post_id(post_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            BaseModel.delete_one('posts', {
                '_id': ObjectId(post_id)
            })
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Xóa thành công bài đăng",
            }, 
            status=status.HTTP_200_OK
        )
    
class CreateCommentAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            comment = data.get('comment', None)
            post_id = comment.get('post_id', None)
            user_id = comment.get('user_id', None)
            content = comment.get('content', None)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bình luận không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
        if not CommentValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not CommentValidator.check_post_id(post_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not CommentValidator.check_content(content):
            return Response(
                {
                    "success": False,
                    "message": "Nội dung không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            BaseModel.insert_one('comments', {
                'post_id': ObjectId(post_id),
                'user_id': ObjectId(user_id),
                'content': content,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            })
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Tạo thành công bình luận"
            }, 
            status=status.HTTP_200_OK
        )

class UpdateCommentAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            comment = data.get('comment', None)
            comment_id = comment.get('comment_id', None)
            content = comment.get('content', None)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bình luận không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not CommentValidator.check_comment_id(comment_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bình luận không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not CommentValidator.check_content(content):
            return Response(
                {
                    "success": False,
                    "message": "Nội dung không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            BaseModel.update_one(
                'comments',
                {
                    '_id': ObjectId(comment_id)
                }, 
                {
                    '$set': {
                        'content': content,
                        'updated_at': datetime.now()
                    }
                }
            )
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Chỉnh sửa thành công bình luận"
            }, 
            status=status.HTTP_200_OK
        )
    
class GetCommentAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            comment_id = params.get('comment_id', None)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not CommentValidator.check_comment_id(comment_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bình luận không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            comment = BaseModel.find_one('comments', {
                '_id': ObjectId(comment_id)
            })
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Lấy thành công bình luận",
                "data": {
                    "comment_id": comment_id,
                    "post_id": str(comment.get('post_id', None)),
                    "user_id": str(comment.get('user_id', None)),
                    "content": comment.get('content', None),
                }
            }, 
            status=status.HTTP_200_OK
        )
    
class GetCommentByPostAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            post_id = params.get('post_id', None)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not CommentValidator.check_post_id(post_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            comments = BaseModel.find_many('comments', {
                'post_id': ObjectId(post_id)
            })
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Lấy thành công bình luận",
                "data": sorted(
                    [
                        {
                            "comment_id": str(comment.get('comment_id', None)),
                            "post_id": str(comment.get('post_id', None)),
                            "user_id": str(comment.get('user_id', None)),
                            "content": comment.get('content', None),
                            "updated_at": comment.get('updated_at', None)
                        }
                        for comment in comments
                    ],
                    key=lambda comment: comment['updated_at'],
                    reverse=True
                )
            }, 
            status=status.HTTP_200_OK
        )

class DeleteCommentAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            comment_id = data.get('comment_id', None)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not CommentValidator.check_comment_id(comment_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            BaseModel.delete_one('comments', {
                '_id': ObjectId(comment_id)
            })
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Datasbase"
                }, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "success": True,
                "message": "Xóa thành công bình luận",
            }, 
            status=status.HTTP_200_OK
        )
