from pymongo import AsyncMongoClient
client = AsyncMongoClient("mongodb+srv://admin:1041087997@eduvision.apbhd.mongodb.net/")
db = client.EduVision

class BaseModel():
    def __init__(self):
        self.db = db
    
    async def insert_one(self, collection_name, document):
        collection = self.db[collection_name]
        result = (await collection.insert_one(document))
        return result.inserted_id

    async def insert_many(self, collection_name, documents):
        collection = self.db[collection_name]
        result = (await collection.insert_many(documents))
        return result.inserted_ids
    
    async def find_one(self, collection_name, query):
        collection = self.db[collection_name]
        result = (await collection.find_one(query))
        return result
    
    async def find_many(self, collection_name, query):
        collection = self.db[collection_name]
        result = (await collection.find(query))
        return result

    async def update_one(self, collection_name, query, update_document):
        collection = self.db[collection_name]
        result = (await collection.update_one(query, update_document))
        return result.upserted_id
    
    async def update_many(self, collection_name, query, update_documents):
        collection = self.db[collection_name]
        result = (await collection.update_many(query, update_documents))
        return result.upserted_id

    async def delete_one(self, collection_name, query):
        collection = self.db[collection_name]
        result = (await collection.delete_one(query))
        return result.deleted_count
    
    async def delete_many(self, collection_name, query):
        collection = self.db[collection_name]
        result = (await collection.delete_many(query))
        return result.deleted_count