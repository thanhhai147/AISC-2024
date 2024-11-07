from django.conf import settings
from bson import ObjectId

class BaseModel():
    @staticmethod
    def insert_one(collection_name, document) -> ObjectId:
        collection = settings.DB[collection_name]
        result = (collection.insert_one(document))
        return result.inserted_id

    @staticmethod
    def insert_many(collection_name, documents) -> list:
        collection = settings.DB[collection_name]
        result = (collection.insert_many(documents))
        return result.inserted_ids
    
    @staticmethod
    def find_one(collection_name, query) -> dict:
        collection = settings.DB[collection_name]
        result = (collection.find_one(query))
        return result
    
    @staticmethod
    def find_many(collection_name, query) -> list:
        collection = settings.DB[collection_name]
        result = (collection.find(query))
        return result

    @staticmethod
    def update_one(collection_name, query, update_document) -> ObjectId:
        collection = settings.DB[collection_name]
        result = (collection.update_one(query, update_document))
        return result.upserted_id
    
    @staticmethod
    def update_many(collection_name, query, update_documents):
        collection = settings.DB[collection_name]
        result = (collection.update_many(query, update_documents))
        return result.upserted_id

    @staticmethod
    def delete_one(collection_name, query) -> int:
        collection = settings.DB[collection_name]
        result = (collection.delete_one(query))
        return result.deleted_count
    
    @staticmethod
    def delete_many(collection_name, query) -> int:
        collection = settings.DB[collection_name]
        result = (collection.delete_many(query))
        return result.deleted_count