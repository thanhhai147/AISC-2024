from django.urls import path
from ..views.forum import CreatePostAPIView, UpdatePostAPIView, GetPostAPIView, DeletePostAPIView, GetPostImageAPIView, CreateCommentAPIView, UpdateCommentAPIView, GetCommentAPIView, DeleteCommentAPIView


urlpatterns = [
    path('create-post', CreatePostAPIView.as_view(), name='create-post'),
    path('create-comment', CreateCommentAPIView.as_view(), name='create-comment'),
    path('update-post', UpdatePostAPIView.as_view(), name='update-post'),
    path('update-comment', UpdateCommentAPIView.as_view(), name='update-comment'),
    path('get-post', GetPostAPIView.as_view(), name='get-post'),
    path('get-comment', GetCommentAPIView.as_view(), name='get-comment'),
    path('delete-post', DeletePostAPIView.as_view(), name='delete-post'),
    path('delete-comment', DeleteCommentAPIView.as_view(), name='delete-comment'),
    path('get-post-image', GetPostImageAPIView.as_view(), name='get-post-image'),
]