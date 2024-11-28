from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import os
from datetime import datetime
from bson import ObjectId

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, UserValidator, QuizzesValidator, QuestionsValidator, QuestionBankValidator
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

class GenerateQuestionsAPIView(GenericAPIView):   
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
            question_bank_id = data["question_bank_id"]
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
        if not QuestionsValidator.check_question_bank_id(question_bank_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bộ câu hỏi không hợp lệ"
                }, 
                )   
        for i, question in enumerate(questions):
            question_text = question["text"]
            question_status = question["status"] == 1
            question_explanation = question["explanation"]
            question_answer_text_A = question["question_answer_text_A"]
            question_answer_text_B = question["question_answer_text_B"]
            question_answer_text_C = question["question_answer_text_C"]
            question_answer_text_D = question["question_answer_text_D"]
            question_is_correct = question["question_is_correct"]
            
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
            if not QuestionsValidator.check_answer_text_A(question_answer_text_A):
                return Response(
                {
                    "success": False,
                    "message": "Nội dung đáp án A không hợp lệ"
                }, 
                )    
            if not QuestionsValidator.check_answer_text_B(question_answer_text_B):
                return Response(
                {
                    "success": False,
                    "message": "Nội dung đáp án B không hợp lệ"
                }, 
                )  
            if not QuestionsValidator.check_answer_text_C(question_answer_text_C):
                return Response(
                {
                    "success": False,
                    "message": "Nội dung đáp án C không hợp lệ"
                }, 
                )  
            if not QuestionsValidator.check_answer_text_D(question_answer_text_D):
                return Response(
                {
                    "success": False,
                    "message": "Nội dung đáp án D không hợp lệ"
                }, 
                )  
            if not QuestionsValidator.check_is_correct(question_is_correct):
                return Response(
                {
                    "success": False,
                    "message": "Đáp án không hợp lệ"
                }, 
                )  
                
            try:
                BaseModel.insert_one('questions',
                    {
                        'question_text': question_text,
                        'question_bank_id': question_bank_id,
                        'created_at': datetime.now(),
                        'updated_at': datetime.now(),
                        'status': question_status,
                        'explanation': question_explanation,
                        'answer_text_A': question_answer_text_A,
                        'answer_text_B': question_answer_text_B,
                        'answer_text_C': question_answer_text_C,
                        'answer_text_D': question_answer_text_D,
                        'is_correct': question_is_correct
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
        
class CreateQuestionBankAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            question_bank = data['question_bank']
            user_id = question_bank['user_id']
            title = question_bank['title']
            context = question_bank['context']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bộ câu hỏi không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuestionBankValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not QuestionBankValidator.check_title(title):
            return Response(
                {
                    "success": False,
                    "message": "Tiêu đề không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not QuestionBankValidator.check_context(context):
            return Response(
                {
                    "success": False,
                    "message": "Dữ liệu không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            BaseModel.insert_one('question_bank', {
                'user_id': user_id,
                'title': title,
                'context': context,
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
                "message": "Tạo thành công bộ câu hỏi"
            }, 
            status=status.HTTP_200_OK
        )
