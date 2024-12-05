from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import os
from datetime import datetime
from bson import ObjectId
import base64


from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, UserValidator, QuizzesValidator, QuestionsValidator, QuestionBankValidator, QuizQuestionValidator
from ..models.base import BaseModel

from ..models.AI_Models.ai_model import extract_text_from_pdf, extract_text_from_image, generate_mcqs_from_text, modify_mcq
import docx2pdf 
import pptxtopdf 
import io
import tempfile

class UploadFilesAPIView(GenericAPIView):
    parser_classes = (MultiPartParser, FormParser)
    MAX_FILE_SIZE_MB = 25  # Giới hạn kích thước file tối đa là 25 MB

    def post(self, request):
        files = request.FILES.getlist('files')
        
        if not files:
            return Response(
                {
                    "success": False,
                    "message": "Không có file nào được tải lên"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Kiểm tra loại file
        file_types = [file.content_type for file in files]
        print(file_types)
        is_pdf_doc_txt = all(
            ft for ft in file_types if ft.startswith('application'))
        is_image = all(file_type.startswith('image/') for file_type in file_types)

        # Kiểm tra nếu file là PDF, DOC, TXT hoặc là ảnh
        if is_pdf_doc_txt and len(files) == 1:
            return self.upload_files(files)
        elif is_pdf_doc_txt and len(files) != 1:
            return Response(
                {
                    "success": False,
                    "message": "Chỉ cho phép tải lên một file PDF, DOC, TXT"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        elif is_image and len(files) > 0:
            return self.upload_files(files)
        else:
            return Response(
                {
                    "success": False,
                    "message": "Không được phép tải lên nhiều file khác loại"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    def convert_binary_docx_to_pdf(self, binary_docx_content):
        # Lưu tạm thời dữ liệu DOCX vào một file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.docx') as temp_docx_file:
            temp_docx_file.write(binary_docx_content)
            temp_docx_file_path = temp_docx_file.name

        # Chuyển đổi DOCX sang PDF bằng docx2pdf
        temp_pdf_file_path = temp_docx_file_path.replace('.docx', '.pdf')
        docx2pdf.convert(temp_docx_file_path, temp_pdf_file_path)

        # Đọc dữ liệu PDF từ file và chuyển nó thành nhị phân
        with open(temp_pdf_file_path, 'rb') as pdf_file:
            binary_pdf_content = pdf_file.read()

        # Xóa các tệp tạm thời
        import os
        os.remove(temp_docx_file_path)
        os.remove(temp_pdf_file_path)

        return binary_pdf_content
    def convert_binary_pptx_to_pdf(self, binary_pptx_content):
        # Lưu tạm thời dữ liệu PPTX vào một file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pptx') as temp_pptx_file:
            temp_pptx_file.write(binary_pptx_content)
            temp_pptx_file_path = temp_pptx_file.name

        # Chuyển đổi PPTX sang PDF bằng pptxtopdf
        temp_pdf_file_path = temp_pptx_file_path.replace('.pptx', '.pdf')
        pptxtopdf.convert(temp_pptx_file_path, temp_pdf_file_path)

        # Đọc dữ liệu PDF từ file và chuyển nó thành nhị phân
        with open(temp_pdf_file_path, 'rb') as pdf_file:
            binary_pdf_content = pdf_file.read()

        # Xóa các tệp tạm thời
        os.remove(temp_pptx_file_path)
        os.remove(temp_pdf_file_path)

        return binary_pdf_content
    def upload_files(self, files):
        uploaded_files_info = []

        try:
            total_size_mb = sum(file.size for file in files) / (1024 * 1024)  # Tổng kích thước của tất cả file ảnh
            if total_size_mb > self.MAX_FILE_SIZE_MB:
                return Response(
                    {
                        "success": False,
                        "message": f"Tổng kích thước vượt quá giới hạn {self.MAX_FILE_SIZE_MB} MB"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                for file in files:
                    file_size_mb = file.size / (1024 * 1024)
                    # Đọc nội dung file dưới dạng binary
                    file_extension = os.path.splitext(file.name)[-1].lower()
                    
                    # Chuyển đổi file nếu cần
                    if file_extension == '.docx':
                        file.name = file.name.replace('.docx', '.pdf')
                        binary_content = self.convert_binary_docx_to_pdf(file.read())
                    elif file_extension == '.pptx':
                        file.name = file.name.replace('.pptx', '.pdf')
                        binary_content = self.convert_binary_pptx_to_pdf(file.read())
                    else:
                        binary_content = file.read()
                    print(file.name)
                    # Tạo đường dẫn lưu trữ file trên máy chủ
                    save_path = os.path.join("uploaded_files", file.name)
                    save_path = save_path.replace('.docx', '.pdf')
                    # Đảm bảo thư mục tồn tại
                    os.makedirs(os.path.dirname(save_path), exist_ok=True)
                    
                    # Lưu file
                    # with open(save_path, 'wb') as f:
                    #     f.write(binary_content)
            
                    # Lưu thông tin file
                    uploaded_files_info.append({
                        "file_name": file.name,
                        "file_size_mb": round(file_size_mb, 2),
                        "file_content": base64.b64encode(binary_content).decode("utf-8")
                    })

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
                "message": "Upload tài liệu thành công và đã lưu file",
                "data": uploaded_files_info  # Trả thông tin chi tiết về các tệp đã tải lên
            },
            status=status.HTTP_200_OK
        )

class GenerateQuestionsAPIView(GenericAPIView):
    def process_question(self, q_data):
        lines = [item for item in q_data.split("\n") if item != '']

        # Lấy câu hỏi
        question = lines[1].replace("**", "") if '**' in lines[1] else lines[1]
        question = question.split(':')[1].strip()
        # Lấy các đáp án
        option_A = lines[2].split('A)')[1].strip()
        option_B = lines[3].split('B)')[1].strip()
        option_C = lines[4].split('C)')[1].strip()
        option_D = lines[5].split('D)')[1].strip()
        
        # Lấy đáp án đúng
        answer = lines[6][-1]
        
        # Lấy giải thích
        explanation = lines[7].replace("*", "") if '*' in lines[7] else lines[7]
        explanation = explanation.split(':')[1].strip()
        
        # Lấy đoạn văn hỗ trợ
        supporting_text = lines[8].replace("*", "") if '*' in lines[8] else lines[8]
        supporting_text = supporting_text.split(':')[1].strip()
      
        # Tạo đối tượng JSON cho mỗi câu hỏi
        return {
            "question_text": question,
            "explanation": explanation,
            "answer_text_A": option_A,
            "answer_text_B": option_B,
            "answer_text_C": option_C,
            "answer_text_D": option_D,
            "is_correct": answer
        }

    # Danh sách kết quả
    def post(self, request):
        isExternalSearch = request.data.get('isExternalSearch')  # Lấy giá trị 'isExternalSearch' từ request
        files = request.data.get('files')  # Lấy dữ liệu file base64 từ request
        
        if not files:
            return Response(
                {
                    "success": False,
                    "message": "Không có dữ liệu file base64"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            context = ''
            if files[0]['file_name'].split('.')[1] == 'pdf':
                # Giải mã base64
                file_data = base64.b64decode(files[0]['file_content'])
                context = extract_text_from_pdf(file_data)
                questions = generate_mcqs_from_text(context, isExternalSearch=isExternalSearch)
            else:
                for file in files:
                    file_data = base64.b64decode(file['file_content'])
                    context += extract_text_from_image(file_data)
                questions = generate_mcqs_from_text(context, isExternalSearch=isExternalSearch)
            questions = [self.process_question(q_data) for q_data in questions]
            # print(self.process_question(questions[0]))

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
                "questions": questions,
                "context": context,
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
            question_text = question["question_text"]
            question_explanation = question["explanation"]
            question_answer_text_A = question["answer_text_A"]
            question_answer_text_B = question["answer_text_B"]
            question_answer_text_C = question["answer_text_C"]
            question_answer_text_D = question["answer_text_D"]
            question_is_correct = question["is_correct"]
            
            if not QuestionsValidator.check_question_text(question_text):
                
                return Response(
                {
                    "success": False,
                    "message": "Nội dung câu hỏi không hợp lệ"
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
                        'question_bank_id': ObjectId(question_bank_id),
                        'created_at': datetime.now(),
                        'updated_at': datetime.now(),
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
        
class ModifyHandcraftedQuestionAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            question_id = data["question"]["question_id"]
            question = data["question"]
            
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin câu hỏi không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            
            update_fields = {
                'question_text': question["question_text"],
                'updated_at': datetime.now(),
                'answer_text_A': question["answer_text_A"],
                'answer_text_B': question["answer_text_B"],
                'answer_text_C': question["answer_text_C"],
                'answer_text_D': question["answer_text_D"],
                'is_correct': question["is_correct"],
                'explanation': question["explanation"],
            }
        
            BaseModel.update_one('questions', 
                {
                    '_id': ObjectId(question_id)
                },
                {
                    '$set': update_fields
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
class ModifyChatBotQuestionAPIView(GenericAPIView):
    def process_question(self, q_data, question_id):
        lines = [item for item in q_data.split("\n") if item != '']

        # Lấy câu hỏi
        question = lines[0].replace("**", "") if '**' in lines[0] else lines[0]
        question = question.split(':')[1].strip()
        # Lấy các đáp án
        option_A = lines[1].split('A)')[1].strip()
        option_B = lines[2].split('B)')[1].strip()
        option_C = lines[3].split('C)')[1].strip()
        option_D = lines[4].split('D)')[1].strip()
        
        # Lấy đáp án đúng
        answer = lines[5][-1]
        
        # Lấy giải thích
        explanation = lines[6].replace("*", "") if '*' in lines[6] else lines[6]
        explanation = explanation.split(':')[1].strip()
        
        # Lấy đoạn văn hỗ trợ
        supporting_text = lines[7].replace("*", "") if '*' in lines[7] else lines[7]
        supporting_text = supporting_text.split(':')[1].strip()
      
        # Tạo đối tượng JSON cho mỗi câu hỏi
        return {
            "question_id": question_id,
            "question_text": question,
            "explanation": explanation,
            "answer_text_A": option_A,
            "answer_text_B": option_B,
            "answer_text_C": option_C,
            "answer_text_D": option_D,
            "is_correct": answer
        }
    def post(self, request):
        data = request.data
        try:
            question_id = data.get("question", {}).get("question_id", "")
            question = data["question"]
            context = data["context"]
            edit_request = data["edit_request"]
            question_text = f"""
            Question: {question["question_text"]}
                A) {question["answer_text_A"]}
                B) {question["answer_text_B"]}
                C) {question["answer_text_C"]}
                D) {question["answer_text_D"]}
            Answer: {question["is_correct"]}
            Explanation: {question["explanation"]}
            """
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin câu hỏi không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        
        
        try:
            modified_question_text = modify_mcq(context, question_text, edit_request)
            modified_question_text_json=self.process_question(modified_question_text, question_id)
            if (question_id==""):
                modified_question_text_json.pop("question_id", None)
            # BaseModel.update_one('questions', 
            #     {
            #         '_id': ObjectId(question_id)
            #     },
            #     {
            #         '$set': {
            #             'question_text': question_text,
            #             'updated_at': datetime.now()
            #         }
            #     }    
            # )
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
                "data": modified_question_text,
                "data_json": modified_question_text_json,
                "message": "Sửa thành công câu hỏi"
            }, 
            status=status.HTTP_200_OK
        )

class GetDetailedQuestionAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            question_id = params['question_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin câu hỏi không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizQuestionValidator.check_question_id(question_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã câu hỏi không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            question = BaseModel.find_one('questions', {
                '_id': ObjectId(question_id)
            })
            
            data ={
                    "question_id": str(question.get("_id", None)),
                    "create_date": question.get("created_at", None).strftime("%H:%M %d/%m/%Y"),
                    "question_text": question.get("question_text", None),
                    "explanation": question.get("explanation", None),
                    "answer_text_A": question.get("answer_text_A", None),
                    "answer_text_B": question.get("answer_text_B", None),
                    "answer_text_C": question.get("answer_text_C", None),
                    "answer_text_D": question.get("answer_text_D", None),
                    "is_correct": question.get("is_correct", None)
            }
            
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
                "data": data,
                "message": "Lấy thành công danh sách tất cả bộ câu hỏi"
            }, 
            status=status.HTTP_200_OK
        )       
class CreateQuestionBankAPIView(GenericAPIView):
    def post(self, request):
        try:
            user_id = request.data.get('user_id')  
            
            title = request.data.get('title')
            context = request.data.get('context')
            print(user_id, title, context)
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
            question_bank_id = BaseModel.insert_one('question_bank', {
                'user_id': ObjectId(user_id),
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
                "question_bank_id": str(question_bank_id),
                "message": "Tạo thành công bộ câu hỏi"
            }, 
            status=status.HTTP_200_OK
        )

class GetAllQuestionBankAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            user_id = params['user_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin người dùng không hợp lệ"
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

        try:
            results = BaseModel.find_many('question_bank', {
                'user_id': ObjectId(user_id)
            })
            
            data = []
            for result in results:
                data.append(
                    {
                        "question_bank_id": str(result.get("_id", None)),
                        "create_date": result.get("created_at", None).strftime("%H:%M %d/%m/%Y"),
                        "title": result.get("title", None)
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
                "data": data,
                "message": "Lấy thành công danh sách tất cả bộ câu hỏi"
            }, 
            status=status.HTTP_200_OK
        )
        
class GetDetailedQuestionBankAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            question_bank_id = params['question_bank_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin bộ câu hỏi không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuestionsValidator.check_question_bank_id(question_bank_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã bộ câu hỏi không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            question_bank_questions = BaseModel.find_many('questions', {
                'question_bank_id': ObjectId(question_bank_id)
            })
            
            data = []
            for result in question_bank_questions:
                data.append(
                    {
                        "question_id": str(result.get("_id", None)),
                        "create_date": result.get("created_at", None).strftime("%H:%M %d/%m/%Y"),
                        "question_text": result.get("question_text", None)
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
                "data": data,
                "message": "Lấy thành công danh sách bộ câu hỏi"
            }, 
            status=status.HTTP_200_OK
        )