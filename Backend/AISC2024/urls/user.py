from django.urls import path
from ..views.user import SignUpAPIView
from ..views.user import LogInAPIView
from ..views.user import LogOutAPIView
from ..views.user import UpdateAPIView


urlpatterns = [
    path('signup', SignUpAPIView.as_view(), name='signup'),
    path('login', LogInAPIView.as_view(), name='login'),
    path('logout', LogOutAPIView.as_view(), name='logout'),
    path('update', UpdateAPIView.as_view(), name='update')
]