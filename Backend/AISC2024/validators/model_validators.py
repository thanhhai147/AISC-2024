from ..models.base import BaseModel
from .custom_validators import BaseValidator, AdancedValidator
from bson import ObjectId

class ModelValidator():
    @staticmethod
    def check_unique(collection, key, value) -> bool:
        return BaseModel.find_one(
            collection, 
            {
                key: value 
            }
        ) is None
    
    @staticmethod
    def check_exist_key(collection, key) -> bool:
        return BaseModel.find_one(
            collection,
            {
                "_id": key
            }
        ) is not None
    
    @staticmethod
    def check_created_at(created_time: str) -> bool:
        return (
            BaseValidator.check_null(created_time) and
            BaseValidator.check_blank(created_time) and
            BaseValidator.check_type("datetime", created_time)
        )

    @staticmethod
    def check_updated_at(updated_at: str) -> bool:
        return (
            BaseValidator.check_null(updated_at) and
            BaseValidator.check_blank(updated_at) and
            BaseValidator.check_type("datetime", updated_at)
        )

class UserValidator():
    @staticmethod
    def check_user_name(user_name: str) -> bool:
        if (
            BaseValidator.check_type("string", user_name) and
            not BaseValidator.check_null(user_name) and
            not BaseValidator.check_blank(user_name) and
            BaseValidator.check_max_length(50, user_name)
        ): return True
        return False
    
    @staticmethod
    def check_date_of_birth(date_of_birth: str) -> bool:
        if (
            BaseValidator.check_type("date", date_of_birth) and
            not BaseValidator.check_null(date_of_birth) and
            not BaseValidator.check_blank(date_of_birth) and
            AdancedValidator.check_date_of_birth(date_of_birth)
        ): return True
        return False
    
    @staticmethod
    def check_email(email: str) -> bool:
        if (
            BaseValidator.check_type("string", email) and
            not BaseValidator.check_null(email) and
            not BaseValidator.check_blank(email) and
            ModelValidator.check_unique('user', 'email', email) and
            AdancedValidator.check_email(email)
        ): return True
        return False
    
    @staticmethod
    def check_phone_number(phone_number: str) -> bool:
        if (
            BaseValidator.check_type("string", phone_number) and
            not BaseValidator.check_null(phone_number) and
            not BaseValidator.check_blank(phone_number) and
            ModelValidator.check_unique('user', 'phone_number', phone_number) and
            AdancedValidator.check_phone_number(phone_number)
        ): return True
        return False
    
    @staticmethod
    def check_password(password: str) -> bool:
        if (
            BaseValidator.check_type("string", password) and
            not BaseValidator.check_null(password) and
            not BaseValidator.check_blank(password) and
            BaseValidator.check_min_length(6, password) and
            BaseValidator.check_max_length(12, password) and
            AdancedValidator.check_password(password)
        ): return True
        return False
    
    @staticmethod
    def check_role(role: str) -> bool:
        if (
            BaseValidator.check_type("string", role) and
            not BaseValidator.check_null(role) and
            not BaseValidator.check_blank(role) and
            (role == "Admin" or role == "Basic User" or role == "Premium User") 
        ): return True
        return False
    
    @staticmethod
    def check_user(user: dict) -> bool:
        user_name = user['user_name']
        date_of_birth = user['date_of_birth']
        email = user['email']
        phone_number = user['phone_number']
        password = user['password']
        role = user['role']
        if (
            UserValidator.check_user_name(user_name) and
            UserValidator.check_date_of_birth(date_of_birth) and
            UserValidator.check_email(email) and
            UserValidator.check_phone_number(phone_number) and
            UserValidator.check_password(password) and
            UserValidator.check_role(role)
        ): return True
        return False
    