from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from datetime import datetime, timedelta
from collections import defaultdict
from bson import ObjectId
import math

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, UserValidator, QuizAttemptsValidator, UserAnswersValidator
from ..models.base import BaseModel

class UpdateQuizAttemptAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            user_id = data['user_id']
            quiz_id = data['quiz_id']
            time_taken = data['time_taken']
            user_answers = data['user_answers']
          
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin đề thi không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
         
        if not QuizAttemptsValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizAttemptsValidator.check_quiz_id(quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã đề thi không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            correct_ans_count = sum([user_answer["user_answer"] == user_answer["correct_answer"] for user_answer in user_answers])
            incorrect_ans_count = len(user_answers) - correct_ans_count
            score = correct_ans_count / len(user_answers) * 10
            score = round(score, 1)
            attempt_data = {
                'user_id': ObjectId(user_id),
                'quiz_id': ObjectId(quiz_id),
                'score': score,
                'time_taken': math.ceil(time_taken),
                'attempted_start': datetime.now() - timedelta(minutes=math.ceil(time_taken)),
                'attempted_at': datetime.now(),
                'correct_ans_count': correct_ans_count,
                'incorrect_ans_count': incorrect_ans_count,
            }
            
            attempt_id = BaseModel.insert_one('quiz_attempts',
                attempt_data
            )
            for user_answer in user_answers:
                BaseModel.insert_one('user_answers',
                {
                    'attempt_id': attempt_id,
                    'question_id' : user_answer['question_id'],
                    'user_answer' : user_answer['user_answer']
                    
                })

            BaseModel.update_one('quizzes', 
                {
                    '_id': ObjectId(quiz_id)
                },
                {
                    '$set': {
                        'updated_at': datetime.now()
                    },
                    '$inc': {
                        'attempt_count': 1
                    }
                }    
            )
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi khi cập nhật lịch sử thi",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        return Response(
            {
                "success": True,
                "message": "Lịch sử thi đã được cập nhật thành công",
                "attempt_id": str(attempt_id),
            },
            status=status.HTTP_200_OK
        )
class GetQuizAttemptAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            attempted_id = params['attempted_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            result = BaseModel.find_one('quiz_attempts', {
                '_id': ObjectId(attempted_id)
            })
            user_answers = BaseModel.find_many('user_answers', {
                'attempt_id': ObjectId(attempted_id)
            })
            quiz = BaseModel.find_one('quizzes', {
                '_id': result["quiz_id"]
            })
            questions = []
            for user_answer in user_answers:
                question = BaseModel.find_one('questions', {
                    '_id': ObjectId(user_answer['question_id'])
                })
                questions.append({
                    "question_id" : user_answer['question_id'],
                    "question_text" : question["question_text"],
                    "answer_text_A" : question["answer_text_A"],
                    "answer_text_B" : question["answer_text_B"],
                    "answer_text_C" : question["answer_text_C"],
                    "answer_text_D" : question["answer_text_D"],
                    "explanation" : question["explanation"],
                    "is_correct" : question["is_correct"],
                    "user_answer" : user_answer["user_answer"],
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
                "data": {
                    "time_taken": result["time_taken"],
                    "title": quiz["title"],
                    "attempted_at": result["attempted_at"],
                    "attempted_start": result["attempted_start"],
                    "score": result["score"],
                    "correct_ans_count": result["correct_ans_count"],
                    "incorrect_ans_count": result["incorrect_ans_count"],
                    "number_of_question": result["correct_ans_count"] + result["incorrect_ans_count"],
                    "questions": questions
                },
                "message": "Lấy thành công danh sách lịch sử thi"
            }, 
            status=status.HTTP_200_OK
        )
    
class GetListAllQuizAttemptsAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            quiz_id = params['quiz_id']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizAttemptsValidator.check_quiz_id(quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            results = BaseModel.find_many('quiz_attempts', {
                'quiz_id': ObjectId(quiz_id)
            })
            quiz_title =  BaseModel.find_one('quizzes', {
                '_id': ObjectId(quiz_id)
            })
            data = []
            for result in results:
                data.append({
                    "time_taken": result["time_taken"],
                    "title": quiz_title['title'],
                    "attempted_id": str(result['_id']),
                    "score": result["score"],
                    "correct_ans_count": result["correct_ans_count"],
                    "incorrect_ans_count": result["incorrect_ans_count"],
                    "number_of_question": result["correct_ans_count"] + result["incorrect_ans_count"],

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
                "data": data,
                "message": "Lấy thành công danh sách lịch sử thi"
            }, 
            status=status.HTTP_200_OK
        )
    
class GetAllQuizAttemptsAPIView(GenericAPIView):
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
        
        if not QuizAttemptsValidator.check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            result = BaseModel.find_many('quiz_attempts',{'user_id':user_id})
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Database"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        if not result:
            return Response(
                {
                    "success": True,
                    "data": [],
                    "message": "Không có lịch sử thi nào trong hệ thống"
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "success": True,
                "data": result,
                "message": "Lấy thành công lịch sử thi của người dùng"
            },
            status=status.HTTP_200_OK
        )

class GetDetailedQuizAttemptsAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params

class GetTopActQuizAttemptsAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            user_id = params.get('user_id', None)
            top_n = int(params.get('top_n', 10))  # Mặc định lấy top 10 nếu không cung cấp tham số
            if top_n <= 0:
                raise ValueError("Tham số top_n không hợp lệ")
        except:
            return Response(
                {
                    "success": False,
                    "message": "Tham số top_n không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        activities = []
        try:
            quiz_attempts = BaseModel.find_many(
                'quiz_attempts',
                {
                    'user_id': ObjectId(user_id)
                },
            )
            quiz_attempts = sorted(
                quiz_attempts,
                key=lambda quiz_attempt: quiz_attempt.get('attempted_at'),
                reverse=False
            )
            quiz_ids = [quiz_attempt.get('quiz_id') for quiz_attempt in quiz_attempts]
            unique_quiz_ids = list(set(quiz_ids))
            top_n_quiz_ids = unique_quiz_ids[:top_n]
            for quiz_id in top_n_quiz_ids:
                quiz = BaseModel.find_one(
                    'quizzes',
                    {
                        '_id': quiz_id
                    }
                )
                activities.append({
                    'quiz_id': str(quiz_id),
                    'title': quiz.get('title', None),
                    'updated_at': quiz.get('updated_at', None),
                })
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Database",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(
            {
                "success": True,
                "data": activities,
                "message": f"Lấy thành công top {top_n} hoạt động gần nhất"
            },
            status=status.HTTP_200_OK
        )


class ResultsStatisticsAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        try:
            user_id = params.get('user_id')
        except:
            return Response(
                {
                    "success": False,
                    "message": "Thông tin người dùng không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            quiz_attempts = BaseModel.find_many(
                'quiz_attempts',
                {'user_id': ObjectId(user_id)}
            )
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Database",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        if not quiz_attempts:
            return Response(
                {
                    "success": True,
                    "data": {
                        "weekly_statistics": [],
                        "monthly_statistics": []
                    },
                    "message": "Người dùng chưa có lịch sử làm bài"
                },
                status=status.HTTP_200_OK
            )

        # Chuẩn bị dữ liệu thống kê
        weekly_statistics = defaultdict(list)
        monthly_statistics = defaultdict(list)

        try:
            for attempt in quiz_attempts:
                attempt_id = str(attempt.get('_id'))
                quiz_id = str(attempt.get('quiz_id'))
                score = attempt.get('score')
                attempted_at = attempt.get('attempted_at')
                
                # Tính toán tuần và tháng
                week_key = f"{attempted_at.year}-W{attempted_at.isocalendar()[1]}"
                month_key = f"{attempted_at.year}-{attempted_at.month:02d}"

                # Thêm điểm số vào thống kê
                weekly_statistics[week_key].append({'attempt_id': attempt_id, 'quiz_id': quiz_id, 'score': score, 'attempted_at': attempted_at})
                monthly_statistics[month_key].append({'attempt_id': attempt_id, 'quiz_id': quiz_id, 'score': score, 'attempted_at': attempted_at})

            # Tổng hợp kết quả
            weekly_result = [
                {"week": week, "results": results}
                for week, results in sorted(weekly_statistics.items())
            ]
            monthly_result = [
                {"month": month, "results": results}
                for month, results in sorted(monthly_statistics.items())
            ]
            
            return Response(
                {
                    "success": True,
                    "data": {
                        "weekly_statistics": weekly_result,
                        "monthly_statistics": monthly_result
                    },
                    "message": "Thống kê kết quả làm bài thành công"
                },
                status=status.HTTP_200_OK
            )

        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi khi xử lý dữ liệu thống kê",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

