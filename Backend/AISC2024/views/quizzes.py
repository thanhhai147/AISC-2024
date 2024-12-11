from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from datetime import datetime
from bson import ObjectId

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, QuizzesValidator, QuestionsValidator, QuizQuestionValidator
from ..models.base import BaseModel

class CreateQuizAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            quiz = data.get('quiz', None)
            user_id = quiz.get('user_id', None)
            title = quiz.get('title', None)
            time_limit = quiz.get('time_limit', None)
            time_limit = int(time_limit) if time_limit is not None else None
            question_ids = quiz.get('question_ids')
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
        
        if not question_ids or type(question_ids) != list or len(question_ids) == 0:
            return Response(
                {
                    "success": False,
                    "message": "Mã câu hỏi không hợp lệ"
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
                'user_id': ObjectId(user_id),
                'title': title,
                'attempt_count': 0,
                'number_of_questions': len(question_ids),
                'time_limit': time_limit,
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            })
            BaseModel.insert_many('quiz_question', [
                {
                    'question_id': ObjectId(question_id),
                    'quiz_id': ObjectId(quiz_id),
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
                "message": "Tạo thành công đề ôn",
                "data": {
                    "quiz_id": str(quiz_id)
                }
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
                'question_id': ObjectId(question_id),
                'quiz_id': ObjectId(quiz_id),
                'created_at': datetime.now(),
                'updated_at': datetime.now()
            })
            quiz = BaseModel.find_one('quizzes', {
                '_id': ObjectId(quiz_id)
            })
            BaseModel.update_one(
                'quizzes',
                {
                    '_id': ObjectId(quiz_id)
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
                'question_id': ObjectId(question_id),
                'quiz_id': ObjectId(quiz_id)
            })
            quiz = BaseModel.find_one('quizzes', {
                '_id': ObjectId(quiz_id)
            })
            BaseModel.update_one(
                'quizzes',
                {
                    '_id': ObjectId(quiz_id)
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
            quiz = data.get('quiz', None)
            quiz_id = quiz.get('quiz_id', None)
            title = quiz.get('title', None)
            time_limit = quiz.get('time_limit', None)
            time_limit = int(time_limit)
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
                    '_id': ObjectId(quiz_id)
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
                "message": "Chỉnh sửa thành công đề ôn"
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
                '_id': ObjectId(quiz_id)
            })

            BaseModel.delete_many('quiz_question', {
                'quiz_id': ObjectId(quiz_id)
            })

            quiz_attempts = BaseModel.find_many('quiz_attempts', {
                'quiz_id': ObjectId(quiz_id)
            })

            for quiz_attempt in quiz_attempts:
                BaseModel.delete_many('user_answers', {
                    'attempt_id': quiz_attempt['_id']
                })
            
            BaseModel.delete_many('quiz_attempts', {
                'quiz_id': ObjectId(quiz_id)
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
                "message": "Xóa thành công  đề ôn"
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
                'user_id': ObjectId(user_id)
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
                "data": sorted(
                    [
                        {
                            'quiz_id': str(result.get('_id', None)),
                            'user_id': str(result.get('user_id', None)),
                            'title': result.get('title', None),
                            'attempt_count': result.get('attempt_count', None),
                            'number_of_questions': result.get('number_of_questions', None),
                            'time_limit': result.get('time_limit', None),
                            'updated_at': result.get('updated_at', None)
                        } for result in results
                    ],
                    key=lambda quiz: quiz['updated_at'],
                    reverse=True
                ),
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
                'user_id': ObjectId(user_id)
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
                "data": sorted(
                    [
                        {
                            'quiz_id': str(result.get('_id', None)),
                            'user_id': str(result.get('user_id', None)),
                            'title': result.get('title', None),
                            'attempt_count': result.get('attempt_count', None),
                            'number_of_questions': result.get('number_of_questions', None),
                            'time_limit': result.get('time_limit', None),
                            'updated_at': result.get('updated_at', None)
                        } for result in results
                    ],
                    key=lambda quiz: quiz['updated_at'],
                    reverse=True
                ),
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
                'user_id': ObjectId(user_id)
            })

            attended_quiz_ids = [quiz_attempt['quiz_id'] for quiz_attempt in quiz_attempts]
            unique_attended_quiz_ids = list(set(attended_quiz_ids))

            all_quiz = BaseModel.find_many('quizzes', {
                'user_id': ObjectId(user_id)
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
                "data": sorted(
                    [
                        {
                            'quiz_id': str(result.get('_id', None)),
                            'user_id': str(result.get('user_id', None)),
                            'title': result.get('title', None),
                            'attempt_count': result.get('attempt_count', None),
                            'number_of_questions': result.get('number_of_questions', None),
                            'time_limit': result.get('time_limit', None),
                            'updated_at': result.get('updated_at', None)
                        } for result in results
                    ],
                    key=lambda quiz: quiz['updated_at'],
                    reverse=True
                ),
                "message": "Lấy thành công danh sách đề ôn chưa làm"
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
                '_id': ObjectId(quiz_id)
            })
            quiz_questions = BaseModel.find_many('quiz_question', {
                'quiz_id': ObjectId(quiz_id)
            })
            question_ids = [quiz_question['question_id'] for quiz_question in quiz_questions]
            questions = BaseModel.find_many('questions', {
                '_id': {
                    '$in': question_ids
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

        quiz_info = {
            'quiz_id': str(quiz.get('_id', None)),
            'user_id': str(quiz.get('user_id', None)),
            'title': quiz.get('title', None),
            'attempt_count': quiz.get('attempt_count', None),
            'number_of_questions': quiz.get('number_of_questions', None),
            'time_limit': quiz.get('time_limit', None),
            'created_at': quiz.get('created_at', None),
            'updated_at': quiz.get('updated_at', None)
        }
        questions_info = [
            {
                'question_id': str(question.get('_id', None)),
                'question_bank_id': str(question.get('question_bank_id', None)),
                'question_text': question.get('question_text', None),
                'created_at': question.get('created_at', None),
                'updated_at': question.get('updated_at', None),
                'explanation': question.get('explanation', None),
                'answer_text_A': question.get('answer_text_A', None),
                'answer_text_B': question.get('answer_text_B', None),
                'answer_text_C': question.get('answer_text_C', None),
                'answer_text_D': question.get('answer_text_D', None),
                'is_correct': question.get('is_correct', None)
            } for question in questions
        ]

        return Response(
            {
                "success": True,
                "data": {
                    "quiz": quiz_info,
                    "questions": questions_info
                },
                "message": "Lấy thành công danh sách đề ôn đã làm"
            }, 
            status=status.HTTP_200_OK
        )