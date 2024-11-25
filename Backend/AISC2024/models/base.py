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
    def update_one(collection_name, query, update_query) -> ObjectId:
        collection = settings.DB[collection_name]
        result = (collection.update_one(query, update_query))
        return result.upserted_id
    
    @staticmethod
    def update_many(collection_name, query, update_query):
        collection = settings.DB[collection_name]
        result = (collection.update_many(query, update_query))
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
    
    @staticmethod
    def insert_image(image_file):
        image_id = settings.FS.put(image_file.read(), filename=image_file.name)
        return image_id
    
    @staticmethod
    def get_image(image_id):
        # Lấy file từ GridFS
        image = settings.FS.get(ObjectId(image_id))
        return image   
    
    @staticmethod
    def delete_image(image_id):
        image = settings.FS.delete(ObjectId(image_id))
        return image