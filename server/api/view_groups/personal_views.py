from functools import partial
from os import stat
from django.db.models import query
from django.shortcuts import render
from django.utils.translation import deactivate_all
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import *
from django.forms.models import model_to_dict
from ..serializer import *

from rest_framework.views import APIView

from rest_framework import generics
from rest_framework import mixins

from rest_framework import viewsets
from rest_framework import status

from rest_framework.renderers import JSONRenderer

class ProfileViewSet(viewsets.GenericViewSet):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return ExpandedUser.objects.all()

    def retrieve (self, request, pk ):
        instance = ExpandedUser.objects.get(pk=pk)
        editable = True
        if instance:
            # user_id = request.user.id
            user_id = 1
            serializer = self.get_serializer(instance, user_id=user_id)
            return Response (serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"errors": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk):
        # if request.user.id != pk:
        #     return Response({"error": "Not allowed to update user' profile."}, status=status.HTTP_401_UNAUTHORIZED)
        data = request.data
        serializer = self.get_serializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.update(pk=pk)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"error": "Cannot update user' profile."}, status=status.HTTP_400_BAD_REQUEST)