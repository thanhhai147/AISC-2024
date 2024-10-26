from django.urls import path
from ..views.check import CheckAPIView

urlpatterns = [
    path('check', CheckAPIView.as_view(), name='query'),
]