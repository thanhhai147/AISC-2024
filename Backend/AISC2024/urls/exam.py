from django.urls import path
from ..views.exam import UpdateQuizAttemptAPIView,GetQuizAttemptAPIView,GetListAllQuizAttemptsAPIView,GetAllQuizAttemptsAPIView,GetDetailedQuizAttemptsAPIView,GetTopActQuizAttemptsAPIView,ResultsStatisticsAPIView

urlpatterns = [
    path('update-quiz-attempt', UpdateQuizAttemptAPIView.as_view(), name='update-quiz-attempt'),
    path('get-list-all-quiz-attempts', GetListAllQuizAttemptsAPIView.as_view(), name='get-all-quiz-attempts'),
    path('get-all-quiz-attempts', GetAllQuizAttemptsAPIView.as_view(), name='get-all-quiz-attempts'),
    path('get-detailed-quiz-attempts', GetDetailedQuizAttemptsAPIView.as_view(), name='get-detailed-quiz-attempts'),
    path('get-top-act-quiz-attempts', GetTopActQuizAttemptsAPIView.as_view(), name='get-top-act-quiz-attempts'),
    path('results-statistics', ResultsStatisticsAPIView.as_view(), name='results-statistics'),
    path('get-quiz-attempt', GetQuizAttemptAPIView.as_view(), name='get-quiz-attempt')
]