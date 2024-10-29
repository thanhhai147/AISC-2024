from django.conf import settings

class BaseModel():
    @staticmethod
    async def insert_one(collection_name, document):
        collection = settings.DB[collection_name]
        result = (await collection.insert_one(document))
        return result.inserted_id

    @staticmethod
    async def insert_many(collection_name, documents):
        collection = settings.DB[collection_name]
        result = (await collection.insert_many(documents))
        return result.inserted_ids
    
    @staticmethod
    async def find_one(collection_name, query):
        collection = settings.DB[collection_name]
        result = (await collection.find_one(query))
        return result
    
    @staticmethod
    async def find_many(collection_name, query):
        collection = settings.DB[collection_name]
        result = (await collection.find(query))
        return result

    @staticmethod
    async def update_one(collection_name, query, update_document):
        collection = settings.DB[collection_name]
        result = (await collection.update_one(query, update_document))
        return result.upserted_id
    
    @staticmethod
    async def update_many(collection_name, query, update_documents):
        collection = settings.DB[collection_name]
        result = (await collection.update_many(query, update_documents))
        return result.upserted_id

    @staticmethod
    async def delete_one(collection_name, query):
        collection = settings.DB[collection_name]
        result = (await collection.delete_one(query))
        return result.deleted_count
    
    @staticmethod
    async def delete_many(collection_name, query):
        collection = settings.DB[collection_name]
        result = (await collection.delete_many(query))
        return result.deleted_count