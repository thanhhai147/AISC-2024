import re
from bson import ObjectId

class BaseValidator:
    @staticmethod
    def check_date(date: str = "DD/MM/YYYY") -> bool:
        # Format DD/MM/YYYY
        pattern = r'^(0[1-9]|[12]\d|3[01])/(0[1-9]|1[0-2])/\d{4}$'
        return re.fullmatch(pattern, date)
    @staticmethod
    def check_datetime(datetime: str = "YYYY-MM-DD HH:MM:SS.ffffff") -> bool:
        # Format YYYY-MM-DD HH:MM:SS.ffffff
        pattern = r'^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}$'
        return re.fullmatch(pattern, datetime)
    @staticmethod
    def check_null(value) -> bool:
        return value is None

    @staticmethod
    def check_blank(value) -> bool:
        return len(value) == 0

    @staticmethod
    def check_type(ctype: str=None, value=None) -> bool:
        if ctype == "string": return (type(value) == str)
        if ctype == "int": return (type(value) == int)
        if ctype == "float": return (type(value) == float)
        if ctype == "boolean": return (type(value) == bool)
        if ctype == "datetime": return BaseValidator.check_datetime(value)
        if ctype == "date": return BaseValidator.check_date(value)
        if ctype == "objectId": return ObjectId(value)
        else: return type(value) == None
    
    @staticmethod
    def check_min_length(min: int, value) -> bool:
        return len(value) >= min
    
    @staticmethod
    def check_max_length(max: int, value) -> bool:
        return len(value) <= max
    
    @staticmethod 
    def check_min(min: float, value: int | float) -> bool:
        return value >= min

    @staticmethod
    def check_max(max: float, value: int | float) -> bool:
        return value <= max

class AdancedValidator():
    @staticmethod
    def check_user_name(user_name: str) -> bool:
        pattern = r'^[\w]+$'
        return re.fullmatch(pattern, user_name) is not None
    
    @staticmethod
    def check_email(email: str) -> bool:
        pattern = r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}'
        return re.fullmatch(pattern, email) is not None
        
    @staticmethod
    def check_phone_number(phone_number: str) -> bool:
        pattern = r'(84|0[3|5|7|8|9])+([0-9]{8})\b'
        return re.fullmatch(pattern, phone_number) is not None
    
    @staticmethod
    def check_password(password: str) -> bool:
        pattern = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$'
        return re.fullmatch(pattern, password) is not None
    
    @staticmethod
    def check_date_of_birth(date_of_birth: str = "DD/MM/YYYY") -> bool:
        return BaseValidator.check_date(date_of_birth)