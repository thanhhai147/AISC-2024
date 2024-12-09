from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from datetime import datetime
from rest_framework.parsers import MultiPartParser, FormParser
import json
from bson import ObjectId
from django.contrib.auth.hashers import make_password, check_password

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, UserValidator
from ..models.base import BaseModel

class SignUpAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            user = data['user']
            user_name = user['user_name']
            email_phone_number = user['email_phone_number']
            password = user['password']
            role = user['role']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not UserValidator.check_user_name(user_name):
            return Response(
            {
                "success": False,
                "message": "Tên người dùng không hợp lệ"
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

        if not UserValidator.check_email(email_phone_number):
            if not UserValidator.check_phone_number(email_phone_number):
                return Response(
                    {
                        "success": False,
                        "message": "Email hoặc số điện thoại không hợp lệ"
                    }, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        if not UserValidator.check_password(password):
            return Response(
            {
                "success": False,
                "message": "Mật khẩu không hợp lệ"
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

        if not UserValidator.check_role(role):
            return Response(
            {
                "success": False,
                "message": "Vai trò không hợp lệ"
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

        try:
            hashed_password = make_password(password)
            user_id = BaseModel.insert_one('user', {
                'user_name': user_name,
                'email_phone_number': email_phone_number,
                'password': hashed_password,
                'role': role,
                'avatar': None,
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
                "message": "Tạo thành công người dùng mới"
            }, 
            status=status.HTTP_200_OK
        )

class LogInAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            email_phone_number = data['email_phone_number']
            password = data['password']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Tên đăng nhập hoặc mật khẩu không được cung cấp"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if ModelValidator.check_unique('user', 'email_phone_number', email_phone_number):
            return Response(
            {
                "success": False,
                "message": "Email hoặc số điện thoại không tồn tại"
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

        if not UserValidator.check_password(password):
            return Response(
            {
                "success": False,
                "message": "Mật khẩu không hợp lệ"
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )
 
        try:
            user = BaseModel.find_one('user', {
                'email_phone_number': email_phone_number
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
                "message": "Đăng nhập thành công",
                "data": {
                    "user_id": str(user.get("_id", None))
                }
            },
            status=status.HTTP_200_OK
        )
    
class GetUserAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            user_id = params['user_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Tên đăng nhập hoặc mật khẩu không được cung cấp"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not ModelValidator.check_exist_key('user', user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không tồn tại"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = BaseModel.find_one("user", {
                "_id": ObjectId(user_id)
            })
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Database"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(
            {
                "success": True,
                "message": "Đăng nhập thành công",
                "data": {
                    "user_id": str(user.get("_id", None)),
                    "user_name": user.get("user_name", None),
                    "email_phone_number": user.get("email_phone_number", None),
                    "role": user.get("role", None),
                    "avatar": str(user.get("avatar", None))
                }
            },
            status=status.HTTP_200_OK
        )
    
class GetAvatarAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            avatar = params['avatar']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not avatar:
            return Response(
                {
                    "success": False,
                    "message": "Mã hình ảnh không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            image = BaseModel.get_image(avatar)
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
    
class LogOutAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            user_id = data['user_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin người dùng không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not ModelValidator.check_exist_key('user', user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không tồn tại"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {
                "success": True,
                "message": "Đăng xuất thành công"
            },
            status=status.HTTP_200_OK
        )
    
class UpdateAPIView(GenericAPIView):
    parser_classes = (MultiPartParser, FormParser)
    MAX_FILE_SIZE_MB =  1   # Giới hạn kích thước file tối đa là 5 MB
    def post(self, request):
        data = request.data
        try:
            data_json = data.get('json', None)
            data_json = json.loads(data_json)
            avatar = data.get('avatar', None)
            updated_user = data_json.get('user', None)
            user_id = updated_user.get('user_id', None)
            user_name = updated_user.get('username', None)
            email_phone_number = updated_user.get('email_phone_number', None)
            password = updated_user.get('password', None)
            role = updated_user.get('role', None)
        except :
            return Response(
                {
                    "success": False,
                    "message": "Thông tin người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        if (avatar != None) and (not isinstance(avatar, str)):
            file_size_mb = avatar.size / (1024 * 1024)
            if file_size_mb > self.MAX_FILE_SIZE_MB:
                return Response(
                    {
                        "success": False,
                        "message": f"Kích thước ảnh vượt quá giới hạn (25 MB)"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
    
        if not UserValidator.check_user_name(user_name):
            return Response(
                {
                    "success": False,
                    "message": "Tên người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not AdancedValidator.check_email(email_phone_number):
            if not AdancedValidator.check_phone_number(email_phone_number):
                return Response(
                    {
                        "success": False,
                        "message": "Email hoặc số điện thoại không hợp lệ"
                    }, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        try:
            user = BaseModel.find_one('user', {
                "_id": ObjectId(user_id)
            })
            if email_phone_number != user.get('email_phone_number', None):
                if not ModelValidator.check_unique('user', 'email_phone_number', email_phone_number):
                    return Response(
                        {
                            "success": False,
                            "message": "Email hoặc số điện thoại đã tồn tại"
                        }, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
        except:
            return Response(
                    {
                        "success": False,
                        "message": f"Lỗi Database"
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        if not UserValidator.check_role(role):
            return Response(
                {
                    "success": False,
                    "message": "Vai trò không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if (password) and (not AdancedValidator.check_password(password)):
            return Response(
                {
                    "success": False,
                    "message": "Mật khẩu không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        image_id = None
        
        if (avatar != None) and (not isinstance(avatar, str)) and (avatar.content_type=="image/png"):
            try:
                user = BaseModel.find_one('user', {
                    '_id': ObjectId(user_id)
                })
                image_id = user.get('avatar', None)
                if image_id: BaseModel.delete_image(str(image_id))
                image_id = BaseModel.insert_image(avatar)        
            except Exception:
                return Response(
                    {
                        "success": False,
                        "message": f"Upload hình ảnh không thành công" 
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        try:
            hashed_password = hash(password)
            updated_fields = {
                'user_name': user_name,
                'email_phone_number': email_phone_number,
                'password': hashed_password,
                'role': role,
                'avatar': image_id,
                'updated_at': datetime.now()
            }
            updated_fields = {k: v for k, v in updated_fields.items() if v is not None}
            result = BaseModel.update_one('user', {'_id': ObjectId(user_id)}, {'$set': updated_fields})
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
                "message": "Cập nhật thông tin người dùng thành công"
            }, 
            status=status.HTTP_200_OK
        )