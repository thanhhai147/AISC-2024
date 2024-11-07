from django.urls import path
from ..views.user import SignUpAPIView

urlpatterns = [
    path('signup', SignUpAPIView.as_view(), name='signup')
]