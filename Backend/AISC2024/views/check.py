from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
import os

from ..validators.custom_validators import BaseValidator
from ..validators.model_validators import UserValidator

class CheckAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        print(UserValidator.check_password('asdasdjjv'))

        return Response(
            {
                "success": True,
            }, 
            status=status.HTTP_200_OK
        )