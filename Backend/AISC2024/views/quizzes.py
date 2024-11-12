from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from datetime import datetime

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, QuizzesValidator, QuestionsValidator, QuizQuestionValidator
from ..models.base import BaseModel

class CreateQuizAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            quiz = data['quiz']
            user_id = quiz['user_id']
            title = quiz['title']
            time_limit = quiz['time_limit']
            question_ids = quiz['question_ids']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizzesValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not QuizzesValidator.check_title(title):
            return Response(
                {
                    "success": False,
                    "message": "Tiêu đề không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if not QuizzesValidator.check_time_limit(time_limit):
            return Response(
                {
                    "success": False,
                    "message": "Thời gian làm bài không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        for question_id in question_ids:
            if not QuizQuestionValidator.check_question_id(question_id):
                return Response(
                    {
                        "success": False,
                        "message": "Mã câu hỏi không hợp lệ"
                    }, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        try:
            quiz_id = BaseModel.insert_one('quizzes', {
                'user_id': user_id,
                'title': title,
                'attempt_count': 0,
                'number_of_questions': len(question_ids),
                'time_limit': time_limit,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            })

            BaseModel.insert_many('quiz_question', [
                {
                    'question_id': question_id,
                    'quiz_id': quiz_id,
                    'created_at': datetime.now(),
                    'updated_at': datetime.now()
                } for question_id in question_ids
            ])
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
                "message": "Tạo thành công đề ôn"
            }, 
            status=status.HTTP_200_OK
        )

class AddQuestionToQuizAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            question_id = data['question_id']
            quiz_id = data['quiz_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin đề ôn không hợp lệ"
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
        
        if not QuizQuestionValidator.check_quiz_id(quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            BaseModel.insert_one('quiz_question', {
                'question_id': question_id,
                'quiz_id': quiz_id,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            })
            quiz = BaseModel.find_one('quizzes', {
                '_id': quiz_id
            })
            BaseModel.update_one(
                'quizzes',
                {
                    '_id': quiz_id
                },
                {
                    '$set': {
                        'number_of_questions': quiz['number_of_questions'] + 1,
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
                "message": "Thêm thành công câu hỏi vào đề ôn"
            }, 
            status=status.HTTP_200_OK
        )
    
class DeleteQuestionFromQuizAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            question_id = data['question_id']
            quiz_id = data['quiz_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin đề ôn không hợp lệ"
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
        
        if not QuizQuestionValidator.check_quiz_id(quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            BaseModel.delete_one('quiz_question', {
                'question_id': question_id,
                'quiz_id': quiz_id,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            })
            quiz = BaseModel.find_one('quizzes', {
                '_id': quiz_id
            })
            BaseModel.update_one(
                'quizzes',
                {
                    '_id': quiz_id
                },
                {
                    '$set': {
                        'number_of_questions': quiz['number_of_questions'] - 1,
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
                "message": "Xóa thành công câu hỏi khỏi đề ôn"
            }, 
            status=status.HTTP_200_OK
        )
        

class EditQuizAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            quiz = data['quiz']
            quiz_id = quiz['quiz_id']
            title = quiz['title']
            time_limit = quiz['time_limit']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizQuestionValidator.check_quiz_id(quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizzesValidator.check_title(title):
            return Response(
                {
                    "success": False,
                    "message": "Tiêu đề không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizzesValidator.check_time_limit(time_limit):
            return Response(
                {
                    "success": False,
                    "message": "Thời gian làm bài không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            BaseModel.update_one('quizzes', 
                {
                    '_id': quiz_id
                },
                {
                    '$set': {
                        'title': title,
                        'time_limit': time_limit,
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
                "message": "Thêm thành công câu hỏi vào đề ôn"
            }, 
            status=status.HTTP_200_OK
        )

class DeleteQuizAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            quiz_id = data['quiz_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizQuestionValidator.check_quiz_id(quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            BaseModel.delete_one('quizzes', {
                '_id': quiz_id
            })

            BaseModel.delete_many('quiz_question', {
                'quiz_id': quiz_id
            })

            quiz_attempts = BaseModel.find_many('quiz_attempts', {
                'quiz_id': quiz_id
            })

            for quiz_attempt in quiz_attempts:
                BaseModel.delete_many('user_answers', {
                    'attempt_id': quiz_attempt['_id']
                })
            
            BaseModel.delete_many('quiz_attempts', {
                'quiz_id': quiz_id
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
                "message": "Thêm thành công câu hỏi vào đề ôn"
            }, 
            status=status.HTTP_200_OK
        )

class GetAllQuiz(GenericAPIView):
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
        
        if not QuizzesValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            results = BaseModel.find_many('quizzes', {
                'user_id': user_id
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
                "data": results,
                "message": "Lấy thành công danh sách tất cả đề ôn"
            }, 
            status=status.HTTP_200_OK
        )
    
class GetAttendedQuiz(GenericAPIView):
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
        
        if not QuizzesValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            quiz_attempts = BaseModel.find_many('quiz_attempts', {
                'user_id': user_id
            })

            quiz_ids = [quiz_attempt['quiz_id'] for quiz_attempt in quiz_attempts]
            unique_quiz_ids = list(set(quiz_ids))

            results = BaseModel.find_many('quizzes', {
                'quiz_id': {
                    '$in': unique_quiz_ids
                }            
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
                "data": results,
                "message": "Lấy thành công danh sách đề ôn đã làm"
            }, 
            status=status.HTTP_200_OK
        )

class GetUnAttendedQuiz(GenericAPIView):
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
        
        if not QuizzesValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            quiz_attempts = BaseModel.find_many('quiz_attempts', {
                'user_id': user_id
            })

            attended_quiz_ids = [quiz_attempt['quiz_id'] for quiz_attempt in quiz_attempts]
            unique_attended_quiz_ids = list(set(attended_quiz_ids))

            all_quiz = BaseModel.find_many('quizzes', {
                'user_id': user_id
            })
            all_quiz_ids = [quiz['_id'] for quiz in all_quiz]

            unattended_quiz_ids = list(set(all_quiz_ids) - set(unique_attended_quiz_ids))
            results = BaseModel.find_many('quizzes', {
                '_id': {
                    "$in": unattended_quiz_ids
                }
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
                "data": results,
                "message": "Lấy thành công danh sách đề ôn đã làm"
            }, 
            status=status.HTTP_200_OK
        )
    
class GetDetailedQuiz(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            quiz_id = params['quiz_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizQuestionValidator.check_quiz_id(quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã đề ôn không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            quiz = BaseModel.find_one('quizzes', {
                '_id': quiz_id
            })

            quiz_questions = BaseModel.find_many('quiz_question', {
                'quiz_id': quiz_id
            })
            question_ids = [quiz_question['question_id'] for quiz_question in quiz_questions]
            questions = BaseModel.find_many('questions', {
                '_id': {
                    '$in': question_ids
                }
            })
            answers = BaseModel.find_many('answers', {
                'question_id': {
                    '$in': question_ids
                }
            })

            brief_info = quiz
            detailed_info = {}
            for question in questions:
                detailed_info[question['_id']] = question
                detailed_info[question['_id']]['answers'] = []
            for answer in answers:
                detailed_info[answer['question_id']]['answers'].append(answer)
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
                "data": {
                    "brief_info": brief_info,
                    "detailed_info": detailed_info
                },
                "message": "Lấy thành công danh sách đề ôn đã làm"
            }, 
            status=status.HTTP_200_OK
        )