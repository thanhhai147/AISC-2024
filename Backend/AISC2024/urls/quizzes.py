from django.urls import path
from ..views.quizzes import CreateQuizAPIView, AddQuestionToQuizAPIView, DeleteQuestionFromQuizAPIView, EditQuizAPIView, DeleteQuizAPIView, GetAllQuiz, GetAttendedQuiz, GetUnAttendedQuiz, GetDetailedQuiz

urlpatterns = [
    path('create-quiz', CreateQuizAPIView.as_view(), name='create-quiz'),
    path('add-question-to-quiz', AddQuestionToQuizAPIView.as_view(), name='add-question-to-quiz'),
    path('delete-question-from-quiz', DeleteQuestionFromQuizAPIView.as_view(), name='delete-question-from-quiz'),
    path('edit-quiz', EditQuizAPIView.as_view(), name='edit-quiz'),
    path('delete-quiz', DeleteQuizAPIView.as_view(), name='delete-quiz'),
    path('get-all-quiz', GetAllQuiz.as_view(), name='get-all-quiz'),
    path('get-attended-quiz', GetAttendedQuiz.as_view(), name='get-attended-quiz'),
    path('get-unattended-quiz', GetUnAttendedQuiz.as_view(), name='get-unattended-quiz'),
    path('get-detailed-quiz', GetDetailedQuiz.as_view(), name='get-detailed-quiz')
]