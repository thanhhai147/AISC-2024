from django.urls import path
from ..views.questions import UploadFilesAPIView, GenerateQuestionsAPIView, AddQuestionAPIView, ModifyHandcraftedQuestionAPIView,ModifyChatBotQuestionAPIView, CreateQuestionBankAPIView, GetAllQuestionBankAPIView, GetDetailedQuestionBankAPIView, GetDetailedQuestionAPIView

urlpatterns = [
    path('upload-files', UploadFilesAPIView.as_view(), name='upload-files'),
    path('generate-questions', GenerateQuestionsAPIView.as_view(), name='generate-questions'),
    path('add-questions', AddQuestionAPIView.as_view(), name='add-questions'),
    path('modify-question-handcrafted', ModifyHandcraftedQuestionAPIView.as_view(), name='modify-question-handcrafted'),
    path('modify-question-chatbot', ModifyChatBotQuestionAPIView.as_view(), name='modify-question-chatbot'),
    path('create-question-bank', CreateQuestionBankAPIView.as_view(), name='create-question-bank'),
    path('get-question-banks', GetAllQuestionBankAPIView.as_view(), name='get-question-banks'),
    path('get-detail-question-bank', GetDetailedQuestionBankAPIView.as_view(), name='get-detail-question-bank'),
    path('get-detail-question', GetDetailedQuestionAPIView.as_view(), name='get-detail-question'),
]