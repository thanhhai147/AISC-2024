from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from datetime import datetime
from rest_framework.parsers import MultiPartParser, FormParser
import os

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import PostsValidator, CommentValidator
from ..models.base import BaseModel

class CreatePostAPIView(GenericAPIView):
    parser_classes = (MultiPartParser, FormParser)
    MAX_FILE_SIZE_MB =  1   # Giới hạn kích thước file tối đa là 25 MB
    def post(self, request):
        data = request.data
        try:
            post = data['post']
            user_id = post['user_id']
            title = post['title']
            content = post['content']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        files = request.FILES.getlist('images')

        if files:
            for file in files:
                print(file.content_type)
                # Kiểm tra kích thước file (đổi từ byte sang MB)
                file_size_mb = file.size / (1024 * 1024)
                if file_size_mb > self.MAX_FILE_SIZE_MB:
                    return Response(
                        {
                            "success": False,
                            "message": f"Kích thước file '{file.name}' vượt quá giới hạn"
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
        if files:
            try:
                for file in files:
                    image_id = BaseModel.insert_image(file)       
                    image_ids.append(image_id)
            except Exception as e:
                return Response(
                    {
                        "success": False,
                        "message": f"Upload hình ảnh không thành công: {str(e)}"
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        try:
            BaseModel.insert_one('posts', {
                'user_id': user_id,
                'title': title,
                'content': content,
                'img': image_ids,
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
                "message": "Tạo thành công bài đăng"
            }, 
            status=status.HTTP_200_OK
        )

class UpdatePostAPIView(GenericAPIView):
    parser_classes = (MultiPartParser, FormParser)
    MAX_FILE_SIZE_MB =  1   # Giới hạn kích thước file tối đa là 25 MB
    def post(self, request):
        data = request.data
        try:
            post = data['post']
            post_id = post['post_id']
            title = post['title']
            content = post['content']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bài đăng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        files = request.FILES.getlist('images')

        if files:
            for file in files:
                print(file.content_type)
                # Kiểm tra kích thước file (đổi từ byte sang MB)
                file_size_mb = file.size / (1024 * 1024)
                if file_size_mb > self.MAX_FILE_SIZE_MB:
                    return Response(
                        {
                            "success": False,
                            "message": f"Kích thước file '{file.name}' vượt quá giới hạn"
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
        if files:
            try:
                post = BaseModel.find_one('posts', {
                    '_id': post_id
                })
                for image_id in post.img:
                    BaseModel.delete_image(image_id)
                for file in files:
                    image_id = BaseModel.insert_image(file)       
                    image_ids.append(image_id)
            except Exception as e:
                return Response(
                    {
                        "success": False,
                        "message": f"Upload hình ảnh không thành công: {str(e)}"
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        try:
            BaseModel.update_one(
                'posts',
                {
                    '_id': post_id
                }, 
                {
                    '$set': {
                        'title': title,
                        'content': content,
                        'img': image_ids,
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
                '_id': post_id
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
                    "user_id": post.user_id,
                    "title": post.title,
                    "content": post.content,
                    "img": post.img
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
            image = BaseModel.get_image(image_id)
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
                '_id': post_id
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
            comment = data['comment']
            post_id = comment['post_id']
            user_id = comment['user_id']
            content = comment['content']
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
            BaseModel.insert_one('posts', {
                'post_id': post_id,
                'user_id': user_id,
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
            comment = data['comment']
            comment_id = comment['comment_id']
            content = comment['content']
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
                    '_id': comment_id
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
            comment_id = params['comment_id']
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
            comment = BaseModel.find_one('comments', {
                '_id': comment_id
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
                    "post_id": comment.post_id,
                    "user_id": comment.user_id,
                    "content": comment.content,
                }
            }, 
            status=status.HTTP_200_OK
        )
    
class DeleteCommentAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            comment_id = data['comment_id']
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
                '_id': comment_id
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