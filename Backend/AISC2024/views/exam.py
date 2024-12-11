from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from datetime import datetime, timedelta
from collections import defaultdict
from bson import ObjectId

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, UserValidator, QuizAttemptsValidator, UserAnswersValidator
from ..models.base import BaseModel

class UpdateQuizAttemptAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            user_id = data['user_id']
            quiz_id = data['quiz_id']
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
                    "title": quiz["title"],
                    "attempted_at": result["attempted_at"].strftime('%A, %d/%m/%Y, %H:%M'),
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
            data = []
            for result in results:
                data.append({
                    "attempted_id": str(result['_id']),
                    "score": result["score"],
                    "correct_ans_count": result["correct_ans_count"],
                    "incorrect_ans_count": result["incorrect_ans_count"],
                    "number_of_question": result["correct_ans_count"] + result["incorrect_ans_count"],

                })
                print(result['_id'])
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

        try:
            result = BaseModel.find_many(
                'quiz_attempts',
                {},
                sort=[('attempted_at', -1)],  # Sắp xếp theo `attempted_at` giảm dần
                limit=top_n
            )
        except:
            return Response(
                {
                    "success": False,
                    "message": "Lỗi Database",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        if not result:
            return Response(
                {
                    "success": True,
                    "data": [],
                    "message": "Không có hoạt động nào trong hệ thống"
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "success": True,
                "data": result,
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
                {'user_id': user_id}
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
                attempt_id = attempt.get('attempt_id')
                score = attempt.get('score')
                attempted_at = attempt.get('attempted_at')

                # Chuyển đổi thời gian làm bài về dạng datetime
                attempted_date = datetime.strptime(attempted_at, "%Y-%m-%dT%H:%M:%S")

                # Tính toán tuần và tháng
                week_key = f"{attempted_date.year}-W{attempted_date.isocalendar()[1]}"
                month_key = f"{attempted_date.year}-{attempted_date.month:02d}"

                # Thêm điểm số vào thống kê
                weekly_statistics[week_key].append({'attempt_id': attempt_id, 'score': score})
                monthly_statistics[month_key].append({'attempt_id': attempt_id, 'score': score})

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

