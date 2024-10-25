import re

class BaseValidator:
    @staticmethod
    def check_date(date: str) -> bool:
        # Format DD/MM/YYYY
        pattern = r'^(0[1-9]|[12]\d|3[01])/(0[1-9]|1[0-2])/\d{4}$'
        return re.fullmatch(pattern, date)

class UserValidator():
    @staticmethod
    def check_user_name(user_name: str) -> bool:
        pattern = r'^[\w\d]+$'
        return re.fullmatch(pattern, user_name)
    
    @staticmethod
    def check_email(email: str) -> bool:
        pattern = r'^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$'
        return re.fullmatch(pattern, email)
    
    @staticmethod
    def check_phone_number(phone_number: str) -> bool:
        pattern = r'(84|0[3|5|7|8|9])+([0-9]{8})\b'
        return re.fullmatch(pattern, phone_number)
    
    @staticmethod
    def check_password(password: str) -> bool:
        pattern = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$'
        return re.fullmatch(pattern, password)
    
    @staticmethod
    def check_date_of_birth(date_of_birth: str) -> bool:
        return BaseValidator.check_date(date_of_birth)