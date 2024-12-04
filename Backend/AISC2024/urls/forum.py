from django.urls import path
from ..views.forum import CreatePostAPIView, UpdatePostAPIView, GetPostAPIView, GetAllPostIdAPIView, GetAllPostIdByUserAPIView, DeletePostAPIView, GetPostImageAPIView, CreateCommentAPIView, UpdateCommentAPIView, GetCommentAPIView, DeleteCommentAPIView, GetCommentByPostAPIView


urlpatterns = [
    path('create-post', CreatePostAPIView.as_view(), name='create-post'),
    path('create-comment', CreateCommentAPIView.as_view(), name='create-comment'),
    path('update-post', UpdatePostAPIView.as_view(), name='update-post'),
    path('update-comment', UpdateCommentAPIView.as_view(), name='update-comment'),
    path('get-post', GetPostAPIView.as_view(), name='get-post'),
    path('get-all-post', GetAllPostIdAPIView.as_view(), name='get-all-post'),
    path('get-all-post-by-user', GetAllPostIdByUserAPIView.as_view(), name='get-all-post-by-user'),
    path('get-comment', GetCommentAPIView.as_view(), name='get-comment'),
    path('get-comment-by-post', GetCommentByPostAPIView.as_view(), name='get-comment-by-post'),
    path('delete-post', DeletePostAPIView.as_view(), name='delete-post'),
    path('delete-comment', DeleteCommentAPIView.as_view(), name='delete-comment'),
    path('get-post-image', GetPostImageAPIView.as_view(), name='get-post-image'),
]