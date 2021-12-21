from django.db.models import query
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView

from ..models import *
from django.forms.models import model_to_dict
from ..serializer import *

from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView

from rest_framework import generics
from rest_framework import mixins

from rest_framework import viewsets
from django.shortcuts import get_object_or_404

from collections import namedtuple
import inspect

class CourseViewSet (viewsets.ViewSet):
    visible_fields = ('id','course_name','date_start','date_end')
    
    query_set = Course.objects.all()
    def list (self, request):
        serializer = CourseSerializer(self.query_set, many = True, fields = self.visible_fields)
        return Response (serializer.data)
    
    def retrieve (self, request, pk = None):
        instance  = get_object_or_404(self.query_set, pk = pk)
        serializer = CourseSerializer(instance , fields = self.visible_fields)
        return Response(serializer.data)
