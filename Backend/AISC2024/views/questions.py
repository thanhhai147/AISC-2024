from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import os
from datetime import datetime
from bson import ObjectId

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, UserValidator, QuizzesValidator, QuestionsValidator
from ..models.base import BaseModel

from ..models.AI_Models.ai_model import extract_text_from_pdf, extract_text_from_image, generate_mcqs_from_text, modify_mcq

class UploadImagesAPIView(GenericAPIView):
    parser_classes = (MultiPartParser, FormParser)
    MAX_FILE_SIZE_MB =  1   # Giới hạn kích thước file tối đa là 25 MB

    def post(self, request):
        files = request.FILES.getlist('images')
        
        if not files:
            return Response(
                {
                    "success": False,
                    "message": "Không có ảnh nào được tải lên"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            for file in files:
                print(file.content_type)
                # Kiểm tra kích thước file (đổi từ byte sang MB)
                file_size_mb = file.size / (1024 * 1024)
                if file_size_mb > self.MAX_FILE_SIZE_MB:
                    return Response(
                        {
                            "success": False,
                            "message": f"Kích thước file '{file.name}' vượt quá giới hạn"
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Đọc nội dung file dưới dạng binary
                binary_content = file.read()

                # Tạo đường dẫn lưu trữ ảnh trên máy chủ
                save_path = os.path.join("uploaded_images", file.name)
                
                # Đảm bảo thư mục tồn tại
                os.makedirs(os.path.dirname(save_path), exist_ok=True)
                
                # Lưu file
                with open(save_path, 'wb') as f:
                    f.write(binary_content)
            
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": f"Upload tài liệu không thành công: {str(e)}"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {
                "success": True,
                "message": "Upload tài liệu thành công và đã lưu file"
            },
            status=status.HTTP_200_OK
        )

class GenerateQuestionsAPIView  (GenericAPIView):   
    parser_classes = (MultiPartParser, FormParser)
    MAX_FILE_SIZE_MB = 25  # Giới hạn kích thước file tối đa là 25 MB

    def post(self, request):
        file = request.FILES.get('file')  # Lấy file từ request
        isExternalSearch = request.POST.get('isExternalSearch')
        boolean_value = True if isExternalSearch == '1' else False
        if not file:
            return Response(
                {
                    "success": False,
                    "message": "Không có file nào được tải lên"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Kiểm tra loại file
        if file.content_type != 'application/pdf':
            return Response(
                {
                    "success": False,
                    "message": "Chỉ chấp nhận file PDF"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Kiểm tra kích thước file
        file_size_mb = file.size / (1024 * 1024)  # Chuyển từ byte sang MB
        if file_size_mb > self.MAX_FILE_SIZE_MB:
            return Response(
                {
                    "success": False,
                    "message": "Kích thước file vượt quá giới hạn 25 MB"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Tạo đường dẫn lưu file
            save_path = os.path.join("uploaded_pdfs", file.name)  # Thư mục `uploaded_pdfs` để lưu file PDF
            os.makedirs(os.path.dirname(save_path), exist_ok=True)  # Đảm bảo thư mục tồn tại
            file_data = file.read()
            # Lưu file
            with open(save_path, 'wb') as f:
                f.write(file.read())

            questions = generate_mcqs_from_text(extract_text_from_pdf(file_data), isExternalSearch=boolean_value)
            # questions = 0
            print(boolean_value)

        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": f"Upload tài liệu không thành công: {str(e)}"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {
                "success": True,
                "question": questions,
                "message": "Upload tài liệu thành công và đã lưu file"
            },
            status=status.HTTP_200_OK
        )

class AddQuestionAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            user_id = data["user_id"]
            questions = data["questions"]
            print(questions)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        for i, question in enumerate(questions):
            question_text = question["text"]
            question_status = question["status"] == 1
            question_explanation = question["explanation"]
            print(question_explanation)
            if not QuestionsValidator.check_question_text(question_text):
                
                return Response(
                {
                    "success": False,
                    "message": "Nội dung câu hỏi không hợp lệ"
                }, 
                )            
            if not QuestionsValidator.check_status(question_status):
                return Response(
                {
                    "success": False,
                    "message": "Trạng thái không hợp lệ"
                }, 
                )
            if not QuestionsValidator.check_explanation(question_explanation):
                return Response(
                {
                    "success": False,
                    "message": "Nội dung giải thích không hợp lệ"
                }, 
                )
                
            try:
                BaseModel.insert_one('questions',
                    {
                        'question_text': question_text,
                        'created_at': datetime.now(),
                        'updated_at': datetime.now(),
                        'status': question_status,
                        'explanation': question_explanation
                    } 
                )
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
                "message": "Thêm thành công bộ câu hỏi"
            }, 
            status=status.HTTP_200_OK
        )
        
class ModifyQuestionAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            question_id = data["question_id"]
            isModifyHandcrafted = data["isModifyHandcrafted"]
            question_position = data["question_position"]
            edit_request = data["edit_request"]
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        if isModifyHandcrafted == 0:
            try:
                BaseModel.update_one('questions', 
                    {
                        '_id': ObjectId(question_id)
                    },
                    {
                        '$set': {
                            'question_position': question_position,
                            'updated_at': datetime.now()
                        }
                    }    
                )
            except:
                return Response(
                    {
                        "success": False,
                        "message": "Lỗi Datasbase"
                    }, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        else:
            try:
                question = BaseModel.find_one('questions', 
                    {
                        '_id': ObjectId(question_id)
                    }
                )
                
            except:
                return Response(
                    {
                        "success": False,
                        "message": "Không tìm thấy câu hỏi trong DB"
                    }, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
          
            try:
                question_text = modify_mcq("1+1 = 2", question['question_text'], edit_request)

                BaseModel.update_one('questions', 
                    {
                        '_id': ObjectId(question_id)
                    },
                    {
                        '$set': {
                            'question_text': question_text,
                            'updated_at': datetime.now()
                        }
                    }    
                )
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
                "message": "Sửa thành công câu hỏi"
            }, 
            status=status.HTTP_200_OK
        )