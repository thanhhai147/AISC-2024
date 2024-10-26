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