from django.urls import path
from ..views.questions import UploadImagesAPIView, GenerateQuestionsAPIView, AddQuestionAPIView, ModifyQuestionAPIView

urlpatterns = [
    path('upload-images', UploadImagesAPIView.as_view(), name='upload-images'),
    path('generate-questions', GenerateQuestionsAPIView.as_view(), name='generate-questions'),
    path('add-questions', AddQuestionAPIView.as_view(), name='add-questions'),
    path('modify-question', ModifyQuestionAPIView.as_view(), name='modify-question')
]