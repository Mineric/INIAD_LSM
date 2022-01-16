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

    def retrieve (self, request, pk):
        pk = int(pk)
        instance = ExpandedUser.objects.get(pk=pk)
        if instance:
            user_id = request.user.id
            if user_id:
                serializer = self.get_serializer(instance, user_id=user_id)
            else:
                serializer = self.get_serializer(instance)
            editable = serializer.data["editable"]
            if editable == True:
                return Response ({**serializer.data, "suggestions": Tag.INTEREST_TAGS}, status=status.HTTP_200_OK)
            return Response (serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"errors": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk):
        pk = int(pk)
        if request.user.id != pk:
            return Response({"error": "Not allowed to update user' profile."}, status=status.HTTP_401_UNAUTHORIZED)
        data = request.data
        serializer = self.get_serializer(data=data, partial=True)
        if serializer.is_valid():
            updated_user = serializer.update(pk=pk)
            serializer = self.get_serializer(instance=updated_user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"error": "Cannot update user' profile."}, status=status.HTTP_400_BAD_REQUEST)