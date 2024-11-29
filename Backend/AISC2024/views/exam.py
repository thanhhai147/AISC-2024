from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
from datetime import datetime, timedelta

from ..validators.custom_validators import BaseValidator, AdancedValidator
from ..validators.model_validators import ModelValidator, UserValidator, QuizAttemptsValidator, UserAnswersValidator
from ..models.base import BaseModel

class UpdateQuizAttemptAPIView(GenericAPIView):
    def post(self, request):
        data = request.data
        try:
            quiz_attempt = data['quiz_attempt']
            attempt_id = data['attempt_id']
            user_id = quiz_attempt['user_id']
            quiz_id = quiz_attempt['quiz_id']
            score = quiz_attempt['score']
            attempted_at = quiz_attempt['attempted_at']
            completion_level = quiz_attempt['completion_level']
            correct_ans_count = quiz_attempt['correct_ans_count']
            incorrect_ans_count = quiz_attempt['incorrect_ans_count']

            user_answer = data['user_answer']
            question_id = user_answer['question_id']
            answer_id = user_answer['answer_id']
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
        
        if not UserAnswersValidator.check_answer_id(answer_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã câu trả lời không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not UserAnswersValidator.check_question_id(question_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã câu hỏi không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizAttemptsValidator.check_correct_ans_count(correct_ans_count, quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Số câu đúng không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizAttemptsValidator.check_incorrect_ans_count(incorrect_ans_count, quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Số câu sai không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizAttemptsValidator.check_score(score, quiz_id):
            return Response(
                {
                    "success": False,
                    "message": "Điểm số không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizAttemptsValidator.check_completion_level(completion_level):
            return Response(
                {
                    "success": False,
                    "message": "Mức độ hoàn thàn không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not QuizAttemptsValidator.check_attempted_at(attempted_at):
            return Response(
                {
                    "success": False,
                    "message": "Thời gian thi không hợp lệ"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            attempt_data = {
                'user_id': user_id,
                'quiz_id': quiz_id,
                'score': score,
                'attempted_at': attempted_at,
                'completion_level': completion_level,
                'correct_ans_count': correct_ans_count,
                'incorrect_ans_count': incorrect_ans_count,
                'updated_at': datetime.now()
            }
            BaseModel.update_one(
                'quiz_attempts',
                {'_id': attempt_id},
                {'$set': attempt_data}
            )

            if question_id and answer_id:
                answer_data = {
                    'attempt_id': attempt_id,
                    'question_id': question_id,
                    'answer_id': answer_id,
                    'answered_at': datetime.now()
                }
                BaseModel.update_one(
                    'user_answers',
                    {'attempt_id': attempt_id, 'question_id': question_id},
                    {'$set': answer_data}
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
                "data": {
                    "quiz_attempt": attempt_data,
                    "user_answer": answer_data if question_id and answer_id else None,
                }
            },
            status=status.HTTP_200_OK
        )

class GetListAllQuizAttemptsAPIView(GenericAPIView):
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
        
        if not QuizAttemptsValidator .check_user_id(user_id):
            return Response(
                {
                    "success": False,
                    "message": "Mã người dùng không hợp lệ"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            results = BaseModel.find_many('quiz_attempts', {
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

from collections import defaultdict

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

