from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from datetime import datetime

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, UserValidator
from ..models.base import BaseModel

class SignUpAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            user = data['user']
            user_name = user['user_name']
            date_of_birth = user['date_of_birth']
            email = user['email']
            phone_number = user['phone_number']
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

        if not UserValidator.check_date_of_birth(date_of_birth):
            return Response(
            {
                "success": False,
                "message": "Ngày sinh không hợp lệ"
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

        if not UserValidator.check_email(email):
            return Response(
            {
                "success": False,
                "message": "Email không hợp lệ"
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

        if not UserValidator.check_phone_number(phone_number):
            return Response(
            {
                "success": False,
                "message": "Số điện thoại không hợp lệ"
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
            BaseModel.insert_one('user', {
                **user,
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
            user_name = data['user_name']
            password = data['password']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Tên đăng nhập hoặc mật khẩu không được cung cấp"
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

        if not UserValidator.check_password(password):
            return Response(
            {
                "success": False,
                "message": "Mật khẩu không hợp lệ"
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

        return Response(
            {
                "success": True,
                "message": "Đăng nhập thành công"
            },
            status=status.HTTP_200_OK
        )
    
class LogOutAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            user_name = data['user_name']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Bạn chưa đăng nhập"
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
    def post(self, request):
        data = request.data
        try:
            user_id = data['user_id'] 
            updated_user = data['user']
            user_name = updated_user.get('user_name')
            date_of_birth = updated_user.get('date_of_birth')
            email = updated_user.get('email')
            phone_number = updated_user.get('phone_number')
            role = updated_user.get('role')
        except KeyError:
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

        if not UserValidator.check_date_of_birth(date_of_birth):
            return Response(
                {
                    "success": False,
                    "message": "Ngày sinh không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not UserValidator.check_email(email):
            return Response(
                {
                    "success": False,
                    "message": "Email không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not UserValidator.check_phone_number(phone_number):
            return Response(
                {
                    "success": False,
                    "message": "Số điện thoại không hợp lệ"
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
            updated_fields = {
                'user_name': user_name,
                'date_of_birth': date_of_birth,
                'email': email,
                'phone_number': phone_number,
                'role': role,
                'updated_at': datetime.now()
            }
            updated_fields = {k: v for k, v in updated_fields.items() if v is not None}
            
            result = BaseModel.update_one('user', {'user_id': user_id}, {'$set': updated_fields})
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